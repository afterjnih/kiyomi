import fs from 'fs'
import React from 'react'
import {renderBook} from './../../lib/pdfWrapper'

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
    super();
  }

  propTypes = {
    books: React.PropTypes.array.isRequired
  }

  renderBooks(books){
    return books.map((book, i) => {
        return(
          <BookCanvas book={book} bookNumber={i}/>
        );
      }
    );
  }

  render(){
    console.log(this.props.books);
    return(
      <div className='bookshelf'>
        {this.renderBooks(this.props.books)}
      </div>
    );
  }
}

export class BookCanvas extends React.Component{
  constructor(){
    super();
  }
  propTypes = {
    book: React.PropTypes.string.isRequired,
    bookNumber: React.PropTypes.number.isRequired
  }

  render(){
    return(
      <canvas ref='bookCanvasRef'/>
    );
  }

  componentDidMount(){
    renderBook(fs.readFileSync(bookshelf.register() + '/content/' + this.props.book), React.findDOMNode(this.refs.bookCanvasRef));
  }
}
