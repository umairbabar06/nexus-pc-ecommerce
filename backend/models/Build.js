const mongoose = require('mongoose');
const crypto = require('crypto');

const ComponentSchema = new mongoose.Schema({
  product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  name: String,
  price: Number,
  image: String
}, { _id: false });

const BuildSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  name: {
    type: String,
    required: true,
    default: 'My Custom Build'
  },
  shareId: {
    type: String,
    unique: true,
    sparse: true
  },
  components: {
    cpu: ComponentSchema,
    mobo: ComponentSchema,
    ram: ComponentSchema,
    gpu: ComponentSchema,
    ssd: ComponentSchema,
    hdd: ComponentSchema,
    psu: ComponentSchema,
    casing: ComponentSchema,
    cooler: ComponentSchema
  },
  totalPrice: {
    type: Number,
    default: 0
  },
  estimatedWattage: {
    type: Number,
    default: 0
  },
  compatibilityStatus: {
    type: String,
    enum: ['compatible', 'warnings', 'incompatible'],
    default: 'compatible'
  }
}, { timestamps: true });

BuildSchema.pre('save', function (next) {
  if (!this.shareId) {
    this.shareId = crypto.randomBytes(4).toString('hex');
  }
  next();
});

module.exports = mongoose.model('Build', BuildSchema);
