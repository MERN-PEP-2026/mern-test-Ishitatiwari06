import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createCourse, getCourses, deleteCourse } from '../controllers/courseController.js';

const router = express.Router();

router.post("/", protect, createCourse);
router.get("/", protect, getCourses);
router.delete("/:id", protect, deleteCourse);

export default router;