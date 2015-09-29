import EventEmitter from 'events';

export class Store{
  constructor(){
    this.emitter = new (EventEmitter.EventEmitter);
  }

  emitChange(event){
    this.emitter.emit(event);
  }

  addChangeListener(event, callback){
    this.emitter.on(event, callback);
  }

  removeChangeListener(event, callback){
    this.emitter.removeListener(event, callback);
  }
}
var store = new Store();
export {store};
//export default new Store();