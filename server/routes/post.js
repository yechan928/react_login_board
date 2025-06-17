// server/routes/posts.js

import express from 'express';
import { list } from '../controllers/postController.js';

const router = express.Router();

// GET /posts
router.get('/', list);

export default router;
