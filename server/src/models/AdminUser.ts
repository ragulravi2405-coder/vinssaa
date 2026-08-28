import mongoose, { Schema, Model } from 'mongoose';

export interface IAdminUser {
  username: string;
  email: string;
  passwordHash: string;
  role: string;
  isActive: boolean;
  lastLogin?: Date | null;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true, trim: true, maxlength: 100 },
    email:    { type: String, required: true, unique: true, trim: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role:     { type: String, default: 'admin', enum: ['admin', 'superadmin'] },
    isActive: { type: Boolean, default: true },
    lastLogin: { type: Date, default: null },
  },
  { timestamps: true }
);

// Omit passwordHash from JSON output by default
AdminUserSchema.set('toJSON', {
  transform: (_doc: any, ret: any) => {
    delete ret.passwordHash;
    return ret;
  },
});

const AdminUser: Model<IAdminUser> = mongoose.model<IAdminUser>('AdminUser', AdminUserSchema);
export default AdminUser;
