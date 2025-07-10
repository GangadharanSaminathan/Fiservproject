import request from 'supertest';
import app from '../app';

describe('Health Check', () => {
  it('should return healthy status', async () => {
    const response = await request(app)
      .get('/api/v1/health')
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      message: 'Service is healthy',
      data: {
        status: 'healthy',
        environment: expect.any(String),
        uptime: expect.any(Number),
        version: expect.any(String),
      },
    });
  });

  it('should return API info on root route', async () => {
    const response = await request(app)
      .get('/api/v1/')
      .expect(200);

    expect(response.body).toMatchObject({
      success: true,
      message: 'API is running!',
      timestamp: expect.any(String),
      version: '1.0.0',
    });
  });
});