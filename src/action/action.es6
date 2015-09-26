import {dispatcher} from './../dispatcher/dispatcher'

export var BookshelfActions = {
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

export var ViewerActions = {
  renderPage: (item, page) => {
    dispatcher.dispatch({
      actionType: 'render',
      item: item,
      page: page
    });
  },

  movePreviousPage: () => {
    dispatcher.dispatch({
      actionType: 'movePreviousPage'
    });
  },

  moveNextPage: () => {
    console.log('moveeeeeeeeeeeeeeeeeeeeee');
    dispatcher.dispatch({
      actionType: 'moveNextPage'
    });
  },

  fitPageToWindow: () => {
    console.log('fit2222222222222222221');
    dispatcher.dispatch({
      actionType: 'fitPageToWindow'
    });
    console.log('fit3333333333333333331');
  }
}
