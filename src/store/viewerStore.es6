import EventEmitter from 'event-emitter'
import {Store} from './store'
var CHANGE_EVENT = 'changeEvent'

class ViewerStore extends Store{
  constructor(){
    super();
    this.currentBook = null;
    this.pageNum = 1;
    this.booksCache = null;
  }

  getPageNum(callback){
    callback(this.pageNum);
  }

  movePreviousPage(){
    this.pageNum--;
    this.emitChange();
  }

  moveNextPage(){
    this.pageNum++;
    this.emitChange();
  }
  removeChangeListner
}

var viewerStore = new ViewerStore();
export {viewerStore};