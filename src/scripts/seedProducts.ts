import 'dotenv/config';
import mongoose from 'mongoose';
import { Product } from '../models/Products.js';

const initialProducts = [

  {
    handle: 'fg-10-button-shirt',
    title: 'Women Blue Button Shirt',
    price: 4000,
    compareAtPrice: '3800',
    // Replace local paths with your actual Cloudinary links
    featuredImage: 'https://res.cloudinary.com/dfvc3gvvl/image/upload/v1787238423/reborn_media/kp4huhrxtt6pe4ha1nuh.jpg',
    hoverImage: 'https://res.cloudinary.com/dfvc3gvvl/image/upload/v1787236971/reborn_media/zndfupli0kdfhkdbjwyg.jpg',
    images: [
      'https://res.cloudinary.com/dfvc3gvvl/image/upload/v1787238423/reborn_media/kp4huhrxtt6pe4ha1nuh.jpg',
      'https://res.cloudinary.com/dfvc3gvvl/image/upload/v1787236971/reborn_media/zndfupli0kdfhkdbjwyg.jpg',
    ],
    description: 'A stylish blue button shirt perfect for autumn wear.',
    status: 'In Stock',
    material: 'Cotton Blend',
    careInstructions: 'Machine wash cold, tumble dry low.',
    sizes: ['S', 'M', 'L', 'XL'],
    fit: 'Regular Fit',
    section: 'Women',
    category: "Shirt"
  },
];

const seedDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI is missing!');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing products to prevent duplicates
    await Product.deleteMany({});

    // Insert initial items
    await Product.insertMany(initialProducts);
    console.log('Database successfully seeded with products!');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDB();