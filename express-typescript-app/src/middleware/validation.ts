import { Request, Response, NextFunction } from 'express';
import { AppError } from './errorHandler';

// Simple validation middleware example
export const validateRequiredFields = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields: string[] = [];

    for (const field of fields) {
      if (!req.body[field]) {
        missingFields.push(field);
      }
    }

    if (missingFields.length > 0) {
      throw new AppError(
        `Missing required fields: ${missingFields.join(', ')}`,
        400
      );
    }

    next();
  };
};

// Email validation middleware
export const validateEmail = (req: Request, res: Response, next: NextFunction): void => {
  const { email } = req.body;
  
  if (!email) {
    throw new AppError('Email is required', 400);
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new AppError('Invalid email format', 400);
  }

  next();
};

// Request body size validation
export const validateBodySize = (maxSize: number) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const contentLength = req.get('content-length');
    
    if (contentLength && parseInt(contentLength) > maxSize) {
      throw new AppError('Request body too large', 413);
    }

    next();
  };
};