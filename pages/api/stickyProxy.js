const httpProxy = require('http-proxy');
const express = require('express');
const cors = require('cors');

const app = express();
const proxy = httpProxy.createProxyServer({});
const port = 3000;

app.use(cors());

app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;

    if (!targetUrl) {
        return res.status(400).send('URL parameter is required');
    }

    proxy.web(req, res, { target: targetUrl }, (err) => {
        console.error('Proxy error:', err);
        res.status(500).send('Failed to proxy the request');
    });
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
