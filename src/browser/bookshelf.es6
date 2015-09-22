import remote from 'remote';
var app = remote.require('app');
import fs from 'fs';

export default class Bookshelf{
  register(){
    return app.getPath('userData');
  }

  getAllContentPath(){
    let files;
    let contentPath;
    try {
      files = fs.readdirSync(contentPath = (app.getPath('userData') + '/content'));
    }catch(err){
      fs.mkdirSync(contentPath);
      files = ['ther is no file.'];
      console.log(err);
    }finally{
     return files;
    }
  }
}
