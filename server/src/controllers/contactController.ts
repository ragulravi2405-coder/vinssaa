import { Request, Response } from 'express';
import ContactInquiry from '../models/ContactInquiry.js';

export async function submitContactInquiry(req: Request, res: Response) {
  try {
    const { name, email, phone, subject = 'General Inquiry', message = 'Admissions / Course Inquiry', source = 'quick_inquiry' } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Name and at least one contact method (email or phone) are required.',
      });
    }

    const doc = await ContactInquiry.create({
      name: name.trim(),
      email: (email || '').trim(),
      phone: (phone || '').trim(),
      subject: (subject || 'General Inquiry').trim(),
      message: (message || 'Admissions / Course Inquiry').trim(),
      source,
      status: 'new',
    });

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted and stored successfully.',
      inquiryId: doc._id,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to save inquiry to database', error: error.message });
  }
}

export async function getAllInquiries(_req: Request, res: Response) {
  try {
    const rows = await ContactInquiry.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch inquiries', error: error.message });
  }
}

export async function updateInquiryStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'in_progress', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    const doc = await ContactInquiry.findByIdAndUpdate(id, { status }, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Inquiry not found' });

    return res.json({ success: true, message: `Inquiry status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update inquiry status', error: error.message });
  }
}

export async function deleteInquiry(req: Request, res: Response) {
  try {
    await ContactInquiry.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Inquiry deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete inquiry', error: error.message });
  }
}
