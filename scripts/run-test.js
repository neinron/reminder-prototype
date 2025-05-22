require('dotenv').config();
const path = require('path');

// Load the .env.local file from the root directory
require('dotenv').config({
  path: path.join(__dirname, '../.env.local')
});

// Now run the test script
require('./test-supabase');
