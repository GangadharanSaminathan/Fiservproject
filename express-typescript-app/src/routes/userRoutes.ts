import { Router } from 'express';
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '@/controllers/userController';
import { asyncHandler } from '@/middleware/asyncHandler';
import { validateRequiredFields, validateEmail } from '@/middleware/validation';

const router = Router();

/**
 * @route   GET /users
 * @desc    Get all users
 * @access  Public
 */
router.get('/', asyncHandler(getAllUsers));

/**
 * @route   GET /users/:id
 * @desc    Get user by ID
 * @access  Public
 */
router.get('/:id', asyncHandler(getUserById));

/**
 * @route   POST /users
 * @desc    Create a new user
 * @access  Public
 */
router.post(
  '/',
  validateRequiredFields(['email', 'firstName', 'lastName']),
  validateEmail,
  asyncHandler(createUser)
);

/**
 * @route   PUT /users/:id
 * @desc    Update user by ID
 * @access  Public
 */
router.put('/:id', asyncHandler(updateUser));

/**
 * @route   DELETE /users/:id
 * @desc    Delete user by ID
 * @access  Public
 */
router.delete('/:id', asyncHandler(deleteUser));

export default router;