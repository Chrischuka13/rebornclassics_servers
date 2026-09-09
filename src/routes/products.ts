import { Router, type Request, type Response } from 'express';
import { Product } from '../models/Products.js';
import mongoose from 'mongoose';

const router = Router();

// ==========================================
// 1. POST - Create product
// ==========================================
router.post('/products', async (req: Request, res: Response): Promise<any> => {
  try {
    const newProduct = await Product.create(req.body);
    return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(400).json({ message: 'Error creating product', error });
  }
});

// ==========================================
// 2. PUT - Update an existing product by handle
// ==========================================
router.put('/products/:handle', async (req: Request<{ handle: string }>, res: Response): Promise<any> => {
  try {
    const updatedProduct = await Product.findOneAndUpdate(
      { handle: req.params.handle },
      req.body,
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(updatedProduct);
  } catch (error) {
    return res.status(400).json({ message: 'Error updating product', error });
  }
});

// ==========================================
// 3. GET - All Products with Filtering & Pagination
// (Handles category, section, page, and limit query parameters)
// ==========================================
router.get('/products', async (req: Request, res: Response): Promise<any> => {
  try {
    const { category, section, page, limit } = req.query;

    // Build filter object dynamically
    const filter: Record<string, any> = {};

    // Filter by category (e.g. "shirts", "trousers", "hoodies")
    if (category && typeof category === 'string') {
      filter.category = new RegExp(`^${category.trim()}$`, 'i');
    }

    // Filter by section
    if (section && typeof section === 'string') {
      filter.section = new RegExp(`^${section.trim()}$`, 'i');
    }

    // Pagination controls
    const pageNum = parseInt(page as string) || 1;
    const limitNum = parseInt(limit as string) || 8;
    const skip = (pageNum - 1) * limitNum;

    // Fetch total count matching the filters and paginated products
    const totalProducts = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const totalPages = Math.ceil(totalProducts / limitNum);
    const hasNextPage = pageNum < totalPages;

    return res.status(200).json({
      products,
      totalProducts,
      currentPage: pageNum,
      totalPages,
      hasNextPage,
      nextPage: hasNextPage ? pageNum + 1 : null,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return res.status(500).json({ message: 'Error fetching products', error });
  }
});

// ==========================================
// GET - Unique Categories with Cover Image & Count
// ==========================================
router.get('/categories', async (_req: Request, res: Response): Promise<any> => {
  try {
    const categories = await Product.aggregate([
      {
        $group: {
          _id: '$category',
          category: { $first: '$category' },
          image: { $first: '$featuredImage' },
          totalProducts: { $sum: 1 },
        },
      },
      { $sort: { category: 1 } },
    ]);

    return res.status(200).json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return res.status(500).json({ message: 'Error fetching categories', error });
  }
});


// ==========================================
// 4. GET - Single Product by ID or Handle
// (Must stay below GET /products so it doesn't intercept other routes)
// ==========================================
router.get('/products/:identifier', async (req: Request, res: Response): Promise<any> => {
  try {
    const { identifier } = req.params;

    if (!identifier || typeof identifier !== 'string') {
      return res.status(400).json({ message: 'Invalid product identifier' });
    }

    // Check if parameter is a valid 24-character MongoDB ObjectId
    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);

    // If valid ObjectId, search by _id OR handle; otherwise search by handle only
    const query = isObjectId
      ? { $or: [{ _id: identifier }, { handle: identifier }] }
      : { handle: identifier };

    const product = await Product.findOne(query);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product by ID/handle:', error);
    return res.status(500).json({ message: 'Error fetching product', error });
  }
});

export default router;