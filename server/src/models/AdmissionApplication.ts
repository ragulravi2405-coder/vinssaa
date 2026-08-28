import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IAdmissionApplication extends Document {
  fullName: string;
  dob?: string;
  phone: string;
  email: string;
  academicYear?: string;
  category: 'UG' | 'PG';
  preferredCourse: string;
  qualification?: string;
  percentage?: string;
  city?: string;
  status: 'pending' | 'reviewed' | 'admitted' | 'rejected';
  notes?: string;
}

const AdmissionApplicationSchema = new Schema<IAdmissionApplication>(
  {
    fullName:        { type: String, required: true, trim: true },
    dob:             { type: String, default: null },
    phone:           { type: String, required: true, trim: true },
    email:           { type: String, required: true, trim: true, lowercase: true },
    academicYear:    { type: String, default: '2027 - 2028' },
    category:        { type: String, required: true, enum: ['UG', 'PG'], default: 'UG' },
    preferredCourse: { type: String, required: true },
    qualification:   { type: String, default: 'HSC' },
    percentage:      { type: String, default: null },
    city:            { type: String, default: 'Nagercoil' },
    status:          {
      type: String,
      enum: ['pending', 'reviewed', 'admitted', 'rejected'],
      default: 'pending',
    },
    notes: { type: String, default: null },
  },
  { timestamps: true }
);

const AdmissionApplication: Model<IAdmissionApplication> = mongoose.model<IAdmissionApplication>(
  'AdmissionApplication',
  AdmissionApplicationSchema
);
export default AdmissionApplication;
