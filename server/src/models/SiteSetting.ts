import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ISiteSetting extends Document {
  key: string;
  value: any;
}

const SiteSettingSchema = new Schema<ISiteSetting>(
  {
    key:   { type: String, required: true, unique: true },
    value: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: false }
);

const SiteSetting: Model<ISiteSetting> = mongoose.model<ISiteSetting>('SiteSetting', SiteSettingSchema);
export default SiteSetting;
