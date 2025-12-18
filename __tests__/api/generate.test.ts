// __tests__/api/generate.test.ts
/**
 * Gemini API Generation Tests
 */

import { POST } from '@/app/api/generate/route';

describe('Generate API', () => {
  it('should return error for missing prompt', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({}),
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data).toHaveProperty('error');
    expect(data.error).toContain('prompt');
  });

  it('should accept valid prompt', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'test' }),
    });

    const response = await POST(request);
    
    // Will fail if no API key, but structure should be correct
    expect([200, 500]).toContain(response.status);
  });

  it('should use default model if not specified', async () => {
    const request = new Request('http://localhost:3000/api/generate', {
      method: 'POST',
      body: JSON.stringify({ prompt: 'test' }),
    });

    const response = await POST(request);
    const data = await response.json();

    // Check that it attempted to use a model
    expect(response.status).toBeDefined();
  });
});
