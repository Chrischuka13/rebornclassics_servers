import { type UploadApiResponse } from 'cloudinary';
import cloudinary from '../config/cloudinary.js';

export const uploadToCloudinary = (
  fileBuffer: Buffer,
  folder: string = 'reborn_media'
): Promise<UploadApiResponse> => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: 'auto', // Automatically detects images vs videos
      },
      (error, result) => {
        if (error || !result) return reject(error);
        resolve(result);
      }
    );

    uploadStream.end(fileBuffer);
  });
};

// Setting resource_type: 'auto' allows Cloudinary to automatically detect whether the uploaded file is an image or a video.