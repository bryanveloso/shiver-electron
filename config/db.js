import Datastore from 'nedb';
import path from 'path';

export default new Datastore({
  filename: path.resolve(__dirname, 'user.db'),
  autoload: true
});
