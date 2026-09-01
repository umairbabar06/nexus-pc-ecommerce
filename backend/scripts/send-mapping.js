const axios = require('axios');
const mapping = require('./cloudinary-mapping.json');

async function doUpdate() {
  console.log(`Sending ${Object.keys(mapping).length} items to Render API...`);
  try {
    const res = await axios.post('https://nexus-backend-yznx.onrender.com/api/products/batch-update-images', mapping);
    console.log('Response:', res.data);
  } catch (err) {
    console.error('Error:', err.response ? err.response.data : err.message);
  }
}

doUpdate();
