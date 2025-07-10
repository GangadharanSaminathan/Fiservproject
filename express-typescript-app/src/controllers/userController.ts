import { Request, Response } from 'express';
import { User } from '@/types';
import { sendSuccess, sendError } from '@/utils/response';
import { logger } from '@/config/logger';
import { AppError } from '@/middleware/errorHandler';

// Mock user data (replace with actual database operations)
const mockUsers: User[] = [
  {
    id: '1',
    email: 'john@example.com',
    firstName: 'John',
    lastName: 'Doe',
    role: 'user',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: '2',
    email: 'jane@example.com',
    firstName: 'Jane',
    lastName: 'Smith',
    role: 'admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    logger.info('Fetching all users', { ip: req.ip });
    
    // Simulate database operation
    const users = mockUsers;
    
    sendSuccess(res, users, 'Users retrieved successfully');
  } catch (error) {
    logger.error('Error fetching users', { error });
    throw new AppError('Failed to fetch users', 500);
  }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    logger.info('Fetching user by ID', { userId: id, ip: req.ip });
    
    // Simulate database operation
    const user = mockUsers.find(u => u.id === id);
    
    if (!user) {
      throw new AppError('User not found', 404);
    }
    
    sendSuccess(res, user, 'User retrieved successfully');
  } catch (error) {
    logger.error('Error fetching user', { error, userId: req.params.id });
    throw error;
  }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, firstName, lastName, role } = req.body;
    
    logger.info('Creating new user', { email, ip: req.ip });
    
    // Check if user already exists
    const existingUser = mockUsers.find(u => u.email === email);
    if (existingUser) {
      throw new AppError('User with this email already exists', 409);
    }
    
    // Create new user
    const newUser: User = {
      id: (mockUsers.length + 1).toString(),
      email,
      firstName,
      lastName,
      role: role || 'user',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    mockUsers.push(newUser);
    
    logger.info('User created successfully', { userId: newUser.id });
    sendSuccess(res, newUser, 'User created successfully', 201);
  } catch (error) {
    logger.error('Error creating user', { error, email: req.body.email });
    throw error;
  }
};

export const updateUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { firstName, lastName, role } = req.body;
    
    logger.info('Updating user', { userId: id, ip: req.ip });
    
    // Find user
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new AppError('User not found', 404);
    }
    
    // Update user
    const updatedUser = {
      ...mockUsers[userIndex],
      firstName: firstName || mockUsers[userIndex].firstName,
      lastName: lastName || mockUsers[userIndex].lastName,
      role: role || mockUsers[userIndex].role,
      updatedAt: new Date(),
    };
    
    mockUsers[userIndex] = updatedUser;
    
    logger.info('User updated successfully', { userId: id });
    sendSuccess(res, updatedUser, 'User updated successfully');
  } catch (error) {
    logger.error('Error updating user', { error, userId: req.params.id });
    throw error;
  }
};

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    
    logger.info('Deleting user', { userId: id, ip: req.ip });
    
    // Find user
    const userIndex = mockUsers.findIndex(u => u.id === id);
    if (userIndex === -1) {
      throw new AppError('User not found', 404);
    }
    
    // Remove user
    const deletedUser = mockUsers.splice(userIndex, 1)[0];
    
    logger.info('User deleted successfully', { userId: id });
    sendSuccess(res, deletedUser, 'User deleted successfully');
  } catch (error) {
    logger.error('Error deleting user', { error, userId: req.params.id });
    throw error;
  }
};