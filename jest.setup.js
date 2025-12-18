// jest.setup.js
/**
 * Jest Setup File
 * Runs before each test suite
 */

import '@testing-library/jest-dom';

// Mock environment variables
process.env.GEMINI_API_KEY = 'test_api_key';
process.env.NODE_ENV = 'test';
