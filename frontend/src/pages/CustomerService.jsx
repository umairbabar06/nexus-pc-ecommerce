import { useState, useRef, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { sendChatMessage } from '../api';
import './CustomerService.css';

// Generate a random session ID for the user's browser session
const generateSessionId = () => {
  return 'web_' + Math.random().toString(36).substring(2, 15);
};

// Simple markdown renderer for AI responses
const renderMarkdown = (text) => {
  if (!text) return '';
  
  const lines = text.split('\n');
  const elements = [];
  
  lines.forEach((line, i) => {
    const trimmed = line.trim();
    
    // Heading ##
    if (trimmed.startsWith('## ')) {
      elements.push(<h4 key={i} className="chat-heading">{parseBold(trimmed.slice(3))}</h4>);
    }
    // Bullet point - or • or *
    else if (/^[-•*]\s/.test(trimmed)) {
      elements.push(
        <div key={i} className="chat-bullet">
          <span className="bullet-dot">•</span>
          <span>{parseBold(trimmed.slice(trimmed.indexOf(' ') + 1))}</span>
        </div>
      );
    }
    // Empty line = spacer
    else if (trimmed === '') {
      elements.push(<div key={i} className="chat-spacer" />);
    }
    // Normal text
    else {
      elements.push(<p key={i} className="chat-para">{parseBold(trimmed)}</p>);
    }
  });
  
  return elements;
};

// Parse **bold** text within a string
const parseBold = (text) => {
  const parts = text.split(/\*\*(.*?)\*\*/g);
  return parts.map((part, i) =>
    i % 2 === 1 ? <strong key={i}>{part}</strong> : part
  );
};

const CustomerService = () => {
  const [sessionId] = useState(() => {
    let sid = sessionStorage.getItem('nexus_chat_session');
    if (!sid) {
      sid = generateSessionId();
      sessionStorage.setItem('nexus_chat_session', sid);
    }
    return sid;
  });

  const [messages, setMessages] = useState([
    { role: 'ai', text: "Hey there! I'm **Jarvis**, your AI assistant at Nexus PC.\n\nHow can I help you today?\n\n- Ask me for a **PC build recommendation**\n- Ask about **component compatibility**\n- Get **real-time prices** and specs" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const res = await sendChatMessage(userMessage, sessionId);
      if (res.data?.success) {
        setMessages(prev => [...prev, { role: 'ai', text: res.data.reply }]);
      } else {
        setMessages(prev => [...prev, { role: 'ai', text: "I'm sorry, I couldn't process that right now." }]);
      }
    } catch (err) {
      console.error('Chat error:', err);
      setMessages(prev => [...prev, { role: 'ai', text: "Network error. Please make sure the AI services are online." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="customer-service-page">
      <Navbar />
      
      <div className="cs-header">
        <h1>Jarvis — AI PC Assistant</h1>
        <p>Get instant answers about PC builds, compatibility, pricing, and more.</p>
      </div>

      <div className="cs-container">
        
        {/* Chat Box */}
        <div className="cs-chat-box">
          <div className="cs-chat-header">
            <div className="cs-chat-avatar">J</div>
            <div className="cs-chat-info">
              <h3>Jarvis</h3>
              <p>● Online</p>
            </div>
          </div>

          <div className="cs-chat-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`cs-message ${msg.role}`}>
                {msg.role === 'ai' ? renderMarkdown(msg.text) : msg.text}
              </div>
            ))}
            {loading && (
              <div className="cs-message-loading">
                Jarvis is typing...
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          <form className="cs-chat-input-area" onSubmit={handleSend}>
            <input 
              type="text" 
              placeholder="Ask Jarvis anything about PC building..." 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
            />
            <button type="submit" disabled={!input.trim() || loading}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
            </button>
          </form>
        </div>

      </div>

      <Footer />
    </div>
  );
};

export default CustomerService;
