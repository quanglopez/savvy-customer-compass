import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

interface NotificationSettings {
  emailNotifications: boolean;
  newChatAlert: boolean;
  newMessageAlert: boolean;
}

export interface IUser extends Document {
  email: string;
  password: string;
  businessName?: string;
  role: 'admin' | 'business' | 'user';
  createdAt: Date;
  notificationSettings?: NotificationSettings;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const notificationSettingsSchema = new Schema<NotificationSettings>({
  emailNotifications: {
    type: Boolean,
    default: true,
  },
  newChatAlert: {
    type: Boolean,
    default: true,
  },
  newMessageAlert: {
    type: Boolean,
    default: true,
  },
});

const userSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  businessName: {
    type: String,
    trim: true,
  },
  role: {
    type: String,
    enum: ['admin', 'business', 'user'],
    default: 'user',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  notificationSettings: {
    type: notificationSettingsSchema,
    default: () => ({
      emailNotifications: true,
      newChatAlert: true,
      newMessageAlert: true,
    }),
  },
});

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare password for login
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = mongoose.model<IUser>('User', userSchema); 