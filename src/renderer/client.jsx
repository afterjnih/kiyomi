import fs from 'fs';
import {Books} from './renderer/components/books';
import React from 'react'
import Bookshelf from './browser/bookshelf';
import {renderBook} from './lib/pdfWrapper'
let bookshelf = new Bookshelf();
let books;
console.log(bookshelf.register());
console.log(books = bookshelf.getAllContentPath());
console.log(renderBook);
renderBook(fs.readFileSync(bookshelf.register() + '/content/everydayrailsrspec-jp.pdf'), document.getElementById('the-canvas'));

React.render(<Books books={books}/>, document.getElementById('bookshelf'));
