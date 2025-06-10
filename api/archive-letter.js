const FormData = require("form-data");
const fetch = require("node-fetch");

module.exports = async (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");

  // Handle preflight requests (OPTIONS)
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    // Request body is already parsed by Vercel (as JSON)
    const requestData = req.body;

    // Create form data for the backend API
    const formData = new FormData();

    // Add all the fields from the incoming JSON payload
    Object.keys(requestData).forEach(key => {
      if (key === "file") {
        // Handle file data - decode base64 string back to buffer
        try {
            const fileBuffer = Buffer.from(requestData[key], "base64");
            // Append the buffer with a filename. The backend expects 'file'.
            formData.append("file", fileBuffer, { filename: "letter.docx", contentType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" }); 
        } catch (e) {
            console.error("Error decoding base64 file content:", e);
            // Decide how to handle error: maybe skip file or return error
            // For now, let's skip appending the file if decoding fails
        }
      } else {
        // Append other fields as strings
        formData.append(key, String(requestData[key]));
      }
    });

    console.log("Proxying archive request to backend API");

    // Make the request to the backend API
    const apiResponse = await fetch("http://128.140.37.194:5000/archive-letter", {
      method: "POST",
      body: formData, // Send the FormData object
      // Let node-fetch set the Content-Type header for multipart/form-data
      // headers: formData.getHeaders() // This might be needed depending on node-fetch version
    });

    const responseText = await apiResponse.text();
    console.log("Archive API Response:", responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (parseError) {
      console.warn("Archive API response was not valid JSON:", responseText);
      // If parsing fails, send the raw text back, perhaps wrapped in a standard structure
      if (apiResponse.ok) {
          responseData = { message: responseText };
      } else {
          responseData = { error: "API Error", message: responseText };
      }
    }

    // Set response content type
    res.setHeader("Content-Type", "application/json");

    // Send the response
    res.status(apiResponse.status).json(responseData);

  } catch (error) {
    console.error("Error in archive-letter function:", error);
    
    // Ensure CORS headers are set even for errors
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");
    res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
    
    res.status(500).json({ 
      error: "Internal server error",
      message: error.message 
    });
  }
};
