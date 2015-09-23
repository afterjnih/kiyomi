import React from 'react'
//global.window = global;
//global.navigator = {userAgent: 'node'};
//global.PDFJS = {};
//global.DOMParser = require('./vendor/domparsermock.js');
//require('./vendor/pdf.combined.js');
//
//var pdfViewer = new PDFJS.PDFViewer({
//  container: container
//});

export class Viewer extends React.Component{
  constructor(){
    super();
  }

  render(){
    return(
      <div>viewer</div>
    );
  }
}