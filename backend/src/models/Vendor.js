import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  services: [{
    type: String,
    required: true
  }],
  priceRange: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    }
  },
  location: {
    type: String,
    required: true
  },
  eventTypes: [{
    type: String,
    enum: ['wedding', 'corporate', 'party'],
    required: true
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  }
}, {
  timestamps: true
});

const Vendor = mongoose.model('Vendor', vendorSchema);

export default Vendor; 