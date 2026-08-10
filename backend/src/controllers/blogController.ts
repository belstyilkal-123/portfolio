import { Request, Response } from 'express';
import Blog from '../models/Blog';

const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
};

const calculateReadingTime = (content: string): number => {
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / 200);
};

export const getBlogs = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = req.query.status === 'published' ? { isPublished: true } : {};
    const blogs = await Blog.find(query).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const getBlogById = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog);
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};

export const createBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, excerpt, coverImage, categories, tags, isPublished } = req.body;
    
    const slug = generateSlug(title);
    const readingTime = calculateReadingTime(content);

    const blog = new Blog({
      title,
      slug,
      content,
      excerpt,
      coverImage,
      categories,
      tags,
      readingTime,
      isPublished
    });

    const createdBlog = await blog.save();
    res.status(201).json(createdBlog);
  } catch (error) {
    res.status(400).json({ message: 'Invalid blog data or slug already exists' });
  }
};

export const updateBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, content, excerpt, coverImage, categories, tags, isPublished } = req.body;
    
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      res.status(404).json({ message: 'Blog not found' });
      return;
    }

    if (title && title !== blog.title) {
      blog.title = title;
      blog.slug = generateSlug(title);
    }
    
    if (content !== undefined) {
      blog.content = content;
      blog.readingTime = calculateReadingTime(content);
    }
    
    if (excerpt !== undefined) blog.excerpt = excerpt;
    if (coverImage !== undefined) blog.coverImage = coverImage;
    if (categories !== undefined) blog.categories = categories;
    if (tags !== undefined) blog.tags = tags;
    if (isPublished !== undefined) blog.isPublished = isPublished;

    const updatedBlog = await blog.save();
    res.json(updatedBlog);
  } catch (error) {
    res.status(400).json({ message: 'Invalid update data' });
  }
};

export const deleteBlog = async (req: Request, res: Response): Promise<void> => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (blog) {
      await blog.deleteOne();
      res.json({ message: 'Blog removed' });
    } else {
      res.status(404).json({ message: 'Blog not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
};
