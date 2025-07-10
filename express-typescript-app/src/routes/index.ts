import { Router } from 'express';
import healthRoutes from './healthRoutes';
import userRoutes from './userRoutes';

const router = Router();

// Health check routes
router.use('/health', healthRoutes);

// User routes
router.use('/users', userRoutes);

// Root route
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API is running!',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  });
});

export default router;