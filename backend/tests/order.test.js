const Order = require('../models/Order');

describe('Order Module', () => {
  describe('Order Model', () => {
    const validOrder = {
      customer_name: 'John Doe',
      customer_email: 'john@test.com',
      customer_address: '123 Main St',
      items: [{ name: 'Test CPU', price: 35000, quantity: 1 }],
      total_amount: 35000,
    };

    it('should require customer details', () => {
      const order = new Order({});
      const err = order.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.customer_name).toBeDefined();
      expect(err.errors.customer_email).toBeDefined();
      expect(err.errors.customer_address).toBeDefined();
    });

    it('should default order_status to Processing', () => {
      const order = new Order(validOrder);
      expect(order.order_status).toBe('Processing');
    });

    it('should default payment_status to Pending', () => {
      const order = new Order(validOrder);
      expect(order.payment_status).toBe('Pending');
    });

    it('should default payment_method to cod', () => {
      const order = new Order(validOrder);
      expect(order.payment_method).toBe('cod');
    });

    it('should accept valid order statuses', () => {
      const statuses = ['Processing', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'];
      statuses.forEach(status => {
        const order = new Order({ ...validOrder, order_status: status });
        expect(order.order_status).toBe(status);
      });
    });

    it('should accept valid payment methods', () => {
      const methods = ['cod', 'stripe', 'jazzcash', 'easypaisa', 'bank_transfer'];
      methods.forEach(method => {
        const order = new Order({ ...validOrder, payment_method: method });
        expect(order.payment_method).toBe(method);
      });
    });

    it('should allow null user for guest orders', () => {
      const order = new Order(validOrder);
      expect(order.user).toBeNull();
    });
  });
});
