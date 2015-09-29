import {Store} from './store'

export class ViewerStore extends Store{
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
    this.emitChange('movePage');
  }

  moveNextPage(){
    this.pageNum++;
    this.emitChange('movePage');
  }

  fitPageToWindow = function(){
    this.emitChange('fitPageToWindow');
  };

  showTheLibrary(){
    this.emitChange('showTheLibrary');
  }
}

var viewerStore = new ViewerStore();
//var viewerStore = 'aa'
export {viewerStore};