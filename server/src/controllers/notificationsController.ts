import { Request, Response } from 'express';
import Notification from '../models/Notification.js';

export async function getAllNotifications(_req: Request, res: Response) {
  try {
    const docs = await Notification.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: docs.length, data: docs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to retrieve notifications', error: error.message });
  }
}

export async function getNotificationById(req: Request, res: Response) {
  try {
    const doc = await Notification.findById(req.params.id);
    if (!doc) return res.status(404).json({ success: false, message: 'Notification not found' });
    return res.json({ success: true, data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Error fetching notification', error: error.message });
  }
}

export async function createNotification(req: Request, res: Response) {
  try {
    const {
      title, category = 'Circulars', isUrgent = false, summary,
      fullDetails, issuedBy = 'Principal Office & Admissions',
      pdfAttachment, externalLink,
    } = req.body;

    if (!title || !summary) {
      return res.status(400).json({ success: false, message: 'Title and summary are required fields' });
    }

    const dateStr = req.body.date || new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

    const doc = await Notification.create({
      title, date: dateStr, category, isNewNotification: true, isUrgent,
      summary, fullDetails: fullDetails || summary,
      issuedBy, pdfAttachment: pdfAttachment || null, externalLink: externalLink || null,
    });

    return res.status(201).json({ success: true, message: 'Notification created successfully in MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to create notification', error: error.message });
  }
}

export async function updateNotification(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, date, category, isUrgent, summary, fullDetails, issuedBy, pdfAttachment, externalLink } = req.body;

    const update: Record<string, any> = {};
    if (title !== undefined)        update.title        = title;
    if (date !== undefined)         update.date         = date;
    if (category !== undefined)     update.category     = category;
    if (isUrgent !== undefined)     update.isUrgent     = isUrgent;
    if (summary !== undefined)      update.summary      = summary;
    if (fullDetails !== undefined)  update.fullDetails  = fullDetails;
    if (issuedBy !== undefined)     update.issuedBy     = issuedBy;
    if (pdfAttachment !== undefined) update.pdfAttachment = pdfAttachment;
    if (externalLink !== undefined) update.externalLink = externalLink;

    const doc = await Notification.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Notification not found' });

    return res.json({ success: true, message: 'Notification updated successfully in MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update notification', error: error.message });
  }
}

export async function deleteNotification(req: Request, res: Response) {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Notification deleted successfully from MongoDB' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete notification', error: error.message });
  }
}
