import { v2 as cloudinary } from 'cloudinary';

    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dfvc3gvvl', 
        api_key: process.env.CLOUDINARY_API_KEY || '252478262822514', 
        api_secret: process.env.CLOUDINARY_API_SECRET || '<your_api_secret>' // Click 'View API Keys' above to copy your API secret
    });
    


export default cloudinary;