import fs from 'fs';
import {BooksCanvas} from './renderer/components/books';
import {Viewer} from './renderer/components/viewer';
import React from 'react';
import Bookshelf from './browser/bookshelf';
import {bookshelfStore} from './store/BookshelfStore';
import {viewerStore} from './store/viewerStore';
import {dispatcher} from './dispatcher/dispatcher';
import {bookSize} from './lib/pdfWrapper'

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
    this.bookWidth = null;
    this.bookHeight = null;
  }

  handleChange(){
    //store.choose(this.props.item);
    console.log('changeeeeeeeeeeeeee');
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
    window.innerHeight;
    window.innerWidth;
    console.log(this.props.book);
    bookSize(fs.readFileSync(bookshelf.register() + '/content/' + bookName), this.state.pageNum)
      .then((size) => {
        let bookHeight = size.height;
        let bookWidth = size.width;
        let windowHeight = window.innerHeight - 20;
        let windowWidth = window.innerWidth;
        let resizedWidth = bookWidth * (windowHeight / bookHeight);
        let width = null;
        let height = null;
        if (resizedWidth <= windowWidth) {
          this.bookHeight = windowHeight;
          this.bookWidth = (bookWidth * (this.bookHeight/ bookHeight));
        } else {
          this.bookWidth = windowWidth;
          this.bookHeight = (bookHeight * (this.bookWidth / bookWidth));
        }
        console.log({'ww': windowWidth, 'wh': windowHeight, 'bw': bookWidth, 'bh': bookHeight, 'rw': resizedWidth});
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
      return(<Viewer book={this.state.item} bookHeight={this.bookHeight + 'px'} bookWidth={this.bookWidth + 'px'}/>);
    }
  }
}

React.render(<App/>, document.getElementById('canvas-wrapper'));
