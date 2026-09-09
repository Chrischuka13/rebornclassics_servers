// Create a schema to define how media items are saved in MongoDB:
import mongoose, { Schema, Document } from 'mongoose';
const MediaSchema = new Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true },
    resourceType: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});
export const Media = mongoose.model('Media', MediaSchema);
//# sourceMappingURL=Media.js.map