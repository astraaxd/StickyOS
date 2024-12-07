export default async function handler(req, res) {
    const { url, jsCode } = req.query;

    try {
        const response = await fetch(`https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(url)}`); // dont ask, i use codetabs because its better :D
        const content = await response.text();
        if (jsCode) {
            content += `<script>${jsCode}</script>`;
        }

        res.status(200).send(content);
    } catch (error) {
        res.status(500).json({ error: 'Failed to lord the rigs!!!!!!' });
    }
}
