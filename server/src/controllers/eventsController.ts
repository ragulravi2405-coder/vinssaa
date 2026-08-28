import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface EventRow extends RowDataPacket {
  id: string;
  title: string;
  subtitle?: string;
  category: string;
  date_str: string;
  image_path: string;
  description?: string;
  chief_guest?: string;
  created_at: string;
}

function formatEvent(r: EventRow) {
  return {
    id: r.id,
    title: r.title,
    subtitle: r.subtitle || null,
    category: r.category,
    date: r.date_str,
    imagePath: r.image_path,
    description: r.description || null,
    chiefGuest: r.chief_guest || null,
  };
}

export async function getAllEvents(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<EventRow[]>(
      'SELECT * FROM college_events ORDER BY created_at DESC'
    );
    const data = rows.map(formatEvent);
    return res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch events from MySQL',
      error: error.message,
    });
  }
}

export async function createEvent(req: Request, res: Response) {
  try {
    const { title, subtitle, category = 'Ceremony', date, imagePath, description, chiefGuest } = req.body;
    if (!title || !imagePath) {
      return res.status(400).json({ success: false, message: 'Title and imagePath are required' });
    }
    const id = `evt-${Date.now()}`;
    const dateStr = date || new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' });

    await executeQuery<ResultSetHeader>(
      `INSERT INTO college_events (id, title, subtitle, category, date_str, image_path, description, chief_guest)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [id, title, subtitle || null, category, dateStr, imagePath, description || null, chiefGuest || null]
    );

    return res.status(201).json({
      success: true,
      message: 'Event created successfully in MySQL',
      id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to create event',
      error: error.message,
    });
  }
}

export async function updateEvent(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, subtitle, category, date, imagePath, description, chiefGuest } = req.body;

    await executeQuery<ResultSetHeader>(
      `UPDATE college_events SET
         title = COALESCE(?, title),
         subtitle = COALESCE(?, subtitle),
         category = COALESCE(?, category),
         date_str = COALESCE(?, date_str),
         image_path = COALESCE(?, image_path),
         description = COALESCE(?, description),
         chief_guest = COALESCE(?, chief_guest)
       WHERE id = ?`,
      [
        title ?? null,
        subtitle ?? null,
        category ?? null,
        date ?? null,
        imagePath ?? null,
        description ?? null,
        chiefGuest ?? null,
        id,
      ]
    );

    return res.json({ success: true, message: 'Event updated in MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update event',
      error: error.message,
    });
  }
}

export async function deleteEvent(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>('DELETE FROM college_events WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Event deleted from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete event',
      error: error.message,
    });
  }
}
