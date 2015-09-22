import React from 'react'

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

//class BookCanvas extends React.Component{
//  constructor(){
//    super();
//  }
//
//  render(){
//    return(
//      <canvas ref="bookCanvas"/>
//    );
//  }
//
//  componentDidMount(){
//   var canvasNode = React.findDOMNode(this.refs.mainCanvas);
//  }
//}
