const ChatSession = require('../models/ChatSession');

// Helper to safely load external SDKs so the server doesn't crash if they aren't installed yet
let GoogleGenAI, twilio;
try {
  const genaiPkg = require('@google/genai');
  GoogleGenAI = genaiPkg.GoogleGenAI;
} catch (err) {
  console.warn('⚠️ @google/genai is not installed. AI Chat will not work until installed.');
}

try {
  twilio = require('twilio');
} catch (err) {
  console.warn('⚠️ twilio is not installed. WhatsApp Chat will not work until installed.');
}

const SYSTEM_INSTRUCTION = `Your name is Jarvis. You are the AI assistant for Nexus PC, a PC building company in Pakistan.

CRITICAL RULES — FOLLOW STRICTLY:
1. Keep ALL responses VERY SHORT. Maximum 10-12 lines.
2. NEVER give multiple build options. Give exactly ONE build only.
3. NEVER write paragraphs or long explanations.
4. NEVER list alternatives or "you could also try" options.
5. When giving a PC build, respond with ONLY this format and nothing else:

## Build Name
- **CPU:** Name — ~PKR price
- **GPU:** Name — ~PKR price
- **Motherboard:** Name — ~PKR price
- **RAM:** Size and speed — ~PKR price
- **Storage:** Size — ~PKR price
- **PSU:** Wattage — ~PKR price
- **Case:** Name — ~PKR price
- **Total:** ~PKR total

That's it. No extra text before or after the list. No "here's what I recommend" intro. No "key takeaways". Just the list.

6. For non-build questions, answer in 2-3 bullet points max.
7. Prices in PKR. Use Google Search for current prices.
8. If they ask what's in stock, say "Check nexuspc.com".`;

/**
 * Common logic to generate a response from Gemini, 
 * maintaining history from DB.
 */
async function generateAiResponse(sessionId, userMessage) {
  if (!GoogleGenAI || !process.env.GEMINI_API_KEY) {
    return "Our AI systems are currently offline for maintenance. Please try again later.";
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
    
    // 1. Fetch or create session
    let session = await ChatSession.findOne({ sessionId });
    if (!session) {
      session = new ChatSession({ sessionId, history: [] });
    }

    // 2. Format history for Gemini SDK
    // Gemini expects: { role: 'user' | 'model', parts: [{ text: '...' }] }
    const contents = session.history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Add current user message
    contents.push({
      role: 'user',
      parts: [{ text: userMessage }]
    });

    // 3. Call Gemini API with Google Search Grounding enabled
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        tools: [{ googleSearch: {} }], // Enable Google Search
        temperature: 0.7
      }
    });

    const aiText = response.text || "I'm sorry, I couldn't process that request.";

    // 4. Save to DB
    session.history.push({ role: 'user', text: userMessage });
    session.history.push({ role: 'model', text: aiText });
    
    // Refresh expiration
    session.expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
    
    // Keep history manageable (last 20 messages)
    if (session.history.length > 20) {
      session.history = session.history.slice(session.history.length - 20);
    }

    await session.save();

    return aiText;
  } catch (err) {
    console.error('Gemini API Error:', err);
    return "I'm having trouble connecting to my knowledge base right now. Please hold on.";
  }
}

// @route   POST /api/chat/web
// @desc    Handle chat messages from the website UI
exports.handleWebChat = async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    if (!message || !sessionId) {
      return res.status(400).json({ success: false, message: 'Message and sessionId are required' });
    }

    const aiResponse = await generateAiResponse(sessionId, message);
    
    res.json({ success: true, reply: aiResponse });
  } catch (error) {
    console.error('Web Chat Error:', error);
    res.status(500).json({ success: false, message: 'Server error processing chat' });
  }
};

// @route   POST /api/chat/webhook
// @desc    Handle incoming WhatsApp messages from Twilio
exports.handleWhatsAppWebhook = async (req, res) => {
  try {
    if (!twilio) {
      return res.status(500).send('Twilio not installed');
    }

    const { From, Body } = req.body;
    // 'From' looks like 'whatsapp:+14155238886'
    
    if (!From || !Body) {
      return res.status(400).send('Invalid webhook payload');
    }

    // Generate AI response
    const aiResponse = await generateAiResponse(From, Body);

    // Use Twilio's MessagingResponse to send reply back
    const MessagingResponse = twilio.twiml.MessagingResponse;
    const twiml = new MessagingResponse();
    
    twiml.message(aiResponse);

    res.set('Content-Type', 'text/xml');
    res.send(twiml.toString());
  } catch (error) {
    console.error('WhatsApp Webhook Error:', error);
    res.status(500).send('Server Error');
  }
};
