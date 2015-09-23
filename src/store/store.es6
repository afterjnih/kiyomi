import EventEmitter from 'event-emitter';
var CHANGE_EVENT = "changeEvent"

class Store{
  constructor(){
    this.purpose = 'bookshelf';
    this.emitter = new EventEmitter();
  }

  emitChange(){
    this.emitter.emit(CHANGE_EVENT);
  }

  addChangeListener(callback){
    this.emitter.on(CHANGE_EVENT, callback);
  }

  removeChangeListener(callback){
    this.emitter.removeListener(CHANGE_EVENT, callback);
  }

  choose(item){
    console.log("chosen item is" + item);
    this.purpose = 'view';
    this.item = item;
   this.emitChange();
  }

  start(item){
    this.emitChange();
  }

  bookName(callback){
   callback(this.item);
  }
}
var store = new Store();
export {store};
//export default new Store();