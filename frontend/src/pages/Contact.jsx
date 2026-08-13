import { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { submitContactForm } from '../api';
import toast from 'react-hot-toast';
import './Contact.css';
import SEO from '../components/SEO';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await submitContactForm(form);
      toast.success(res.data.message);
      setForm({ name: '', email: '', subject: '', message: '' });
      setSent(true);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-wrapper">
      <SEO title="Contact Us" description="Get in touch with Nexus PC for orders, support, or custom PC build inquiries." />
      <Navbar />
      <div className="page-content">
        <div className="container contact-container">
          <div className="contact-hero">
            <p className="contact-tag">Get In Touch</p>
            <h1 className="contact-title">Contact Us</h1>
            <p className="contact-subtitle">Have questions? We'd love to hear from you.</p>
          </div>

          <div className="contact-form-card card">
            {sent ? (
              <div className="contact-success">
                <div className="auth-icon-circle success">✓</div>
                <h3>Message Received!</h3>
                <p>Thanks for reaching out. We'll get back to you within 24 hours.</p>
                <button className="btn btn-primary" onClick={() => setSent(false)}>
                  Send Another Message
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>
              <div className="contact-row">
                <div className="form-group">
                  <label className="form-label">Name</label>
                  <input name="name" className="form-input" placeholder="Your name" value={form.name} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email</label>
                  <input name="email" type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Subject</label>
                <input name="subject" className="form-input" placeholder="What's this about?" value={form.subject} onChange={handleChange} required />
              </div>
              <div className="form-group">
                <label className="form-label">Message</label>
                <textarea name="message" className="form-input" placeholder="Your message..." rows="5" value={form.message} onChange={handleChange} required minLength={10} />
              </div>
              <button type="submit" className="btn btn-primary btn-block btn-lg" disabled={loading}>
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
            )}
          </div>

          <div className="contact-info-grid">
            {[
              { icon: '📧', label: 'Email', value: 'hashim.dev07@gmail.com' },
              { icon: '📍', label: 'Location', value: 'Pakistan' },
              { icon: '⏰', label: 'Hours', value: '24/7 Support' },
            ].map((item, i) => (
              <div key={i} className="contact-info-card card">
                <p className="contact-info-icon">{item.icon}</p>
                <p className="contact-info-label">{item.label}</p>
                <p className="contact-info-value">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
