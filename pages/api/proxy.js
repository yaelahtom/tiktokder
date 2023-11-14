// pages/api/proxy.js
import axios from 'axios';

export default async function handler(req, res) {
  const { url } = req.query;

  try {
    const response = await axios.get(`https://api.tik.fail/api/grab`, {
      params: { url },
      headers: {
        'User-Agent': 'MyTikTokBot', // Set any headers required by the external API
      },
    });
    // Pass through the response from the external API
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error('Error in proxy API:', error);
    if (error.response) {
      // Forward the error response from the external API
      res.status(error.response.status).json(error.response.data);
    } else {
      // Handle no response scenario
      res.status(500).json({ message: 'The proxy encountered an unknown error' });
    }
  }
}
