const jwt = require('jsonwebtoken');

describe('Middleware', () => {
  describe('JWT Token', () => {
    const secret = process.env.JWT_SECRET || 'test-secret';

    it('should create a valid JWT token', () => {
      const token = jwt.sign({ id: '12345', role: 'user' }, secret, { expiresIn: '1h' });
      expect(token).toBeDefined();
      expect(typeof token).toBe('string');
      expect(token.split('.')).toHaveLength(3);
    });

    it('should decode a valid token', () => {
      const payload = { id: '12345', role: 'admin' };
      const token = jwt.sign(payload, secret, { expiresIn: '1h' });
      const decoded = jwt.verify(token, secret);
      expect(decoded.id).toBe('12345');
      expect(decoded.role).toBe('admin');
    });

    it('should reject an invalid token', () => {
      expect(() => {
        jwt.verify('invalid.token.here', secret);
      }).toThrow();
    });

    it('should reject an expired token', () => {
      const token = jwt.sign({ id: '12345' }, secret, { expiresIn: '0s' });
      // Small delay to ensure expiry
      expect(() => {
        jwt.verify(token, secret);
      }).toThrow();
    });
  });
});
