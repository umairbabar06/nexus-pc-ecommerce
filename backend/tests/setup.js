// Test setup — loads env vars and provides helpers
const dotenv = require('dotenv');
dotenv.config();

// Increase timeout for API tests
jest.setTimeout(15000);
