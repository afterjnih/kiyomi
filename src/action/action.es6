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
    dispatcher.dispatch({
      actionType: 'moveNextPage'
    });
  }
}
