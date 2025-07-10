import { Response } from 'express';
import { SuccessResponse, ErrorResponse } from '@/types';

// Success response utility
export const sendSuccess = <T>(
  res: Response,
  data: T,
  message: string = 'Success',
  statusCode: number = 200
): void => {
  const response: SuccessResponse<T> = {
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

// Error response utility
export const sendError = (
  res: Response,
  message: string,
  statusCode: number = 500,
  error?: string
): void => {
  const response: ErrorResponse = {
    success: false,
    message,
    error: error || message,
    timestamp: new Date().toISOString(),
  };

  res.status(statusCode).json(response);
};

// Pagination utility
export const sendPaginatedResponse = <T>(
  res: Response,
  data: T[],
  totalCount: number,
  page: number,
  limit: number,
  message: string = 'Success'
): void => {
  const totalPages = Math.ceil(totalCount / limit);
  const hasNext = page < totalPages;
  const hasPrev = page > 1;

  const response = {
    success: true,
    message,
    data,
    pagination: {
      totalCount,
      totalPages,
      currentPage: page,
      limit,
      hasNext,
      hasPrev,
    },
    timestamp: new Date().toISOString(),
  };

  res.status(200).json(response);
};