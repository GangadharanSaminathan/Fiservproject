import { Request, Response } from 'express';

// Extend Express Request interface
export interface CustomRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: string;
  };
}

// Standard API response interface
export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data?: T;
  error?: string;
  timestamp: string;
}

// Error response interface
export interface ErrorResponse {
  success: false;
  message: string;
  error: string;
  timestamp: string;
  stack?: string;
}

// Success response interface
export interface SuccessResponse<T = unknown> {
  success: true;
  message: string;
  data: T;
  timestamp: string;
}

// Async route handler type
export type AsyncRouteHandler = (
  req: CustomRequest,
  res: Response
) => Promise<void>;

// Health check response
export interface HealthCheckResponse {
  status: 'healthy' | 'unhealthy';
  timestamp: string;
  uptime: number;
  version: string;
  environment: string;
}

// User interface (example)
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'admin' | 'user';
  createdAt: Date;
  updatedAt: Date;
}