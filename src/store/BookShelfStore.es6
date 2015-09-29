import {Store} from './store'

class BookshelfStore extends Store{
  constructor(){
    super();
    this.purpose = 'bookshelf';
  }
}
var bookshelfStore = new BookshelfStore();
export {bookshelfStore};
