import { Request, Response, NextFunction } from 'express';
import { logger } from '@/config/logger';
import { config } from '@/config/app';
import { ErrorResponse } from '@/types';

export class AppError extends Error {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export const errorHandler = (
  err: Error | AppError,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  let error = { ...err } as AppError;
  error.message = err.message;

  // Log error
  logger.error({
    err: error,
    req: {
      method: req.method,
      url: req.url,
      headers: req.headers,
      body: req.body,
    },
  }, 'Error occurred');

  // Default error values
  let statusCode = 500;
  let message = 'Internal Server Error';

  // Handle specific error types
  if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
  } else if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation Error';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Resource not found';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  }

  const errorResponse: ErrorResponse = {
    success: false,
    message,
    error: error.message,
    timestamp: new Date().toISOString(),
  };

  // Include stack trace in development
  if (config.isDevelopment) {
    errorResponse.stack = error.stack;
  }

  res.status(statusCode).json(errorResponse);
};

export const notFoundHandler = (
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  const error = new AppError(`Route ${req.originalUrl} not found`, 404);
  
  logger.warn({
    method: req.method,
    url: req.originalUrl,
    ip: req.ip,
  }, 'Route not found');

  const errorResponse: ErrorResponse = {
    success: false,
    message: 'Route not found',
    error: error.message,
    timestamp: new Date().toISOString(),
  };

  res.status(404).json(errorResponse);
};