import httpProxy from 'http-proxy';

const proxy = httpProxy.createProxyServer();

export default function handler(req, res) {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        res.status(400).json({ error: 'URL parameter is required' });
        return;
    }

    proxy.web(req, res, { target: targetUrl, changeOrigin: true }, (err) => {
        console.error('Proxy error:', err);
        res.status(500).json({ error: 'Failed to proxy the request' });
    });
}

export const config = {
    api: {
        bodyParser: false,
    },
};