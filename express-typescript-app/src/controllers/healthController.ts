import { Request, Response } from 'express';
import { config } from '@/config/app';
import { HealthCheckResponse } from '@/types';
import { sendSuccess } from '@/utils/response';
import { logger } from '@/config/logger';

export const healthCheck = async (req: Request, res: Response): Promise<void> => {
  try {
    const healthData: HealthCheckResponse = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: config.nodeEnv,
    };

    logger.info('Health check requested', { ip: req.ip });
    sendSuccess(res, healthData, 'Service is healthy');
  } catch (error) {
    logger.error('Health check failed', { error });
    
    const unhealthyData: HealthCheckResponse = {
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      version: process.env.npm_package_version || '1.0.0',
      environment: config.nodeEnv,
    };

    res.status(503).json({
      success: false,
      message: 'Service is unhealthy',
      data: unhealthyData,
      timestamp: new Date().toISOString(),
    });
  }
};