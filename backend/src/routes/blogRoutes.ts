import express from 'express';
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from '../controllers/blogController';
import { protect, admin } from '../middlewares/authMiddleware';

const router = express.Router();

router.route('/')
  .get(getBlogs)
  .post(protect, admin, createBlog);

router.route('/:id')
  .get(getBlogById)
  .put(protect, admin, updateBlog)
  .delete(protect, admin, deleteBlog);

export default router;
