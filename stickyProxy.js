import('node-fetch')
  .then(fetchModule => {
    const fetch = fetchModule.default;
    const express = require('express');
    const cors = require('cors');

    const app = express();
    const port = 3000;

    app.use(cors());

    app.get('/', async (req, res) => {
      const targetUrl = req.query.url;

      if (!targetUrl) {
        return res.status(400).send('tf trhe url is naadjoawa');
      }

      try {
        const response = await fetch(targetUrl);
        const body = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.send(body);
      } catch (error) {
        res.status(500).send('fail;ed to fectch man!!!!!!!!!!!!');
      }
    });

    app.listen(port, () => {
      console.log(`selver on http://localhost:${port}`);
    });

  })
  .catch(err => {
    console.error('Error lording te rings:', err);
  });
