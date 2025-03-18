import express from 'express';
import { protect, authorize } from '../middleware/auth.js';
import Vendor from '../models/Vendor.js';

const router = express.Router();

// Get all approved vendors
router.get('/', async (req, res) => {
  try {
    const vendors = await Vendor.find({ status: 'approved' });
    res.json(vendors);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get pending vendors (admin only)
router.get('/pending', protect, authorize(['admin']), async (req, res) => {
  try {
    const pendingVendors = await Vendor.find({ status: 'pending' });
    res.json(pendingVendors);
  } catch (error) {
    console.error('Error fetching pending vendors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get vendor by ID
router.get('/:id', async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }
    res.json(vendor);
  } catch (error) {
    console.error('Error fetching vendor:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create vendor profile
router.post('/', protect, authorize(['vendor']), async (req, res) => {
  try {
    const vendor = new Vendor({
      ...req.body,
      userId: req.user.userId
    });
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    console.error('Error creating vendor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update vendor profile
router.put('/:id', protect, authorize(['vendor', 'admin']), async (req, res) => {
  try {
    const vendor = await Vendor.findById(req.params.id);
    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    // Check if user is authorized to update this vendor
    if (req.user.role === 'vendor' && vendor.userId.toString() !== req.user.userId) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    const updatedVendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json(updatedVendor);
  } catch (error) {
    console.error('Error updating vendor profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update vendor status (admin only)
router.put('/:id/status', protect, authorize(['admin']), async (req, res) => {
  try {
    const { status } = req.body;
    const vendor = await Vendor.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!vendor) {
      return res.status(404).json({ message: 'Vendor not found' });
    }

    res.json(vendor);
  } catch (error) {
    console.error('Error updating vendor status:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Search vendors
router.get('/search', async (req, res) => {
  try {
    const { eventType, location } = req.query;
    const query = { status: 'approved' };

    if (eventType) {
      query.eventTypes = eventType;
    }

    if (location) {
      query.location = { $regex: location, $options: 'i' };
    }

    const vendors = await Vendor.find(query);
    res.json(vendors);
  } catch (error) {
    console.error('Error searching vendors:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

export default router; 