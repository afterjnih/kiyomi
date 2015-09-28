import fs from 'fs'
import React from 'react'
import {Router, Route, Link} from 'react-router'
import {renderBook} from './../../lib/pdfWrapper'
import {Viewer} from './viewer'
import {BookshelfActions} from './../../action/action'
import {bookshelfStore} from './../../store/BookShelfStore'

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
    if(this.state.purpose == 'view'){
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
    bookshelfStore.addChangeListener(this.handleChange);
  }

  componentWillUnmount() {
    bookshelfStore.removeChangeListener(this.handleChange);
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
    this.props.onChoose(this.props.book);
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
