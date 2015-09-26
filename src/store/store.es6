import EventEmitter from 'event-emitter';
var CHANGE_EVENT = "changeEvent"

export class Store{
  constructor(){
    this.emitter = new EventEmitter();
  }

  emitChange(e){
    if(!e){
      this.emitter.emit(CHANGE_EVENT);
    }else{
      this.emitter.emit(e);
    }
  }

  addChangeListener(callback, event){
    if(!event){
      event = CHANGE_EVENT;
    }
    this.emitter.on(event, callback);
  }

  removeChangeListener(callback){
    this.emitter.removeListener(CHANGE_EVENT, callback);
  }
}
var store = new Store();
export {store};
//export default new Store();