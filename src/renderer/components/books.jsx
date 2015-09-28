import fs from 'fs'
import React from 'react'
import {Router, Route, Link} from 'react-router'
import {renderBook} from './../../lib/pdfWrapper'

export class BooksCanvas extends React.Component{
  constructor(){
    super();
    this.state = {purpose: 'bookshelf', pageNum: 1, pageCount: 100};
  }

  propTypes = {
    books: React.PropTypes.array.isRequired
  }

  renderBooks(books){
    return books.map((book, i) => {
      return(
        <BookCanvas book={book} bookNumber={i}/>
      );
    });
  }

  render(){
      return (
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
      <Link to={'/viewer/' + this.props.book + '/1/0/0/0/0'} >
          <canvas ref='bookCanvasRef'/>
      </Link>
    );
  }

  componentDidMount(){
    renderBook(fs.readFileSync(bookshelf.register() + '/content/' + this.props.book), React.findDOMNode(this.refs.bookCanvasRef));
  }
}
