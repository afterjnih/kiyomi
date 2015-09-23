import {dispathcher} from './dispatcher/dispatcher'
import {store} from './store/store'

Dispatcher.register(payload =>{
  switch (payload.actionType) {
    case "choose":
      Store.choose(payload.item);
      break;
  }
});
