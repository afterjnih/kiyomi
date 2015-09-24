import {BooksCanvas} from './renderer/components/books';
import {Viewer} from './renderer/components/viewer';
import React from 'react';
import Bookshelf from './browser/bookshelf';
import {store} from './store/store';
import {dispatcher} from './dispatcher/dispatcher';

dispatcher.register(payload =>{
  switch (payload.actionType) {
    case "choose":
      store.choose(payload.item);
      break;
    case "start":
      store.start(payload.item);
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
  }

  handleChange(){
    //store.choose(this.props.item);
    store.bookName((item) =>{
      //this.state.purpose = 'view';
      //this.props.item = item;
      this.setState({
        purpose: 'view',
        item: item
      });
    });
  }

  componentDidMount(){
    store.addChangeListener(this.handleChange);
  }

  componentWillUnmount(){
    store.removeChangeListener(this.handleChange);
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
