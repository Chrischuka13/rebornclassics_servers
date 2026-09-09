// Create a schema to define how media items are saved in MongoDB:

import mongoose, { Schema, Document } from 'mongoose';

export interface IMedia extends Document {
  url: string;
  publicId: string;
  resourceType: string;
  createdAt: Date;
}

const MediaSchema = new Schema<IMedia>({
  url: { type: String, required: true },
  publicId: { type: String, required: true },
  resourceType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export const Media = mongoose.model<IMedia>('Media', MediaSchema);