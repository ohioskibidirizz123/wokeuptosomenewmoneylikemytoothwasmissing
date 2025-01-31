const axios = require("axios");

exports.handler = async function(event, context) {
  const query = event.queryStringParameters.q; // Get search query from query params
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Missing query parameter" }),
    };
  }

  const googleUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;
  
  try {
    const response = await axios.get(googleUrl);
    return {
      statusCode: 200,
      body: response.data, // Return Google search results HTML (simplified)
      headers: {
        "Content-Type": "text/html",
      },
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to fetch data from Google" }),
    };
  }
};
