class PDFViewer extends HTMLElement {
    async connectedCallback() {
      this.attachShadow({ mode: 'open' });
      this.shadowRoot.innerHTML = this.template;
      pdfjsLib.GlobalWorkerOptions.workerSrc = ' /stage/protyle/js/pdf/pdf.worker.js';
      const response = await fetch(this.getAttribute('src'));
      const pdfData = await response.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({data: pdfData}).promise;    
      const page = await pdf.getPage(1);
      const canvas = this.shadowRoot.querySelector('canvas');
      const context = canvas.getContext('2d');
      let scale = Math.min(
        canvas.width / page.getViewport({ scale: 1 }).width,
        canvas.height / page.getViewport({ scale: 1 }).height
      );
      const viewport = page.getViewport({ scale });
            page.render({ canvasContext: context, viewport });
    }
    get template() {
      return `
        <style>
          :host {
            display: block;
            width: calc(100% - 10px);
            max-width: 100%;

          }
          canvas {
            max-width: 100%;
            width: 100%;
            height: auto;
          }
        </style>
        <canvas></canvas>
      `;
    }
    }
    let processedImgs = new Set();

    function insertPdfViewer() {
      // 获取所有的 protyle-action protyle-icons 元素
      const protyleIcons = document.querySelectorAll('.protyle-action.protyle-icons');
    
      protyleIcons.forEach(icon => {
        // 获取 icon 元素后面的 img 元素
        const img = icon.nextElementSibling;
    
        // 检查 img 元素是否存在，以及它的 src 是否以 .pdf 结尾
        if (img && img.tagName.toLowerCase() === 'img' && img.src.toLowerCase().endsWith('.pdf')) {
          // 检查这个 img 元素是否已经被处理过
          if (!processedImgs.has(img)) {
            // 如果没有被处理过，就处理它，并将它添加到已处理集合中
            processedImgs.add(img);
    
    
            // 创建 pdf-viewer 元素
            const pdfViewer = document.createElement('pdf-viewer');
            // 设置 pdf-viewer 的 src 属性为 img 的 src
            img.src.startsWith('assets/')?pdfViewer.setAttribute('src', '/'+img.src):pdfViewer.setAttribute('src', img.src)
            
            // 将 pdf-viewer 插入到 img 元素后面
            img.parentNode.insertBefore(pdfViewer, img.nextSibling);
          }
        }
      });
    }
    
    // 使用 setInterval 来每 500 毫秒运行一次 insertPdfViewer
  setInterval(insertPdfViewer, 500);
  customElements.define('pdf-viewer', PDFViewer);
  plugin.eventBus.on('protyle-loaded-static',setTimeout(insertPdfViewer,500))
