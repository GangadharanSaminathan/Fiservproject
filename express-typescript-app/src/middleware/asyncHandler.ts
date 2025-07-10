import { Request, Response, NextFunction } from 'express';
import { AsyncRouteHandler } from '@/types';

// Wrapper for async route handlers to catch errors
export const asyncHandler = (fn: AsyncRouteHandler) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res)).catch(next);
  };
};