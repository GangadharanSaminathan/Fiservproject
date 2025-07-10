import app from './app';
import { config } from '@/config/app';
import { logger } from '@/config/logger';

// Handle uncaught exceptions
process.on('uncaughtException', (err: Error) => {
  logger.fatal('Uncaught Exception:', err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason: unknown, promise: Promise<unknown>) => {
  logger.fatal('Unhandled Rejection at:', promise, 'reason:', reason);
  process.exit(1);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`${signal} received, shutting down gracefully`);
  
  server.close(() => {
    logger.info('Process terminated');
    process.exit(0);
  });
  
  // Force close server after 10 seconds
  setTimeout(() => {
    logger.error('Could not close connections in time, forcefully shutting down');
    process.exit(1);
  }, 10000);
};

// Listen for termination signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Start the server
const server = app.listen(config.port, () => {
  logger.info({
    port: config.port,
    environment: config.nodeEnv,
    nodeVersion: process.version,
    pid: process.pid,
  }, 'Server started successfully');
});

// Handle server errors
server.on('error', (error: Error) => {
  logger.error('Server error:', error);
  process.exit(1);
});

export default server;