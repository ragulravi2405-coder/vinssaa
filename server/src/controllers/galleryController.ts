import { Request, Response } from 'express';
import { executeQuery } from '../config/database.js';
import { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

interface GalleryRow extends RowDataPacket {
  id: string;
  title: string;
  category: string;
  image_path: string;
  description?: string;
  sort_order: number;
}

function formatGallery(r: GalleryRow) {
  return {
    id: r.id,
    title: r.title,
    category: r.category,
    imagePath: r.image_path,
    description: r.description || null,
    sortOrder: r.sort_order,
  };
}

export async function getAllGalleryImages(_req: Request, res: Response) {
  try {
    const rows = await executeQuery<GalleryRow[]>(
      'SELECT * FROM gallery_images ORDER BY sort_order ASC, created_at DESC'
    );
    const data = rows.map(formatGallery);
    return res.json({ success: true, count: data.length, data });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to fetch gallery images from MySQL',
      error: error.message,
    });
  }
}

export async function createGalleryImage(req: Request, res: Response) {
  try {
    const { title, category = 'Campus', imagePath, description } = req.body;
    if (!title || !imagePath) {
      return res.status(400).json({ success: false, message: 'Title and imagePath are required' });
    }
    const id = `gal-${Date.now()}`;
    await executeQuery<ResultSetHeader>(
      'INSERT INTO gallery_images (id, title, category, image_path, description) VALUES (?, ?, ?, ?, ?)',
      [id, title, category, imagePath, description || null]
    );
    return res.status(201).json({
      success: true,
      message: 'Gallery image added to MySQL',
      id,
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to add gallery image',
      error: error.message,
    });
  }
}

export async function updateGalleryImage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, category, imagePath, description } = req.body;

    await executeQuery<ResultSetHeader>(
      `UPDATE gallery_images SET
         title = COALESCE(?, title),
         category = COALESCE(?, category),
         image_path = COALESCE(?, image_path),
         description = COALESCE(?, description)
       WHERE id = ?`,
      [title ?? null, category ?? null, imagePath ?? null, description ?? null, id]
    );
    return res.json({ success: true, message: 'Gallery image updated in MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to update gallery image',
      error: error.message,
    });
  }
}

export async function deleteGalleryImage(req: Request, res: Response) {
  try {
    await executeQuery<ResultSetHeader>('DELETE FROM gallery_images WHERE id = ?', [req.params.id]);
    return res.json({ success: true, message: 'Gallery image deleted from MySQL' });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: 'Failed to delete gallery image',
      error: error.message,
    });
  }
}
