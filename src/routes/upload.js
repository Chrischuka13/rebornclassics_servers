// Import the Media model in your upload route and save the response from Cloudinary before sending the HTTP response back to the client:
import { Router } from 'express';
import { upload } from '../middleware/upload.js';
import { uploadToCloudinary } from '../utils/cloudinaryUpload.js';
import { Media } from '../models/Media.js';
const router = Router();
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }
        const result = await uploadToCloudinary(req.file.buffer);
        // Save the media information to MongoDB
        const newMedia = new Media({
            url: result.secure_url,
            publicId: result.public_id,
            resourceType: result.resource_type, // 'image' or 'video'
        });
        await newMedia.save();
        return res.status(200).json({
            message: 'File uploaded and saved to Databasesuccessfully',
            data: newMedia
        });
    }
    catch (error) {
        console.error('Upload Error:', error);
        return res.status(500).json({ message: 'Cloudinary upload failed', error });
    }
});
router.get('/media', async (req, res) => {
    try {
        const mediaList = await Media.find().sort({ createdAt: -1 }); // Sort by newest first
        return res.status(200).json({
            message: 'Media retrieved successfully',
            data: mediaList
        });
    }
    catch (error) {
        console.error('Retrieve Media Error:', error);
        return res.status(500).json({ message: 'Failed to retrieve media', error });
    }
});
export default router;
//# sourceMappingURL=upload.js.map