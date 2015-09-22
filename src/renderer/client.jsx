import {BooksCanvas} from './renderer/components/books';
import React from 'react'
import Bookshelf from './browser/bookshelf';
let bookshelf = new Bookshelf();
let books;
console.log(bookshelf.register());
console.log(books = bookshelf.getAllContentPath());

React.render(<BooksCanvas books={books}/>, document.getElementById('canvas-wrapper'));
