import mongoose, { Schema, Document } from 'mongoose';
const ProductSchema = new Schema({
    handle: { type: String, required: true },
    title: { type: String, required: true },
    price: { type: Number, required: true },
    compareAtPrice: { type: Number },
    featuredImage: { type: String, required: true },
    hoverImage: { type: String },
    images: [{ type: String }],
    description: { type: String },
    status: { type: String },
    material: { type: String },
    careInstructions: { type: String },
    sizes: [{ type: String }],
    fit: { type: String },
    section: { type: String }, // <-- CRITICAL: Must be in the Schema definition!
    category: { type: String }
}, { timestamps: true });
if (mongoose.models.Product) {
    delete mongoose.models.Product;
}
export const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);
//# sourceMappingURL=Products.js.map