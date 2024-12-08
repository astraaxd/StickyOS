class StickyFrame {
            constructor(containerId, proxyUrl) {
                this.container = document.getElementById(containerId);
                if (!this.container) {
                    throw new Error("Container not found.");
                }
                this.proxyUrl = proxyUrl;
            }

            async loadContent(url) {
                try {
                    const response = await fetch(`${this.proxyUrl}?url=${encodeURIComponent(url)}`);
                    if (!response.ok) {
                        throw new Error(`Failed to fetch URL: ${response.statusText}`);
                    }

                    const html = await response.text();
                    this.renderHtml(html);
                } catch (error) {
                    console.error("Error loading content:", error);
                    this.container.innerHTML = `<p style="color: red;">Failed to load content.</p>`;
                }
            }

            renderHtml(html) {
                this.container.innerHTML = '';
                this.container.innerHTML = html;
            }
}