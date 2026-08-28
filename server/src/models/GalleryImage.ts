import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IGalleryImage extends Document {
  title: string;
  category: string;
  imagePath: string;
  description?: string;
  sortOrder?: number;
}

const GalleryImageSchema = new Schema<IGalleryImage>(
  {
    title:       { type: String, required: true, trim: true },
    category:    { type: String, default: 'Campus' },
    imagePath:   { type: String, required: true },
    description: { type: String, default: null },
    sortOrder:   { type: Number, default: 0 },
  },
  { timestamps: true }
);

const GalleryImage: Model<IGalleryImage> = mongoose.model<IGalleryImage>('GalleryImage', GalleryImageSchema);
export default GalleryImage;
