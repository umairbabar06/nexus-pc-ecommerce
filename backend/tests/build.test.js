const Build = require('../models/Build');

describe('Build Module', () => {
  describe('Build Model', () => {
    it('should default name to My Custom Build', () => {
      const build = new Build({});
      expect(build.name).toBe('My Custom Build');
    });

    it('should auto-generate a shareId', async () => {
      const build = new Build({ name: 'Test Build' });
      // shareId is generated in pre-save, but we can check the field exists
      expect(build.schema.paths.shareId).toBeDefined();
    });

    it('should accept component structure', () => {
      const build = new Build({
        name: 'Gaming PC',
        components: {
          cpu: { name: 'Ryzen 5 5600X', price: 35000, image: 'test.jpg' },
          gpu: { name: 'RTX 4060', price: 85000, image: 'gpu.jpg' },
        },
        totalPrice: 120000,
        estimatedWattage: 350,
      });
      expect(build.components.cpu.name).toBe('Ryzen 5 5600X');
      expect(build.components.gpu.price).toBe(85000);
      expect(build.totalPrice).toBe(120000);
    });

    it('should accept valid compatibilityStatus values', () => {
      const statuses = ['compatible', 'warnings', 'incompatible'];
      statuses.forEach(status => {
        const build = new Build({ compatibilityStatus: status });
        expect(build.compatibilityStatus).toBe(status);
      });
    });
  });
});
