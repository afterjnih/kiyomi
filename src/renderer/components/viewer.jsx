import React from 'react';
import fs from 'fs';
import Bookshelf from './../../browser/bookshelf';
import {renderBook} from './../../lib/pdfWrapper'
import {viewerBook} from './../../lib/pdfWrapper'
import {OpenViewer} from './../../lib/pdfWrapper'
import {ViewerActions} from './../../action/action'
import {viewerStore} from './../../store/viewerStore';

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
    this.viewer = null;
    this.state = {pageNum: 1, pageCount:100};
    this.handleChange = this.handleChange.bind(this);
  }

  propTypes = {
    book: React.PropTypes.string.isRequired
  }

  handleClickPrevious(e){
    ViewerActions.movePreviousPage();
  }

  handleClickNext(e){
    ViewerActions.moveNextPage();
  }

  handleChange(){
    viewerStore.getPageNum((pageNum) => {
      this.setState({
        pageNum: pageNum
      });
    });
  }

  render(){
    return(
      <div>
        <div id='controller'>
          <button id='prev' ref='prev' onClick={this.handleClickPrevious.bind(this)}>Previous</button>
          <span>
            Page:
            <span id='pageNum' ref='pageNum'>{this.state.pageNum}</span>
            /
            <span id='pageCount' ref='pageCount'>{this.state.pageCount}</span>
          </span>
          <button id='next' ref='next' onClick={this.handleClickNext.bind(this)}>Next</button>
        </div>
        <canvas style={styles.viewer} ref='viewerCanvasRef'/>
      </div>
    );
  }

  componentDidMount(){
    this.viewer = new OpenViewer(
                             fs.readFileSync(bookshelf.register() + '/content/' + this.props.book)
                           , React.findDOMNode(this.refs.viewerCanvasRef)
                           , React.findDOMNode(this.refs.pageNum)
                           , React.findDOMNode(this.refs.pageCount)
                           , this.state.pageNum
                            );
    viewerStore.addChangeListener(this.handleChange);
  }

  componentDidUpdate(){
    this.viewer.renderPage(this.state.pageNum);
  }

  componentWillUnmount(){
    viewerStore.removeChangeListener(this.handleChange);
  }
}