import React from 'react';
import fs from 'fs';
import Bookshelf from './../../browser/bookshelf';
import {renderBook} from './../../lib/pdfWrapper'
import {viewerBook} from './../../lib/pdfWrapper'
import {OpenViewer} from './../../lib/pdfWrapper'
import {bookSize} from './../../lib/pdfWrapper'
import {ViewerActions} from './../../action/action'
import {viewerStore} from './../../store/viewerStore';
import {getViewerSizeToFitWindow} from './../../lib/util'

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


export class Viewer extends React.Component{
  constructor() {
    super();
    this.viewer = null;
    this.state = {pageNum: 1, pageCount: 100,
                  styles: {
                    content:{
                     'text-align': 'center'
                    },
                    viewer: {
                      height: '600px'
                    }
                  }
                 };
    this.handleChange = this.handleChange.bind(this);
    this.fitPageToWindow = this.fitPageToWindow.bind(this);
  }

  propTypes = {
    book: React.PropTypes.string.isRequired,
    viewerWidth: React.PropTypes.string.isRequired,
    viewerHeight: React.PropTypes.string.isRequired,
    scale: React.PropTypes.number,
    bookWidth: React.PropTypes.number,
    bookHeight: React.PropTypes.number
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

  fitPageToWindow() {
    let viewerWidth = null;
    let viewerHeight = null;
    [viewerWidth, viewerHeight] = getViewerSizeToFitWindow(this.props.bookWidth, this.props.bookHeight, window.innerWidth, window.innerHeight - 20);
    this.setState({
      styles: {
        content:{
          'text-align': 'center',
          height: '100%'
        },
        controller: {},
        viewer: {
          height: viewerHeight,
          width: viewerWidth,
        },
        viewerWrapper:{
          'background-color': '#dcdcdc',
          height: '100%'
        },
      }
    });
  }

  componentWillMount(){
    window.scrollTo(0, 0);
    this.setState({styles: {
                          content:{
                            'text-align': 'center',
                            height: '100%'
                          },
                          controller: {},
                          viewer: {
                            height: this.props.viewerHeight,
                            width: this.props.viewerWidth,
                          },
                          viewerWrapper:{
                            'background-color': '#dcdcdc',
                            height: '100%'
                          },
                        }
    });
  }

  componentWillUpdate(){
  }


  render(){
    return(
      <div style={this.state.styles.content}>
        <div id='controller' style={this.state.styles.controller}>
          <button id='prev' ref='prev' onClick={this.handleClickPrevious.bind(this)}>Previous</button>
          <span>
            Page:
            <span id='pageNum' ref='pageNum'>{this.state.pageNum}</span>
            /
            <span id='pageCount' ref='pageCount'>{this.state.pageCount}</span>
          </span>
          <button id='next' ref='next' onClick={this.handleClickNext.bind(this)}>Next</button>
        </div>
        <div style={this.state.styles.viewerWrapper}>
          <canvas style={this.state.styles.viewer} ref='viewerCanvasRef'/>
        </div>
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
    viewerStore.addChangeListener(this.fitPageToWindow, 'fitPageToWindow');
    require('ipc').on('fitPageToWindow', () => {
      ViewerActions.fitPageToWindow();
    });
  }

  componentDidUpdate(){
    this.viewer.renderPage(this.state.pageNum);
  }

  componentWillUnmount(){
    viewerStore.removeChangeListener(this.handleChange);
    viewerStore.removeChangeListener(this.fitPageToWindow);
  }
}