import fs from 'fs';
import {BooksCanvas} from './renderer/components/books';
import {Viewer} from './renderer/components/viewer';
import React from 'react';
import Bookshelf from './browser/bookshelf';
import {bookshelfStore} from './store/BookshelfStore';
import {viewerStore} from './store/viewerStore';
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
  }
});

let bookshelf = new Bookshelf();
let books;
console.log(bookshelf.register());
console.log(books = bookshelf.getAllContentPath());

class App extends React.Component{
  constructor(){
    super();
    this.state = {purpose: 'bookshelf', item: null};
    this.handleChange = this.handleChange.bind(this);
    this.viewerWidth = null;
    this.viewerHeight = null;
    this.bookWidth = null;
    this.bookHeight = null;
    this.scale = null;
  }

  handleChange(){
    bookshelfStore.bookName((item) =>{
      this.fitToWindowSize(item, () => {
        this.setState({
          purpose: 'view',
          item: item
        });
      });
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
  }

  componentWillUnmount(){
    bookshelfStore.removeChangeListener(this.handleChange);
  }

  render(){
    if(this.state.purpose == 'bookshelf'){
      return(<BooksCanvas books={books}/>);
    }else if(this.state.purpose == 'view'){
      return(<Viewer book={this.state.item} viewerHeight={this.viewerHeight + 'px'} viewerWidth={this.viewerWidth + 'px'} bookHeight={this.bookHeight} bookWidth={this.bookWidth} scale={this.scale}/>);
    }
  }
}

React.render(<App/>, document.getElementById('canvas-wrapper'));
