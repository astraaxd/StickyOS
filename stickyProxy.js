import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

app.use(cors());

// Proxy endpoint to fetch and return HTML content
app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
            throw new Error('Failed to fetch the content');
        }

        const body = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.send(body);
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Sticky Proxy server is running at http://localhost:${port}`);
});
