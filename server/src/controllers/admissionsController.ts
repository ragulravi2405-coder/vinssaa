import { Request, Response } from 'express';
import AdmissionApplication from '../models/AdmissionApplication.js';

export async function submitApplication(req: Request, res: Response) {
  try {
    const {
      fullName, dob, phone, email,
      academicYear = '2027 - 2028', category = 'UG',
      preferredCourse, qualification = 'HSC', percentage, city = 'Nagercoil',
    } = req.body;

    if (!fullName || !phone || !email || !preferredCourse) {
      return res.status(400).json({
        success: false,
        message: 'Full name, phone, email, and preferred course are required.',
      });
    }

    const doc = await AdmissionApplication.create({
      fullName: fullName.trim(), dob: dob || null, phone: phone.trim(),
      email: email.trim(), academicYear, category, preferredCourse,
      qualification, percentage: percentage || null, city: city.trim(), status: 'pending',
    });

    return res.status(201).json({
      success: true,
      message: 'Admission application submitted successfully to VINS College Admissions Desk.',
      applicationId: doc._id,
    });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to submit application to database', error: error.message });
  }
}

export async function getAllApplications(_req: Request, res: Response) {
  try {
    const rows = await AdmissionApplication.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: rows.length, data: rows });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve applications', error: error.message });
  }
}

export async function updateApplicationStatus(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    if (!['pending', 'reviewed', 'admitted', 'rejected'].includes(status)) {
      return res.status(400).json({ success: false, message: 'Invalid application status value' });
    }

    const update: Record<string, any> = { status };
    if (notes) update.notes = notes;

    const doc = await AdmissionApplication.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Application not found' });

    return res.json({ success: true, message: `Application status updated to ${status}` });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update application status', error: error.message });
  }
}

export async function deleteApplication(req: Request, res: Response) {
  try {
    await AdmissionApplication.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete application', error: error.message });
  }
}
