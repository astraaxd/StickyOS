class IFramePlus {
    constructor(containerId, proxyUrl) {
        this.container = document.getElementById(containerId);
        if (!this.container) {
            throw new Error("Container not found.");
        }
        this.proxyUrl = proxyUrl;
    }

    async loadUrl(url) {
        try {
            const response = await fetch(`https://sticky-os.vercel.app/stickyProxy.js?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch URL: ${response.statusText}`);
            }
            const data = await response.text();
            this.renderHtml(data);
        } catch (error) {
            console.error('Error loading URL:', error);
        }
    }

    renderHtml(html) {
        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.sandbox = "allow-scripts allow-same-origin";
        const blob = new Blob([html], { type: "text/html" });
        const blobUrl = URL.createObjectURL(blob);
        iframe.src = blobUrl;
        this.container.innerHTML = "";
        this.container.appendChild(iframe);
    }
}