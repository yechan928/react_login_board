// server/routes/posts.js

import express from 'express';
import { list, detail } from '../controllers/postController.js';

const router = express.Router();

// GET /posts
router.get('/', list);
router.get('/:id', detail);            

export default router;
