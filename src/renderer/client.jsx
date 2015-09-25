import {BooksCanvas} from './renderer/components/books';
import {Viewer} from './renderer/components/viewer';
import React from 'react';
import Bookshelf from './browser/bookshelf';
import {bookshelfStore} from './store/BookshelfStore';
import {viewerStore} from './store/viewerStore';
import {dispatcher} from './dispatcher/dispatcher';

dispatcher.register(payload =>{
  switch (payload.actionType) {
    case "choose":
      console.log('nextttttttttttttttttt');
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
console.log(dispatcher);
//console.log('nextttttttttttttttttt');
let bookshelf = new Bookshelf();
let books;
console.log(bookshelf.register());
console.log(books = bookshelf.getAllContentPath());

class App extends React.Component{
  constructor(){
    super();
    this.state = {purpose: 'bookshelf', item: null};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(){
    //store.choose(this.props.item);
    bookshelfStore.bookName((item) =>{
      this.setState({
        purpose: 'view',
        item: item
      });
    });
  }

  componentDidMount(){
    bookshelfStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount(){
    bookshelfStore.removeChangeListener(this.handleChange);
  }

  render(){
    console.log(this.state.purpose);
    if(this.state.purpose == 'bookshelf'){
      return(<BooksCanvas books={books}/>);
    }else if(this.state.purpose == 'view'){
      console.log(this.state.item);
      return(<Viewer book={this.state.item}/>);
    }
  }
}

React.render(<App/>, document.getElementById('canvas-wrapper'));
