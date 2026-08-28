import { Request, Response } from 'express';
import CollegeEvent from '../models/CollegeEvent.js';

export async function getAllEvents(_req: Request, res: Response) {
  try {
    const docs = await CollegeEvent.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: docs.length, data: docs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch events', error: error.message });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const { title, subtitle, category = 'Ceremony', date, imagePath, description, chiefGuest } = req.body;
    if (!title || !imagePath) {
      return res.status(400).json({ success: false, message: 'Title and imagePath are required' });
    }
    const dateStr = date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });
    const doc = await CollegeEvent.create({
      title, subtitle: subtitle || null, category, date: dateStr,
      imagePath, description: description || null, chiefGuest: chiefGuest || null,
    });
    return res.status(201).json({ success: true, message: 'Event created successfully in MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to create event', error: error.message });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, subtitle, category, date, imagePath, description, chiefGuest } = req.body;
    const update: Record<string, any> = {};
    if (title !== undefined)       update.title       = title;
    if (subtitle !== undefined)    update.subtitle    = subtitle;
    if (category !== undefined)    update.category    = category;
    if (date !== undefined)        update.date        = date;
    if (imagePath !== undefined)   update.imagePath   = imagePath;
    if (description !== undefined) update.description = description;
    if (chiefGuest !== undefined)  update.chiefGuest  = chiefGuest;

    const doc = await CollegeEvent.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Event not found' });

    return res.json({ success: true, message: 'Event updated in MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update event', error: error.message });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    await CollegeEvent.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Event deleted from MongoDB' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete event', error: error.message });
  }
}
