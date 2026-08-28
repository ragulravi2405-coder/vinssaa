import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface AdmissionApplicationRow extends RowDataPacket {
  id: number;
  full_name: string;
  dob?: string;
  phone: string;
  email: string;
  academic_year: string;
  category: string;
  preferred_course: string;
  qualification: string;
  percentage?: string;
  city: string;
  status: string;
  notes?: string;
  created_at: string;
}

export async function submitApplication(req: Request, res: Response) {
  console.log('[Backend] Request received: POST /api/admissions');
  console.log('[Backend] Admission form body:', JSON.stringify(req.body));
  try {
    const {
      fullName,
      dob = null,
      phone,
      email,
      academicYear = '2027 - 2028',
      category = 'UG',
      preferredCourse,
      qualification = 'HSC',
      percentage = null,
      city = 'Nagercoil',
    } = req.body;

    if (!fullName || !phone || !email || !preferredCourse) {
      return res.status(400).json({
        success: false,
        message: 'Full name, phone, email, and preferred course are required.',
      });
    }

    const result = await executeQuery<ResultSetHeader>(
      `INSERT INTO admission_applications 
       (full_name, dob, phone, email, academic_year, category, preferred_course, qualification, percentage, city, status)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')`,
      [
        fullName.trim(),
        dob || null,
        phone.trim(),
        email.trim(),
        academicYear,
        category,
        preferredCourse,
        qualification,
        percentage || null,
        city.trim(),
      ]
    );

    console.log('[Backend] ✅ Data successfully inserted into MySQL (admission_applications). insertId:', result.insertId);

    return res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully to VINS College Admissions Desk.',
      applicationId: result.insertId,
    });
  } catch (error: any) {
    console.error('[Backend] ❌ MySQL INSERT failed for admission_applications:', error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to submit application to MySQL database',
      error: error.message,
    });
  }
}

export async function getAllApplications(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<AdmissionApplicationRow[]>(
      'SELECT * FROM admission_applications ORDER BY created_at DESC'
    );
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to retrieve applications from MySQL',
      error: error.message,
    });
  }
}

export async function updateApplicationStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'reviewed', 'admitted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid application status value' });
    }

    if (notes) {
      await executeQuery<ResultSetHeader>(
        'UPDATE admission_applications SET status = ?, notes = ? WHERE id = ?',
        [status, notes, id]
      );
    } else {
      await executeQuery<ResultSetHeader>(
        'UPDATE admission_applications SET status = ? WHERE id = ?',
        [status, id]
      );
    }

    return res.json({ success: true, message: `Application status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update application status',
      error: error.message,
    });
  }
}

export async function deleteApplication(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>(
      'DELETE FROM admission_applications WHERE id = ?',
      [req.params.id]
    );
    return res.json({ success: true, message: 'Application deleted successfully from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete application',
      error: error.message,
    });
  }
}
