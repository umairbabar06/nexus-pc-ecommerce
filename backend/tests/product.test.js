const Product = require('../models/Product');

describe('Product Module', () => {
  describe('Product Model', () => {
    it('should require name, category, price', () => {
      const product = new Product({});
      const err = product.validateSync();
      expect(err).toBeDefined();
      expect(err.errors.name).toBeDefined();
      expect(err.errors.category).toBeDefined();
      expect(err.errors.price).toBeDefined();
    });

    it('should accept valid category values', () => {
      const validCategories = ['cpu', 'mobo', 'ram', 'gpu', 'ssd', 'hdd', 'psu', 'casing', 'cooler', 'cooling_fans'];
      validCategories.forEach(cat => {
        const product = new Product({
          name: `Test ${cat}`,
          category: cat,
          price: 1000,
          stock: 5,
        });
        const err = product.validateSync();
        // Should not have a category error
        expect(err?.errors?.category).toBeUndefined();
      });
    });

    it('should reject negative price', () => {
      const product = new Product({ name: 'Test', category: 'cpu', price: -100, stock: 5 });
      const err = product.validateSync();
      expect(err?.errors?.price).toBeDefined();
    });

    it('should set deleted_at to null by default', () => {
      const product = new Product({ name: 'Test', category: 'cpu', price: 100, stock: 5 });
      expect(product.deleted_at).toBeNull();
    });

    it('should default isFeatured to false', () => {
      const product = new Product({ name: 'Test', category: 'cpu', price: 100, stock: 5 });
      expect(product.isFeatured).toBe(false);
    });

    it('should store specs as an object', () => {
      const product = new Product({
        name: 'AMD Ryzen 5 5600X',
        category: 'cpu',
        price: 35000,
        stock: 10,
        specs: { socket: 'AM4', cores: '6', threads: '12' },
      });
      expect(product.specs.socket).toBe('AM4');
      expect(product.specs.cores).toBe('6');
    });
  });
});
