import { Request, Response } from 'express';
import GalleryImage from '../models/GalleryImage.js';

export async function getAllGalleryImages(_req: Request, res: Response) {
  try {
    const docs = await GalleryImage.find().sort({ sortOrder: 1, createdAt: -1 });
    return res.json({ success: true, count: docs.length, data: docs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch gallery images', error: error.message });
  }
}

export async function createGalleryImage(req: Request, res: Response) {
  try {
    const { title, category = 'Campus', imagePath, description } = req.body;
    if (!title || !imagePath) {
      return res.status(400).json({ success: false, message: 'Title and imagePath are required' });
    }
    const doc = await GalleryImage.create({ title, category, imagePath, description: description || null });
    return res.status(201).json({ success: true, message: 'Gallery image added to MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to add gallery image', error: error.message });
  }
}

export async function updateGalleryImage(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, category, imagePath, description } = req.body;
    const update: Record<string, any> = {};
    if (title !== undefined)       update.title       = title;
    if (category !== undefined)    update.category    = category;
    if (imagePath !== undefined)   update.imagePath   = imagePath;
    if (description !== undefined) update.description = description;

    const doc = await GalleryImage.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Gallery image not found' });

    return res.json({ success: true, message: 'Gallery image updated', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update gallery image', error: error.message });
  }
}

export async function deleteGalleryImage(req: Request, res: Response) {
  try {
    await GalleryImage.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Gallery image deleted from MongoDB' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete gallery image', error: error.message });
  }
}
