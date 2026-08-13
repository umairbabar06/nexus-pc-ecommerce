const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order  = require('../models/Order');

// ─────────────────────────────────────────────────────────────────────────────
// STRIPE
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @route   POST /api/payment/stripe/create-session
 * @desc    Create a Stripe Checkout session for an existing order
 * @access  Private (order must belong to the user)
 */
exports.createStripeSession = async (req, res) => {
  try {
    const { orderId } = req.body;
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ success: false, message: 'Order not found.' });
    }

    // Build Stripe line items from order items
    // Note: images are omitted because Stripe requires publicly accessible URLs
    // (localhost won't work). Add them back when deploying to production.
    const line_items = order.items.map((item) => ({
      price_data: {
        currency: 'pkr',
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100), // Stripe expects amount in paisa (smallest currency unit)
      },
      quantity: item.quantity,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items,
      client_reference_id: order._id.toString(),
      customer_email: order.customer_email,
      metadata: { orderId: order._id.toString() },
      success_url: `${process.env.CLIENT_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}&order_id=${order._id}`,
      cancel_url: `${process.env.CLIENT_URL}/payment/cancel?order_id=${order._id}`,
    });

    // Store the Stripe session ID on the order
    order.payment_ref = session.id;
    await order.save();

    res.json({ success: true, url: session.url });
  } catch (err) {
    console.error('Stripe session error:', err);
    res.status(500).json({ success: false, message: err.message || 'Failed to create payment session.' });
  }
};

/**
 * @route   POST /api/payment/stripe/webhook
 * @desc    Handle Stripe webhook events (payment confirmation)
 * @access  Public (verified via Stripe signature)
 */
exports.stripeWebhook = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    // If webhook secret is configured, verify signature
    if (process.env.STRIPE_WEBHOOK_SECRET) {
      event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } else {
      // For development without webhook secret, parse the body directly
      event = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    }
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ message: 'Webhook signature verification failed.' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;
    const orderId = session.metadata?.orderId || session.client_reference_id;

    if (orderId) {
      try {
        const order = await Order.findById(orderId);
        if (order && order.payment_status !== 'Paid') {
          order.payment_status = 'Paid';
          order.payment_ref = session.payment_intent || session.id;
          order.order_status = 'Confirmed';
          await order.save();
          console.log(`✅ Stripe payment confirmed for order ${orderId}`);
        }
      } catch (err) {
        console.error('Webhook order update error:', err);
      }
    }
  }

  res.json({ received: true });
};

/**
 * @route   GET /api/payment/stripe/verify/:sessionId
 * @desc    Verify a Stripe session status (called from success page)
 * @access  Public
 */
exports.verifyStripeSession = async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    if (session.payment_status === 'paid') {
      // Also update the order if webhook hasn't fired yet
      const orderId = session.metadata?.orderId || session.client_reference_id;
      if (orderId) {
        const order = await Order.findById(orderId);
        if (order && order.payment_status !== 'Paid') {
          order.payment_status = 'Paid';
          order.payment_ref = session.payment_intent || session.id;
          order.order_status = 'Confirmed';
          await order.save();
        }
      }
    }

    res.json({
      success: true,
      status: session.payment_status,
      orderId: session.metadata?.orderId || session.client_reference_id,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to verify payment.' });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// BANK TRANSFER
// ─────────────────────────────────────────────────────────────────────────────

/**
 * @route   GET /api/payment/bank-details
 * @desc    Return store bank account details for manual transfer
 * @access  Public
 */
exports.getBankDetails = (req, res) => {
  res.json({
    success: true,
    bankDetails: {
      bankName:      process.env.BANK_NAME           || 'HBL / Meezan Bank',
      accountTitle:  process.env.BANK_ACCOUNT_TITLE   || 'Nexus PC',
      accountNumber: process.env.BANK_ACCOUNT_NUMBER  || '1234-5678-9012-3456',
      iban:          process.env.BANK_IBAN            || 'PK00MEZN0000001234567890',
    },
    instructions: [
      'Transfer the exact order amount to the account above.',
      'Use your Order ID as the payment reference/description.',
      'After transferring, your order will be confirmed once we verify the payment (usually within 1-2 hours).',
      'For any issues, contact us via the Contact page.',
    ],
  });
};

// ─────────────────────────────────────────────────────────────────────────────
// JAZZCASH (Coming Soon — requires merchant credentials)
// ─────────────────────────────────────────────────────────────────────────────

exports.initJazzCash = async (req, res) => {
  res.status(503).json({ success: false, message: 'JazzCash payments coming soon.' });
};

exports.jazzCashCallback = async (req, res) => {
  res.status(503).json({ success: false, message: 'JazzCash payments coming soon.' });
};

// ─────────────────────────────────────────────────────────────────────────────
// EASYPAISA (Coming Soon — requires merchant credentials)
// ─────────────────────────────────────────────────────────────────────────────

exports.initEasypaisa = async (req, res) => {
  res.status(503).json({ success: false, message: 'Easypaisa payments coming soon.' });
};

exports.easypaisaCallback = async (req, res) => {
  res.status(503).json({ success: false, message: 'Easypaisa payments coming soon.' });
};
