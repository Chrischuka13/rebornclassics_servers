import mongoose, { Document } from 'mongoose';
export interface IMedia extends Document {
    url: string;
    publicId: string;
    resourceType: string;
    createdAt: Date;
}
export declare const Media: mongoose.Model<IMedia, {}, {}, {}, Document<unknown, {}, IMedia, {}, mongoose.DefaultSchemaOptions> & IMedia & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
} & {
    id: string;
}, any, IMedia>;
//# sourceMappingURL=Media.d.ts.map