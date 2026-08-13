const mongoose = require('mongoose');

/**
 * Product Model — replaces ALL 20+ MySQL tables
 * (cpu, gpu, ram, mobo, hdd, ssd, psu, casing, cooler,
 *  airbuds, cables, cases, cooling_fans, gaming_sets,
 *  headsets, power_banks, smart_watches, watch_straps, etc.)
 *
 * All product types are now ONE collection, distinguished by `category`
 */
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    image: {
      type: String,
      default: 'default.png',
    },
    // Category replaces the separate table names (cpu, gpu, ram, etc.)
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: [
        'cpu', 'gpu', 'ram', 'mobo', 'hdd', 'ssd', 'psu',
        'casing', 'cooler', 'adapters', 'airbuds', 'airpods',
        'cables', 'cases', 'cooling_fans', 'custom_cases',
        'gaming_sets', 'handsfree', 'headsets', 'power_banks',
        'tripods', 'smart_watches', 'watch_straps', 'speakers', 'other'
      ],
      lowercase: true,
    },
    // Brand as a top-level field for fast indexed filtering
    brand: {
      type: String,
      default: '',
      trim: true,
    },
    description: {
      type: String,
      default: '',
    },
    stock: {
      type: Number,
      default: 0,
      min: 0,
    },
    // Flexible specs field — stores socket, color, chipset, etc.
    // Different for each category (like your separate MySQL columns)
    specs: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    // Soft delete (replaces deleted_at in your MySQL tables)
    deleted_at: {
      type: Date,
      default: null,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Indexes for fast filtering
productSchema.index({ name: 'text', category: 1 });
productSchema.index({ brand: 1, category: 1 });
productSchema.index({ price: 1 });

module.exports = mongoose.model('Product', productSchema);
