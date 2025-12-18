// __tests__/api/health.test.ts
/**
 * Health Endpoint Tests
 */

import { GET } from '@/app/api/health/route';

describe('Health Check API', () => {
  it('should return healthy status', async () => {
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('healthy');
    expect(data).toHaveProperty('timestamp');
    expect(data).toHaveProperty('uptime');
    expect(data).toHaveProperty('checks');
  });

  it('should include memory metrics', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.checks.memory).toHaveProperty('used');
    expect(data.checks.memory).toHaveProperty('total');
    expect(data.checks.memory).toHaveProperty('percentage');
    expect(typeof data.checks.memory.percentage).toBe('number');
  });

  it('should check API configuration', async () => {
    const response = await GET();
    const data = await response.json();

    expect(data.checks).toHaveProperty('api');
    expect(typeof data.checks.api).toBe('boolean');
  });
});
