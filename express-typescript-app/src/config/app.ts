import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

interface AppConfig {
  port: number;
  nodeEnv: string;
  corsOrigin: string;
  logLevel: string;
  isDevelopment: boolean;
  isProduction: boolean;
  isTest: boolean;
}

const getEnvVar = (key: string, defaultValue?: string): string => {
  const value = process.env[key];
  if (!value && !defaultValue) {
    throw new Error(`Environment variable ${key} is required`);
  }
  return value || defaultValue!;
};

const getEnvVarAsNumber = (key: string, defaultValue: number): number => {
  const value = process.env[key];
  if (!value) return defaultValue;
  
  const parsed = parseInt(value, 10);
  if (isNaN(parsed)) {
    throw new Error(`Environment variable ${key} must be a number`);
  }
  return parsed;
};

export const config: AppConfig = {
  port: getEnvVarAsNumber('PORT', 3000),
  nodeEnv: getEnvVar('NODE_ENV', 'development'),
  corsOrigin: getEnvVar('CORS_ORIGIN', 'http://localhost:3000'),
  logLevel: getEnvVar('LOG_LEVEL', 'info'),
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
};