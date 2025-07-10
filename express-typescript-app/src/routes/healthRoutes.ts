import { Router } from 'express';
import { healthCheck } from '@/controllers/healthController';
import { asyncHandler } from '@/middleware/asyncHandler';

const router = Router();

/**
 * @route   GET /health
 * @desc    Health check endpoint
 * @access  Public
 */
router.get('/', asyncHandler(healthCheck));

export default router;