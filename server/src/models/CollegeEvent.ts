import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ICollegeEvent extends Document {
  title: string;
  subtitle?: string;
  category: string;
  date: string;
  imagePath: string;
  description?: string;
  chiefGuest?: string;
}

const CollegeEventSchema = new Schema<ICollegeEvent>(
  {
    title:       { type: String, required: true, trim: true },
    subtitle:    { type: String, default: null },
    category:    { type: String, default: 'Ceremony' },
    date:        { type: String, required: true },
    imagePath:   { type: String, required: true },
    description: { type: String, default: null },
    chiefGuest:  { type: String, default: null },
  },
  { timestamps: true }
);

const CollegeEvent: Model<ICollegeEvent> = mongoose.model<ICollegeEvent>('CollegeEvent', CollegeEventSchema);
export default CollegeEvent;
