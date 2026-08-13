const mongoose = require('mongoose');

/**
 * CarouselSlide Model — replaces `carousel_slides` MySQL table
 * Managed from managecarousels.php admin page
 */
const carouselSlideSchema = new mongoose.Schema(
  {
    title:         { type: String, required: true },
    subtitle:      { type: String, default: '' },
    image:         { type: String, required: true },
    link:          { type: String, default: '#' },
    button_text:   { type: String, default: 'Shop Now' },
    display_order: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ['active', 'inactive'],
      default: 'active',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('CarouselSlide', carouselSlideSchema);
