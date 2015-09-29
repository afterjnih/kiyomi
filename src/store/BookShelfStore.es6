import EventEmitter from 'event-emitter';
import {Store} from './store'
var CHANGE_EVENT = "changeEvent"

class BookshelfStore extends Store{
  constructor(){
    super();
    this.purpose = 'bookshelf';
  }
  
  choose(item){
    console.log("chosen item is" + item);
    this.purpose = 'view';
    this.item = item;
   this.emitChange('choose');
  }

  start(item){
    this.emitChange();
  }

  bookName(callback){
   callback(this.item);
  }
}
var bookshelfStore = new BookshelfStore();
export {bookshelfStore};
//export default new Store();