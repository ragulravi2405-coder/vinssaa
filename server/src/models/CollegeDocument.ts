import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IDocument extends Document {
  title: string;
  filename: string;
  path: string;
  fileSize?: string;
  fileType?: string;
  category?: string;
  description?: string;
}

const DocumentSchema = new Schema<IDocument>(
  {
    title:       { type: String, required: true, trim: true },
    filename:    { type: String, required: true },
    path:        { type: String, required: true },
    fileSize:    { type: String, default: '1.5 MB' },
    fileType:    { type: String, default: 'PDF' },
    category:    { type: String, default: 'Official Documents' },
    description: { type: String, default: null },
  },
  { timestamps: true }
);

const CollegeDocument: Model<IDocument> = mongoose.model<IDocument>('CollegeDocument', DocumentSchema);
export default CollegeDocument;
