import EventEmitter from 'event-emitter';
import _EventEmitter from 'events';
var CHANGE_EVENT = "changeEvent"

export class Store{
  constructor(){
    this.emitter = new EventEmitter();
    this._emitter = new (_EventEmitter.EventEmitter);
  }

  emitChange(arg){
    //if(!e){
      this.emitter.emit(CHANGE_EVENT, arg);
    //}else{
    //  this.emitter.emit(e, arg);
    //}
    this._emitter.emit(event);
  }

  addChangeListener(callback, event){
    console.log(this.emitter);
    if(!event){
      event = CHANGE_EVENT;
    }
    this.emitter.on(event, callback);
    console.log(this.emitter);
    this._emitter.on(event, callback);
  }

  removeChangeListener(callback){
    console.log(callback);
    console.log(this.emitter);
    //this.emitter.removeListener(CHANGE_EVENT, callback);
    this.emitter.off(CHANGE_EVENT, callback);
    this._emitter.removeListener(event, callback);
  }
}
var store = new Store();
export {store};
//export default new Store();