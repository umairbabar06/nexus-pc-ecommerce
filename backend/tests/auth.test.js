const request = require('supertest');
const express = require('express');
const mongoose = require('mongoose');

// We'll test the auth controller logic directly
const User = require('../models/User');

describe('Auth Module', () => {
  describe('User Model', () => {
    it('should require name, email, and password', () => {
      const user = new User({});
      const err = user.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.email).toBeDefined();
      expect(err.errors.password).toBeDefined();
    });

    it('should set default role to user', () => {
      const user = new User({ name: 'Test', email: 'test@test.com', password: 'pass123' });
      expect(user.user_role).toBe('user');
    });

    it('should set is_verified to false by default', () => {
      const user = new User({ name: 'Test', email: 'test@test.com', password: 'pass123' });
      expect(user.is_verified).toBe(false);
    });

    it('should accept valid role values', () => {
      const user = new User({ name: 'Admin', email: 'admin@test.com', password: 'pass', user_role: 'admin' });
      expect(user.user_role).toBe('admin');
    });
  });
});
