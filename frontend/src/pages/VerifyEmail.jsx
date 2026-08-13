import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verifyEmail, resendVerification } from '../api';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import './Auth.css';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState('loading'); // 'loading' | 'success' | 'error' | 'already'
  const [message, setMessage] = useState('');
  const [resendEmail, setResendEmail] = useState('');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    verifyEmail(token)
      .then((res) => {
        setStatus('success');
        setMessage(res.data.message);
      })
      .catch((err) => {
        const msg = err.response?.data?.message || '';
        // If already verified, show a friendlier message
        if (msg.toLowerCase().includes('already') || err.response?.status === 400) {
          setStatus('already');
        } else {
          setStatus('error');
        }
        setMessage(msg || 'This link has already been used or has expired.');
      });
  }, [token]);

  const handleResend = async (e) => {
    e.preventDefault();
    if (!resendEmail) return;
    setResending(true);
    try {
      await resendVerification({ email: resendEmail });
      toast.success('New verification email sent! Check your inbox.');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to resend');
    } finally {
      setResending(false);
    }
  };

  return (
    <div className="page-wrapper">
      <Navbar />
      <div className="auth-page">
        <div className="auth-card" style={{ textAlign: 'center' }}>

          {/* Loading */}
          {status === 'loading' && (
            <>
              <div className="spinner" style={{ margin: '0 auto 24px' }}></div>
              <h1 className="auth-title">Verifying...</h1>
              <p className="auth-subtitle">Please wait while we verify your email address.</p>
            </>
          )}

          {/* Success */}
          {status === 'success' && (
            <>
              <div className="auth-icon auth-icon-success">✓</div>
              <h1 className="auth-title">Email Verified!</h1>
              <p className="auth-subtitle">{message}</p>
              <Link to="/login" className="btn btn-primary btn-block" style={{ marginTop: '24px' }}>
                Go to Login
              </Link>
            </>
          )}

          {/* Already verified — friendly message */}
          {status === 'already' && (
            <>
              <div className="auth-icon auth-icon-success">✓</div>
              <h1 className="auth-title">Already Verified</h1>
              <p className="auth-subtitle">
                This link has already been used. Your account is already verified — you can log in now.
              </p>
              <Link to="/login" className="btn btn-primary btn-block" style={{ marginTop: '24px' }}>
                Go to Login
              </Link>
            </>
          )}

          {/* Expired / invalid link */}
          {status === 'error' && (
            <>
              <div className="auth-icon auth-icon-error">✕</div>
              <h1 className="auth-title">Link Expired</h1>
              <p className="auth-subtitle">
                This verification link has expired (24h limit). Enter your email below to get a fresh one.
              </p>

              <form onSubmit={handleResend} style={{ marginTop: '24px', textAlign: 'left' }}>
                <div className="form-group">
                  <label className="form-label">Your Email Address</label>
                  <input
                    type="email"
                    className="form-input"
                    placeholder="you@example.com"
                    value={resendEmail}
                    onChange={(e) => setResendEmail(e.target.value)}
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-primary btn-block"
                  disabled={resending}
                >
                  {resending ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </form>

              <div style={{ marginTop: '16px' }}>
                <Link to="/signup" className="auth-link" style={{ fontSize: '13px' }}>
                  Or create a new account
                </Link>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
