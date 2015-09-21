import remote from 'remote';
var app = remote.require('app');
export default class Bookshelf{
  register(){
    return app.getPath('userData');
  }
}
