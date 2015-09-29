import fs from 'fs';
import {BooksCanvas} from './renderer/components/books';
import {Viewer} from './renderer/components/viewer';
import React from 'react';
import {Router, Route, Link} from 'react-router'
var RouteHandler = Router.RouteHandler;
import Bookshelf from './browser/bookshelf';
import {bookshelfStore} from './store/BookshelfStore';
import {viewerStore} from './store/viewerStore';
import {ViewerActions} from './action/action'
import {dispatcher} from './dispatcher/dispatcher';
import {bookSize} from './lib/pdfWrapper'
import {getViewerSizeToFitWindow} from './lib/util'

//resizeTo(600, window.parent.screen.height);

dispatcher.register(payload =>{
  switch (payload.actionType) {
    case "choose":
      bookshelfStore.choose(payload.item);
      break;
    case "start":
      bookshelfStore.start(payload.item);
      break;
    case "renderPage":
      viewerStore.renderPage(payload.item, payload.page);
      break;
    case "movePreviousPage":
      viewerStore.movePreviousPage();
      break;
    case "moveNextPage":
      viewerStore.moveNextPage();
      break;
    case "fitPageToWindow":
      viewerStore.fitPageToWindow();
      break;
    case 'showTheLibrary':
      viewerStore.showTheLibrary();
      break;
  }
});

let bookshelf = new Bookshelf();
var books;
console.log(bookshelf.register());
console.log(books = bookshelf.getAllContentPath());

//function _createBooksCanvasElement(props){
//  React.createClass({
//      render(){
//        return (<BooksCanvas books={props}/>);
//      }
//    });
//}

var createBooksCanvasElement = React.createClass({
  render: function(){
    return(
      <BooksCanvas books={books}/>
    );
  }
});

require('ipc').on('fitPageToWindow', () => {
  ViewerActions.fitPageToWindow();
});

var appRouter = (
  <Router>
    <Route  path='/' component={createBooksCanvasElement}/>
    <Route  path='/bookshelf' component={createBooksCanvasElement}/>
    <Route  path='/viewer/:book/:pageNum/:viewerWidth/:viewerHeight/:bookWidth/:bookHeight' component={Viewer}/>
  </Router>
);

React.render(appRouter, document.getElementById('canvas-wrapper'));
