import('node-fetch')
  .then(fetchModule => {
    const fetch = fetchModule.default;
    const express = require('express');
    const cors = require('cors');

    const app = express();
    const port = 3000;

    // CORS setup to allow requests from sticky-os.vercel.app
    app.use(cors({
      origin: 'https://sticky-os.vercel.app'  // Your main domain
    }));

    app.get('/', async (req, res) => {
      const targetUrl = req.query.url;

      if (!targetUrl) {
        return res.status(400).send('URL parameter is missing');
      }

      try {
        const response = await fetch(targetUrl, {
          method: 'GET',
          headers: {
            // Add headers if necessary, like User-Agent, etc.
          }
        });

        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`);
        }

        const body = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.send(body);
      } catch (error) {
        console.error('Error fetching the URL:', error);
        res.status(500).send('Failed to fetch content');
      }
    });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });

  })
  .catch(err => {
    console.error('Error loading the modules:', err);
  });
