import { Request, Response } from 'express';
import SiteSetting from '../models/SiteSetting.js';

export async function getAllSettings(_req: Request, res: Response) {
  try {
    const rows = await SiteSetting.find();
    const settingsMap: Record<string, any> = {};
    rows.forEach((r) => { settingsMap[r.key] = r.value; });
    return res.json({ success: true, data: settingsMap });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch settings', error: error.message });
  }
}

export async function getSettingByKey(req: Request, res: Response) {
  try {
    const { key } = req.params;
    const row = await SiteSetting.findOne({ key });
    if (!row) return res.status(404).json({ success: false, message: 'Setting not found' });
    return res.json({ success: true, data: row.value });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to fetch setting', error: error.message });
  }
}

export async function updateSetting(req: Request, res: Response) {
  try {
    const { key } = req.params;
    const { value } = req.body;
    const doc = await SiteSetting.findOneAndUpdate(
      { key },
      { key, value },
      { upsert: true, new: true }
    );
    return res.json({ success: true, message: `Setting "${key}" updated successfully in MongoDB`, data: doc?.value });
  } catch (error: any) {
    return res.status(500).json({ success: false, message: 'Failed to update setting', error: error.message });
  }
}
