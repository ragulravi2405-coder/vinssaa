import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface ContactInquiryRow extends RowDataPacket {
  id: number;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  source: string;
  status: string;
  created_at: string;
}

export async function submitContactInquiry(req: Request, res: Response) {
  console.log('[Backend] Request received: POST /api/contact');
  console.log('[Backend] Contact form body:', JSON.stringify(req.body));
  try {
    const {
      name,
      email = '',
      phone = '',
      subject = 'General Inquiry',
      message = 'Admissions / Course Inquiry',
      source = 'quick_inquiry',
    } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        message: 'Name and at least one contact method (email or phone) are required.',
      });
    }

    const result = await executeQuery<ResultSetHeader>(
      `INSERT INTO contact_inquiries (name, email, phone, subject, message, source, status)
       VALUES (?, ?, ?, ?, ?, ?, 'new')`,
      [name.trim(), email.trim(), phone.trim(), subject.trim(), message.trim(), source]
    );

    console.log('[Backend] ✅ Data successfully inserted into MySQL (contact_inquiries). insertId:', result.insertId);

    return res.status(201).json({
      success: true,
      message: 'Thank you! Your inquiry has been submitted and stored in MySQL successfully.',
      inquiryId: result.insertId,
    });
  } catch (error: any) {
    console.error('[Backend] ❌ MySQL INSERT failed for contact_inquiries:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to save inquiry to MySQL database',
      error: error.message,
    });
  }
}

export async function getAllInquiries(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<ContactInquiryRow[]>(
      'SELECT * FROM contact_inquiries ORDER BY created_at DESC'
    );
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch inquiries from MySQL',
      error: error.message,
    });
  }
}

export async function updateInquiryStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['new', 'in_progress', 'contacted', 'closed'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid status value' });
    }

    await executeQuery<ResultSetHeader>(
      'UPDATE contact_inquiries SET status = ? WHERE id = ?',
      [status, id]
    );

    return res.json({ success: true, message: `Inquiry status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update inquiry status',
      error: error.message,
    });
  }
}

export async function deleteInquiry(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>(
      'DELETE FROM contact_inquiries WHERE id = ?',
      [req.params.id]
    );
    return res.json({ success: true, message: 'Inquiry deleted successfully from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete inquiry',
      error: error.message,
    });
  }
}
