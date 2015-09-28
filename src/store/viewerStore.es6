import EventEmitter from 'event-emitter'
import EventEmitterEM from 'events'
import {Store} from './store'
var CHANGE_EVENT = 'changeEvent'

//class ViewerStore extends Store{
export class ViewerStore{
  constructor(){
    this.currentBook = null;
    this.pageNum = 1;
    this.booksCache = null;
    this.emitter = new EventEmitter();
    this.em = new (EventEmitterEM.EventEmitter);
    console.log(this.emitter);
  }
  emitChange(arg){
    //if(!e){
    if(arg == 'fitPageToWindow') {
      this.emitter.emit('fitPageToWindow');
    }else if(arg == 'showTheLibrary'){
      this.emitter.emit(arg);
    }else{
      this.emitter.emit(CHANGE_EVENT, arg);
    }
    //}else{
    //  this.emitter.emit(e, arg);
    //}
  }
  addChangeListenerEM(callback){
    var a = function(){console.log('aaaaaaaaaaaaaaaaa');};
    this.em.on(CHANGE_EVENT, callback);
    this.em.on('aaa', a);
    this.em.emit('aaa');
  }

  addChangeListener(callback, event){
    //console.log(arguments.callee.caller)
    console.log(this.emitter);

    if(!event){
      event = CHANGE_EVENT;
    }
    console.log([event, callback]);
    this.emitter.on(event, callback);
    console.log(this.emitter);
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
    //this.emitChange('fitPageToWindow');
    console.log(this.em.emit(CHANGE_EVENT));
  };



  showTheLibrary(){
    console.log('libraryyyyyyyyyyyyyyy');
    this.emitChange('showTheLibrary');
  }

  removeChangeListenerEM(callback){
    console.log(this.em);
    this.em.emit('aaa');
    this.em.removeListener(CHANGE_EVENT, callback);
    this.em.removeAllListeners(CHANGE_EVENT);
    console.log(this.em);
    this.em.removeAllListeners('aaa');
    this.em.emit('aaa');
    this.em = new (EventEmitterEM.EventEmitter);
  }

  removeChangeListener(callback, event){
    if(!event){
      event = CHANGE_EVENT;
    }
    console.log('unmounviewwee22222222222222222');
    console.log(callback);
    console.log(this.emitter);
    //this.emitter.removeListener(CHANGE_EVENT, callback);
    this.emitter.off(event, callback);
    //this.emitter.off(CHANGE_EVENT, callback);
    //this.emitter.off(CHANGE_EVENT, callback);
    console.log(this.emitter);
  }
}

var viewerStore = new ViewerStore();
//var viewerStore = 'aa'
export {viewerStore};