# Express.js TypeScript Application with Pino Logger

A production-ready Express.js application built with TypeScript, featuring structured logging with Pino, comprehensive error handling, and a well-organized folder structure.

## Features

- **TypeScript**: Full TypeScript support with strict type checking
- **Pino Logger**: High-performance JSON logging with pretty printing in development
- **Express.js**: Fast, unopinionated web framework
- **Error Handling**: Comprehensive error handling with custom error classes
- **Validation**: Input validation middleware
- **Security**: Helmet, CORS, and compression middleware
- **Testing**: Jest testing framework with Supertest
- **Code Quality**: ESLint and Prettier configuration
- **Environment Configuration**: Dotenv for environment variables

## Project Structure

```
src/
├── config/
│   ├── app.ts              # Application configuration
│   └── logger.ts           # Pino logger configuration
├── controllers/
│   ├── healthController.ts # Health check endpoint
│   └── userController.ts   # User CRUD operations
├── middleware/
│   ├── asyncHandler.ts     # Async route handler wrapper
│   ├── errorHandler.ts     # Global error handling
│   └── validation.ts       # Input validation middleware
├── routes/
│   ├── healthRoutes.ts     # Health check routes
│   ├── userRoutes.ts       # User routes
│   └── index.ts            # Route aggregator
├── services/
│   └── userService.ts      # Business logic layer
├── types/
│   └── index.ts            # TypeScript type definitions
├── utils/
│   └── response.ts         # Response utility functions
├── __tests__/
│   └── health.test.ts      # Test examples
├── app.ts                  # Express app configuration
└── index.ts                # Application entry point
```

## Installation

1. Clone the repository or copy the files
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.example .env
   ```

4. Update the `.env` file with your configuration

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build the application for production
- `npm start` - Start the production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run clean` - Clean build directory

## Environment Variables

```bash
# Server Configuration
PORT=3000
NODE_ENV=development

# CORS Configuration
CORS_ORIGIN=http://localhost:3000

# Logging Configuration
LOG_LEVEL=info
```

## API Endpoints

### Health Check
- `GET /api/v1/health` - Health check endpoint

### Users (Example CRUD)
- `GET /api/v1/users` - Get all users
- `GET /api/v1/users/:id` - Get user by ID
- `POST /api/v1/users` - Create new user
- `PUT /api/v1/users/:id` - Update user
- `DELETE /api/v1/users/:id` - Delete user

## Logger Usage

The application uses Pino for structured logging:

```typescript
import { logger } from '@/config/logger';

// Basic logging
logger.info('User created', { userId: '123' });
logger.error('Database connection failed', { error: err });

// Child logger with context
const userLogger = logger.child({ userId: '123' });
userLogger.info('User action performed');
```

## Error Handling

Custom error handling with the `AppError` class:

```typescript
import { AppError } from '@/middleware/errorHandler';

// Throw custom errors
throw new AppError('User not found', 404);
throw new AppError('Invalid input', 400);
```

## Testing

Run the test suite:

```bash
npm test
```

Example test structure:

```typescript
import request from 'supertest';
import app from '../app';

describe('API Endpoint', () => {
  it('should return success response', async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect(200);

    expect(response.body.success).toBe(true);
  });
});
```

## Production Deployment

1. Build the application:
   ```bash
   npm run build
   ```

2. Set environment variables for production:
   ```bash
   NODE_ENV=production
   PORT=3000
   LOG_LEVEL=warn
   ```

3. Start the server:
   ```bash
   npm start
   ```

## Key Features Explained

### Structured Logging
- JSON logging in production
- Pretty printing in development
- Request/response logging with correlation IDs
- Configurable log levels

### Error Handling
- Global error handler
- Custom error classes
- Proper HTTP status codes
- Development vs production error responses

### Type Safety
- Strict TypeScript configuration
- Custom types for requests/responses
- Path mapping for clean imports

### Security
- Helmet for security headers
- CORS configuration
- Request body size limits
- Input validation

### Performance
- Compression middleware
- Async error handling
- Efficient logging

## Contributing

1. Follow the existing code structure
2. Add tests for new features
3. Update documentation
4. Run linting before commits

## License

MIT License