import { Request, Response } from 'express';
import CollegeDocument from '../models/CollegeDocument.js';

export async function getAllDocuments(_req: Request, res: Response) {
  try {
    const docs = await CollegeDocument.find().sort({ createdAt: -1 });
    return res.json({ success: true, count: docs.length, data: docs });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch documents', error: error.message });
  }
}

export async function createDocument(req: Request, res: Response) {
  try {
    const { title, filename, path, fileSize = '1.5 MB', fileType = 'PDF', category = 'Official Documents', description } = req.body;
    if (!title || !path) {
      return res.status(400).json({ success: false, message: 'Title and path are required' });
    }
    const fname = filename || `${title.toLowerCase().replace(/\s+/g, '-')}.pdf`;
    const doc = await CollegeDocument.create({ title, filename: fname, path, fileSize, fileType, category, description: description || null });
    return res.status(201).json({ success: true, message: 'Document saved to MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to save document', error: error.message });
  }
}

export async function updateDocument(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const { title, filename, path, fileSize, fileType, category, description } = req.body;
    const update: Record<string, any> = {};
    if (title !== undefined)       update.title       = title;
    if (filename !== undefined)    update.filename    = filename;
    if (path !== undefined)        update.path        = path;
    if (fileSize !== undefined)    update.fileSize    = fileSize;
    if (fileType !== undefined)    update.fileType    = fileType;
    if (category !== undefined)    update.category    = category;
    if (description !== undefined) update.description = description;

    const doc = await CollegeDocument.findByIdAndUpdate(id, update, { new: true });
    if (!doc) return res.status(404).json({ success: false, message: 'Document not found' });

    return res.json({ success: true, message: 'Document updated in MongoDB', data: doc });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update document', error: error.message });
  }
}

export async function deleteDocument(req: Request, res: Response) {
  try {
    await CollegeDocument.findByIdAndDelete(req.params.id);
    return res.json({ success: true, message: 'Document deleted from MongoDB' });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to delete document', error: error.message });
  }
}
