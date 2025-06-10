const fetch = require('node-fetch');

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

  // Handle preflight requests (OPTIONS)
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Request body is already parsed by Vercel (usually)
    const requestData = req.body; 
    
    console.log('Proxying request to API:', requestData);

    // Make the request to the backend API
    const apiResponse = await fetch('http://128.140.37.194:5000/generate-letter', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    const responseText = await apiResponse.text();
    console.log('API Response:', responseText);

    // Try to parse as JSON, fallback to text
    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.warn('API response was not valid JSON:', responseText);
      if (apiResponse.ok) {
         responseData = { content: responseText }; // Send as content field
      } else {
         responseData = { error: 'API Error', message: responseText };
      }
    }
    
    // Set response content type
    res.setHeader('Content-Type', 'application/json');

    // Send the response
    res.status(apiResponse.status).json(responseData);

  } catch (error) {
    console.error('Error in generate-letter function:', error);
    
    // Ensure CORS headers are set even for errors
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    
    res.status(500).json({ 
      error: 'Internal server error',
      message: error.message 
    });
  }
};
