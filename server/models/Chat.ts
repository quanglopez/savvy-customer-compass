import mongoose, { Document, Schema } from 'mongoose';

export interface IMessage {
  sender: mongoose.Types.ObjectId;
  content: string;
  timestamp: Date;
  isBot: boolean;
}

export interface IChat extends Document {
  businessId: mongoose.Types.ObjectId;
  userId: mongoose.Types.ObjectId;
  messages: IMessage[];
  status: 'active' | 'closed';
  createdAt: Date;
  updatedAt: Date;
}

const messageSchema = new Schema<IMessage>({
  sender: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  isBot: {
    type: Boolean,
    default: false,
  },
});

const chatSchema = new Schema<IChat>({
  businessId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  messages: [messageSchema],
  status: {
    type: String,
    enum: ['active', 'closed'],
    default: 'active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
chatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Chat = mongoose.model<IChat>('Chat', chatSchema); 