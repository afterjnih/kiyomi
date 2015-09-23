import {dispatcher} from './../dispatcher/dispatcher'

export var BookShelfActions = {
  choose: (item) => {
    dispatcher.dispatch({
      actionType: 'choose',
      item: item
    });
  },

  star: (item) => {
    dispatcher.dispatch({
      actionType: 'start',
      item: item
    });
  }
}