import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IContactInquiry extends Document {
  name: string;
  email?: string;
  phone?: string;
  subject?: string;
  message: string;
  source: 'footer' | 'contact_page' | 'quick_inquiry';
  status: 'new' | 'in_progress' | 'contacted' | 'closed';
}

const ContactInquirySchema = new Schema<IContactInquiry>(
  {
    name:    { type: String, required: true, trim: true },
    email:   { type: String, trim: true, lowercase: true, default: '' },
    phone:   { type: String, trim: true, default: '' },
    subject: { type: String, default: 'General Inquiry' },
    message: { type: String, required: true },
    source:  {
      type: String,
      enum: ['footer', 'contact_page', 'quick_inquiry'],
      default: 'quick_inquiry',
    },
    status: {
      type: String,
      enum: ['new', 'in_progress', 'contacted', 'closed'],
      default: 'new',
    },
  },
  { timestamps: true }
);

const ContactInquiry: Model<IContactInquiry> = mongoose.model<IContactInquiry>('ContactInquiry', ContactInquirySchema);
export default ContactInquiry;
