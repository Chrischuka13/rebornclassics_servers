import mongoose, { Document } from 'mongoose';
export interface IProduct extends Document {
    handle: string;
    title: string;
    price: number;
    compareAtPrice?: number;
    featuredImage: string;
    hoverImage?: string;
    images?: string[];
    description?: string;
    status?: string;
    material?: string;
    careInstructions?: string;
    sizes?: string[];
    fit?: string;
    section?: string;
    category?: string;
}
export declare const Product: mongoose.Model<IProduct, {}, {}, {}, Document<unknown, {}, IProduct, {}, mongoose.DefaultSchemaOptions> & IProduct & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IProduct>;
//# sourceMappingURL=Products.d.ts.map