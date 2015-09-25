import EventEmitter from 'event-emitter';
var CHANGE_EVENT = "changeEvent"

export class Store{
  constructor(){
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
}
var store = new Store();
export {store};
//export default new Store();