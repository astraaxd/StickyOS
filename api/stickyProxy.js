import fetch from 'node-fetch';
const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/api/stickyProxy.js', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('URL parameter is required');
    }
    try {
        const response = await fetch(targetUrl);
        const body = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.send(body);
    } catch (error) {
        res.status(500).send('Failed to fetch the URL');
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
