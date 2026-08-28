import mongoose, { Schema, Model } from 'mongoose';

export interface IPdfAttachment {
  id?: string;
  title?: string;
  filename?: string;
  path?: string;
  fileSize?: string;
  fileType?: string;
  category?: string;
  description?: string;
}

export interface INotification {
  title: string;
  date: string;
  category: 'Admissions' | 'Exams' | 'Placements' | 'Events' | 'Circulars' | 'Scholarships';
  isUrgent?: boolean;
  isNewNotification?: boolean;
  summary: string;
  fullDetails: string;
  issuedBy: string;
  externalLink?: string | null;
  pdfAttachment?: IPdfAttachment | null;
}

const PdfAttachmentSchema = new Schema<IPdfAttachment>(
  {
    id:          { type: String },
    title:       { type: String },
    filename:    { type: String },
    path:        { type: String },
    fileSize:    { type: String },
    fileType:    { type: String, default: 'PDF' },
    category:    { type: String },
    description: { type: String },
  },
  { _id: false }
);

const NotificationSchema = new Schema<INotification>(
  {
    title:       { type: String, required: true, trim: true },
    date:        { type: String, required: true },
    category:    {
      type: String,
      required: true,
      enum: ['Admissions', 'Exams', 'Placements', 'Events', 'Circulars', 'Scholarships'],
      default: 'Circulars',
    },
    isUrgent:           { type: Boolean, default: false },
    isNewNotification:  { type: Boolean, default: true },
    summary:            { type: String, required: true },
    fullDetails:        { type: String, required: true },
    issuedBy:           { type: String, default: 'Principal Office & Administration' },
    externalLink:       { type: String, default: null },
    pdfAttachment:      { type: PdfAttachmentSchema, default: null },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (_doc: any, ret: any) => {
        // Map isNewNotification back to isNew for frontend compatibility
        ret.isNew = ret.isNewNotification ?? true;
        return ret;
      },
    },
  }
);

const Notification: Model<INotification> = mongoose.model<INotification>('Notification', NotificationSchema);
export default Notification;
