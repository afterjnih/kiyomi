import React from 'react';
import fs from 'fs';
import Bookshelf from './../../browser/bookshelf';
import {renderBook} from './../../lib/pdfWrapper'
import {viewerBook} from './../../lib/pdfWrapper'

var bookshelf = new Bookshelf();
//global.window = global;
//global.navigator = {userAgent: 'node'};
//global.PDFJS = {};
//global.DOMParser = require('./vendor/domparsermock.js');
//require('./vendor/pdf.combined.js');
//
//var pdfViewer = new PDFJS.PDFViewer({
//  container: container
//});

var styles = {
  viewer: {
    height: '600px'
  }
}

export class Viewer extends React.Component{
  constructor(){
    super();
  }

  propTypes = {
    book: React.PropTypes.string.isRequired
  }

  render(){
    return(
      <div>
        <div id='controller'>
          <button id='prev' ref='prev'>Previous</button>
          <span>
            Page:
            <span id='pageNum' ref='pageNum'>1</span>
            /
            <span id='pageCount' ref='pageCount'>14</span>
          </span>
          <button id='next' ref='next'>Next</button>
        </div>
        <canvas style={styles.viewer} ref='viewerCanvasRef'/>
      </div>
    );
  }

  componentDidMount(){
    console.log('hey');
    console.log(this.props.book);
    //renderBook(fs.readFileSync(bookshelf.register() + '/content/' + this.props.book), React.findDOMNode(this.refs.viewerCanvasRef));
    viewerBook(fs.readFileSync(bookshelf.register() + '/content/' + this.props.book)
             , React.findDOMNode(this.refs.viewerCanvasRef)
             , React.findDOMNode(this.refs.prev)
             , React.findDOMNode(this.refs.next)
             , React.findDOMNode(this.refs.pageNum)
             , React.findDOMNode(this.refs.pageCount)
              );
  }
}