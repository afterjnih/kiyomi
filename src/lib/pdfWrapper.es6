global.window = global;
global.navigator = {userAgent: 'node'};
global.PDFJS = {};
global.DOMParser = require('./vendor/domparsermock.js');

export class OpenViewer{
  constructor(path, domTarget, pageNumDom, pageCountDom, pageNum)
  {
    this.pdfDoc = null;
    this.canvas = domTarget;
    this.ctx = this.canvas.getContext('2d');
    this.scale = 1.5;
    this.pageRendering = false;
    this.pageNumPending = null;
    this.pageNumDom = pageNumDom;
    this.pageCountDom = pageCountDom;
    this.data = new Uint8Array(path);
    PDFJS.getDocument(this.data).then((pdfDoc_) => {
      this.pdfDoc = pdfDoc_;
      this.pageCountDom.textContent = this.pdfDoc.numPages;
      this.renderPage(pageNum);
    });
  }

   renderPage(pageNum){
      this.pageRendering = true;
      this.pdfDoc.getPage(pageNum).then((page) => {
        let viewport = page.getViewport(this.scale);
        this.canvas.height = viewport.height;
        this.canvas.width = viewport.width;

        var renderContext = {
          canvasContext: this.ctx,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);

        renderTask.promise.then(() => {
          this.pageRendering = false;
          if(this.pageNumPending != null){
            _renderPage(this.pageNumPending);
            this.pageNumPending = null;
          }
        });
      });
      this.pageNumDom.textContent = pageNum;
  }

  queueRenderPage(pageNum){
    if(this.pageRendering){
      this.pageNumPending = pageNum;
    }else{
      _renderPage(pageNum);
    }
  }
}

export function bookSize(path, pageNum){
  require('./vendor/pdf.combined.js');
  var viewport = null;
  var data = new Uint8Array(path);

  return PDFJS.getDocument(data).then((pdf) => {
    return pdf.getPage(1)
  }).then((page) => {
        var scale = 1.0;
        viewport = page.getViewport(scale);
        console.log(viewport);
        return ({width: viewport.width, height: viewport.height});
  });
}

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
      console.log(page);
      //console.log(page.__proto__.getViewport(1.0, 0));
      var scale = 1.0;
      var viewport = page.getViewport(scale);
      //console.log(viewport);

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
