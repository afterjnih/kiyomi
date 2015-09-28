import React from 'react';
import {Router, Route, Link} from 'react-router'
import fs from 'fs';
import Bookshelf from './../../browser/bookshelf';
import {renderBook} from './../../lib/pdfWrapper'
import {viewerBook} from './../../lib/pdfWrapper'
import {OpenViewer} from './../../lib/pdfWrapper'
import {bookSize} from './../../lib/pdfWrapper'
import {ViewerActions} from './../../action/action'
import {viewerStore} from './../../store/viewerStore';
import {getViewerSizeToFitWindow} from './../../lib/util'
import {bookshelfStore} from './../../store/BookshelfStore';
import {BooksCanvas} from './../../renderer/components/books';

var bookshelf = new Bookshelf();
global.window = global;
global.navigator = {userAgent: 'node'};
global.PDFJS = {};
global.DOMParser = require('./../../lib/vendor/domparsermock.js');
require('./../../lib/vendor/pdf.combined.js');

//var pdfViewer = new PDFJS.PDFViewer({
//  container: container
//});



export class Viewer extends React.Component{
  constructor() {
    super();
    this.viewer = null;
    this.state = {purpose: 'view', pageNum: 1, pageCount: 100,
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

  handleChange(tmp){
    switch(tmp){
      case 'movePage':
        viewerStore.getPageNum((pageNum) => {
          this.setState({
            pageNum: pageNum
          });
        });
        break;
      }
    }


  fitPageToWindow() {
    bookSize(fs.readFileSync(bookshelf.register() + '/content/' + this.props.params.book), this.state.pageNum)
      .then((size) => {
        let viewerWidth = null;
        let viewerHeight = null;
        [viewerWidth, viewerHeight] = getViewerSizeToFitWindow(
                                          size.width
                                        , size.height
                                        , window.innerWidth
                                        , window.innerHeight);
        this.setState({
          styles: {
            content: {
              'text-align': 'center',
              height: '100%'
            },
            controller: {},
            viewer: {
              height: viewerHeight + 'px',
              width: viewerWidth + 'px',
              bookWidth: this.state.styles.viewer.bookWidth,
              bookHeight: this.state.styles.viewer.bookHeight
            },
            viewerWrapper: {
              'background-color': '#dcdcdc',
              height: '100%'
            }
          }
        });
      });
  }


  componentWillMount(){
    window.scrollTo(0, 0);
    this.fitPageToWindow();
  }

  render(){
      return (
        <div style={this.state.styles.content}>
          <div id='controller' style={this.state.styles.controller}>
            <Link to='/'>
              <button id='library'>library</button>
            </Link>
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
    bookSize(fs.readFileSync(bookshelf.register() + '/content/' + this.props.params.book), this.state.pageNum)
      .then((size) => {
        let viewerWidth = null;
        let viewerHeight = null;
        [viewerWidth, viewerHeight] = getViewerSizeToFitWindow(size.width, size.height, window.innerWidth, window.innerHeight)
        this.setState({
          styles: {
            content:{
              'text-align': 'center',
              height: '100%'
            },
            controller: {},
            viewer: {
              height: viewerHeight + 'px',
              width: viewerWidth + 'px',
              bookWidth: size.width,
              bookHeight: size.height
            },
            viewerWrapper:{
              'background-color': '#dcdcdc',
              height: '100%'
            }
          }
        });
        this.viewer = new OpenViewer(
          fs.readFileSync(bookshelf.register() + '/content/' + this.props.params.book)
          , React.findDOMNode(this.refs.viewerCanvasRef)
          , React.findDOMNode(this.refs.pageNum)
          , React.findDOMNode(this.refs.pageCount)
          , this.state.pageNum
        );
        viewerStore.addChangeListener(this.handleChange);
        viewerStore.addChangeListenerEM(this.fitPageToWindow);
        require('ipc').on('showTheLibrary', () => {
          ViewerActions.showTheLibrary();
        });
      });
  }

  componentWillUpdate(){
  }

  componentDidUpdate(){
    if(this.viewer !== null) {
      this.viewer.renderPage(this.state.pageNum);
    }
  }

  componentWillUnmount(){
    viewerStore.removeChangeListener(this.handleChange);
    viewerStore.removeChangeListenerEM(this.fitPageToWindow);
  }
}