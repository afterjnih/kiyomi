global.window = global;
global.navigator = {userAgent: 'node'};
global.PDFJS = {};
global.DOMParser = require('./vendor/domparsermock.js');

export function renderBook(path, domTarget){
  require('./vendor/pdf.combined.js');
  var data = new Uint8Array(path);
  console.log(PDFJS.getDocument);
  PDFJS.getDocument(data).then(doc => {
    console.log(doc.numPages);
  });

  PDFJS.getDocument(data).then(pdf => {
    console.log(pdf);
    pdf.getPage(1).then(page => {
      var scale = 1.5;
      var viewport = page.getViewport(scale);

      var canvas = domTarget;
      console.log(canvas);
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
