import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { config } from '@/config/app';
import { httpLogger } from '@/config/logger';
import { errorHandler, notFoundHandler } from '@/middleware/errorHandler';
import routes from '@/routes';

const app = express();

// Security middleware
app.use(helmet());

// CORS configuration
app.use(cors({
  origin: config.corsOrigin,
  credentials: true,
}));

// Compression middleware
app.use(compression());

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// HTTP request logging
app.use(httpLogger);

// Routes
app.use('/api/v1', routes);

// Handle 404 errors
app.use(notFoundHandler);

// Global error handler
app.use(errorHandler);

export default app;