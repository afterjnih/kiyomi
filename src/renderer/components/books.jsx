import fs from 'fs'
import React from 'react'
import {Router, Route, Link} from 'react-router'
import {renderBook} from './../../lib/pdfWrapper'
import {Viewer} from './viewer'
import {BookshelfActions} from './../../action/action'
import {bookshelfStore} from './../../store/BookShelfStore'

export class Books extends React.Component{
  constructor () {
    super();
  }
  propTypes = {
    books: React.PropTypes.array
  }

  state = {
    message: 'Hello, Electron'
  }
  renderBooks(books){
    return books.map((book, i) => {
        return(
          <Book book={book}/>
        );
      }
    );
  }

  render(){
    return(
      <div className='bookshelf'>
        {this.renderBooks(this.props.books)}
      </div>
    );
  }
}

class Book extends React.Component{
  constructor(){
    super();
  }
  propTypes = {
    text: React.PropTypes.string.isRequired
  }
  render(){
    return(
      <div className='book'>{this.props.book}</div>
    );
  }
}

export class BooksCanvas extends React.Component{
  constructor(){
    console.log('yobaretayo');
    super();
    this.state = {purpose: 'bookshelf', pageNum: 1, pageCount: 100, bookName: 'eversy'};
    this.handleChange = this.handleChange.bind(this);
  }

  propTypes = {
    books: React.PropTypes.array.isRequired
  }

  handleItemChoose(item){
    BookshelfActions.choose(item);
  }

  comopnentWillReceiveProps(){

    console.log('ajkdsfffffffffffffffffffffffffffffffffff');
  }
  componentWillUpdate(){
   console.log('hellllllllllllllllllllllllllllllllllllllllllllllllllllllll');
  }
  handleChange(tmp){
    switch (tmp){
      case "choose":
        BookShelfStore.bookName((bookName) => {
          this.setState({
            bookName: bookName,
            purpose: 'view'
          });
        });
        break;
    }
  }

  renderBooks(books){
    return books.map((book, i) => {
        return(
          <BookCanvas book={book} bookNumber={i} onChoose={this.handleItemChoose}/>
        );
      }
    );
  }

  render(){
    console.log(this.props.books);
    console.log(this.state.purpose);
    if(this.state.purpose == 'view'){
      //return(<Viewer book={this.state.item} viewerHeight={this.viewerHeight + 'px'} viewerWidth={this.viewerWidth + 'px'} bookHeight={this.bookHeight} bookWidth={this.bookWidth} scale={this.scale}/>);
      return(<Viewer book={this.state.bookName} viewerHeight={500 + 'px'} viewerWidth={500 + 'px'} bookHeight={500} bookWidth={500} scale={1.0}/>);
    }else if(this.state.purpose == 'bookshelf') {
      return (
        <div className='bookshelf'>
          {this.renderBooks(this.props.books)}
        </div>
      );
    }
  }
  componentDidMount(){
  //  bookshelfStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    //bookshelfStore.removeChangeListener(this.handleChange);
    console.log('unmounbokkkkkkkkkkkkkkkkkkkkkkkkk');
  }
}

export class BookCanvas extends React.Component{
  constructor(){
    super();
  }
  propTypes = {
    book: React.PropTypes.string.isRequired,
    bookNumber: React.PropTypes.number.isRequired,
    onChoose: React.PropTypes.func.isRequired
  }

  handleClick(e){
    //React.render(<Viewer/>, document.getElementById('canvas-wrapper'));
    console.log(this.props.book);
    this.props.onChoose(this.props.book);
  }

  render(){
    return(
      //use bind to workaround undefined this on es6
      <Link to={'/viewer/' + this.props.book + '/1/0/0/0/0'} >
          <canvas ref='bookCanvasRef'/>
      </Link>
    );
  }

  componentDidMount(){
    renderBook(fs.readFileSync(bookshelf.register() + '/content/' + this.props.book), React.findDOMNode(this.refs.bookCanvasRef));
  }
}
