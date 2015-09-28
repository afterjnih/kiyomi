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

var viewerElement = React.createClass({
  render: function(){
    return(
      <Viewer book={'everydayrailsrspec-jp.pdf'}/>
    );
  }
});

require('ipc').on('fitPageToWindow', () => {
  console.log('ipddddddddddddddddddddddddddddddddddd');
  //document.location.href = '#/bookshelf'
  ViewerActions.fitPageToWindow();
});
console.log(createBooksCanvasElement);
//<Route  path='/viewer' component={viewerElement}/>
var appRouter = (
  <Router>
    <Route  path='/' component={createBooksCanvasElement}/>
    <Route  path='/bookshelf' component={createBooksCanvasElement}/>
    <Route  path='/viewer/:book/:pageNum/:viewerWidth/:viewerHeight/:bookWidth/:bookHeight' component={Viewer}/>
  </Router>
);

React.render(appRouter, document.getElementById('canvas-wrapper'));

class App extends React.Component{
  constructor(){
    super();
    this.state = {purpose: 'bookshelf', item: null};
    this.handleChange = this.handleChange.bind(this);
    this.showTheLibrary = this.showTheLibrary.bind(this);
    this.viewerWidth = null;
    this.viewerHeight = null;
    this.bookWidth = null;
    this.bookHeight = null;
    this.scale = null;
  }

  handleChange(tmp){
    switch(tmp){
      case 'choose':
        console.log(this.state);
        console.log('changeeeeeeeeeeeeeeee');
        bookshelfStore.bookName((item) =>{
          this.fitToWindowSize(item, () => {
            this.setState({
              purpose: 'view',
              item: item
            });
          });
        });
        break;
      //case 'showTheLibrary':
      //  console.log('librryyyyyyyyyyclient');
      //  this.setState({
      //    purpose: 'bookshelf'
      //  });
      //  break;
    }


    //console.log(this.state);
    //console.log('changeeeeeeeeeeeeeeee');
    //bookshelfStore.bookName((item) =>{
    //  this.fitToWindowSize(item, () => {
    //    this.setState({
    //      purpose: 'view',
    //      item: item
    //    });
    //  });
    //});
  }

  showTheLibrary(){
    this.setState({
      purpose: 'bookshelf'
    });
  }

  fitToWindowSize(bookName, render){
    bookSize(fs.readFileSync(bookshelf.register() + '/content/' + bookName), this.state.pageNum)
      .then((size) => {

        this.bookHeight = size.height;
        this.bookWidth = size.width;
        [this.viewerWidth, this.viewerHeight] = getViewerSizeToFitWindow(this.bookWidth, this.bookHeight, window.innerWidth, window.innerHeight - 20);
        render();
      });
  }

  componentDidMount(){
    bookshelfStore.addChangeListener(this.handleChange);
    viewerStore.addChangeListener(this.showTheLibrary, 'showTheLibrary');
    //viewerStore.addChangeListenerEM(this.showTheLibrary);
    console.log('clientttttttttttttttttttttttttttttttttttt');
    require('ipc').on('fitPageToWindow', () => {
      console.log('ipddddddddddddddddddddddddddddddddddd');
      ViewerActions.fitPageToWindow();
    });
    viewerStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount(){
    bookshelfStore.removeChangeListener(this.handleChange);
    viewerStore.removeChangeListener(this.showTheLibrary, 'showTheLibrary');
    //viewerStore.removeChangeListenerEM(this.showTheLibrary);
    viewerStore.removeChangeListener(this.handleChange);
  }

  render(){
    console.log('renderrrrrrrrrrrrrrrrrr');
    if(this.state.purpose == 'bookshelf'){
      console.log('shelffffffffffffffffffffffff');
      return(
        <div>
          <BooksCanvas books={books}/>
        </div>
      );
    }else if(this.state.purpose == 'view'){
      console.log('viewwwwwwwwwwwwwwwwwwwwwwww');
      console.log({'book': this.state.item, 'vh': this.viewerHeight});
      console.log(Viewer);
      return(
        <div>
          <Viewer book={this.state.item} viewerHeight={this.viewerHeight + 'px'} viewerWidth={this.viewerWidth + 'px'} bookHeight={this.bookHeight} bookWidth={this.bookWidth} scale={this.scale}/>
        </div>
      );
    }
  }
}

//React.render(<App/>, document.getElementById('canvas-wrapper'));
