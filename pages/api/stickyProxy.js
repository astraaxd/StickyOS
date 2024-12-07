import fetch from 'node-fetch';

export default async function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const response = await fetch(targetUrl);

        if (!response.ok) {
            throw new Error('Failed to fetch the content');
        }
        const contentType = response.headers.get('Content-Type');
        if (!contentType.includes('text/html')) {
            return res.status(400).json({ error: 'The requested URL is not an HTML page' });
        }
        const body = await response.text();
        res.setHeader('Content-Type', 'text/html');
        res.send(body);
    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}
