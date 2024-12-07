import fetch from 'node-fetch';
import cors from 'cors';

const handler = async (req, res) => {
  cors()(req, res, async () => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
      console.error('No URL provided');
      return res.status(400).send('URL parameter is missing');
    }

    try {
      const response = await fetch(targetUrl);
      if (!response.ok) {
        throw new Error(`Failed to fetch the URL: ${response.statusText}`);
      }

      const body = await response.text();
      res.setHeader('Content-Type', 'text/html');
      res.send(body);
    } catch (error) {
      console.error('Error fetching the URL:', error);
      res.status(500).send(`Internal server error: ${error.message}`);
    }
  });
};
export default handler;
