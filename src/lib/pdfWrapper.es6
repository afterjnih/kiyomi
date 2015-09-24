global.window = global;
global.navigator = {userAgent: 'node'};
global.PDFJS = {};
global.DOMParser = require('./vendor/domparsermock.js');

export function viewerBook(path, domTarget, prevDom, nextDom, pageNumDom, pageCountDom){
  var pdfDoc = null,
      pageNum = 1,
      pageRendering = false,
      pageNumPending = null,
      scale = 0.8,
      canvas = domTarget,
      ctx = canvas.getContext('2d');

  function renderPage(num){
    pageRendering = true;
    pdfDoc.getPage(num).then((page) => {
      var viewport = page.getViewport(scale);
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      var renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };

      var renderTask = page.render(renderContext);

      renderTask.promise.then(() => {
        pageRendering = false;
        if(pageNumPending != null){
          renderPage(pageNumPending);
          pageNumPending = null;
        }
      });
    });
    pageNumDom.textContent = pageNum;
  }

  function queueRenderPage(num){
    if(pageRendering){
      pageNumPending = num;
    }else{
      renderPage(num);
    }
  }

  function onPrevPage(){
    if(pageNum <= 1){
      return;
    }
    pageNum--;
    queueRenderPage(pageNum);
  }
  prevDom.addEventListener('click', onPrevPage);

  function onNextPage(){
    if(pageNum >= pdfDoc.numPages){
      return;
    }
    pageNum++;
    queueRenderPage(pageNum);
  }
  nextDom.addEventListener('click', onNextPage);

  var data = new Uint8Array(path);
  PDFJS.getDocument(data).then((pdfDoc_) => {
    pdfDoc = pdfDoc_;
    pageCountDom.textContent = pdfDoc.numPages;
    renderPage(pageNum);
  });
}

export function renderBook(path, domTarget){
  require('./vendor/pdf.combined.js');
  var data = new Uint8Array(path);
  PDFJS.getDocument(data).then(doc => {
    console.log(doc.numPages);
  });

  PDFJS.getDocument(data).then(pdf => {
    pdf.getPage(1).then(page => {
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      var canvas = domTarget;
      var context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      var renderContext = {
        canvasContext: context,
        viewport: viewport
      };
      page.render(renderContext);
    });
  });
}
