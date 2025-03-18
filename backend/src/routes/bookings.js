import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// Get all bookings (admin only)
router.get('/', protect, authorize(['admin']), async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('clientId', 'name email')
      .populate('vendorId', 'name');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get client's bookings
router.get('/client', protect, authorize(['client']), async (req, res) => {
  try {
    const bookings = await Booking.find({ clientId: req.user.userId })
      .populate('vendorId', 'name');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching client bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor's bookings
router.get('/vendor/:vendorId', protect, authorize(['vendor']), async (req, res) => {
  try {
    const vendor = await Vendor.findOne({ userId: req.user.userId });
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    const bookings = await Booking.find({ vendorId: vendor._id })
      .populate('clientId', 'name email');
    res.json(bookings);
  } catch (error) {
    console.error('Error fetching vendor bookings:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create booking
router.post('/', protect, authorize(['client']), async (req, res) => {
  try {
    const { vendorId, eventType, location, date, totalAmount } = req.body;

    // Check if vendor exists and is approved
    const vendor = await Vendor.findById(vendorId);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    if (vendor.status !== 'approved') {
      return res.status(400).json({ message: 'Vendor is not approved' });
    }

    // Check if vendor offers the requested event type
    if (!vendor.eventTypes.includes(eventType)) {
      return res.status(400).json({ message: 'Vendor does not offer this event type' });
    }

    // Create booking
    const booking = new Booking({
      clientId: req.user.userId,
      vendorId,
      eventType,
      location,
      date,
      totalAmount
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update booking status
router.put('/:id/status', protect, authorize(['vendor', 'admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: 'Booking not found' });
    }

    // Check if vendor is authorized to update this booking
    if (req.user.role === 'vendor') {
      const vendor = await Vendor.findOne({ userId: req.user.userId });
      if (booking.vendorId.toString() !== vendor._id.toString()) {
        return res.status(403).json({ message: 'Not authorized' });
      }
    }

    booking.status = status;
    await booking.save();

    res.json(booking);
  } catch (error) {
    console.error('Error updating booking status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 