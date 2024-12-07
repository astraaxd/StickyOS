import fetch from 'node-fetch';

export default async function handler(req, res) {
    const targetUrl = req.query.url;
    console.log(`Received URL: ${targetUrl}`);

    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter is required' });
    }

    try {
        const response = await fetch(targetUrl);
        console.log(`Response status from target URL: ${response.status}`);

        if (!response.ok) {
            throw new Error('Failed to fetch the content');
        }
        const body = await response.text();
        const modifiedHtml = modifyUrls(body, targetUrl);
        res.setHeader('Content-Type', 'text/html');
        res.send(modifiedHtml);

    } catch (error) {
        console.error('Error fetching URL:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}

function modifyUrls(html, baseUrl) {
    html = html.replace(/(href=")(\/[^"]*)(")/g, (match, p1, p2, p3) => {
        return `${p1}${baseUrl}${p2}${p3}`;
    });
    html = html.replace(/(src=")(\/[^"]*)(")/g, (match, p1, p2, p3) => {
        return `${p1}${baseUrl}${p2}${p3}`;
    });
    html = html.replace(/(src=")(\/[^"]*)(")/g, (match, p1, p2, p3) => {
        return `${p1}${baseUrl}${p2}${p3}`;
    });
    return html;
}
