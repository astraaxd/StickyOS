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
            const response = await fetch(`${this.proxyUrl}?url=${encodeURIComponent(url)}`);
            if (!response.ok) {
                throw new Error(`Failed to fetch URL: ${response.statusText}`);
            }

            const html = await response.text();
            this.renderHtml(html);
        } catch (error) {
            console.error("Error loading URL:", error);
            this.container.innerHTML = `<p style="color: red;">Failed to load content.</p>`;
        }
    }

    renderHtml(html) {
        const iframe = document.createElement("iframe");
        iframe.style.width = "100%";
        iframe.style.height = "100%";
        iframe.style.border = "none";
        iframe.sandbox = "allow-scripts allow-same-origin";

        const blob = new Blob([html], { type: "text/html" });
        const url = URL.createObjectURL(blob);

        iframe.src = url;
        this.container.innerHTML = "";
        this.container.appendChild(iframe);
    }
}

const proxyUrl = !window.location.hostname.includes("file")
    ? "/proxy"
    : "http://localhost:3000/proxy";