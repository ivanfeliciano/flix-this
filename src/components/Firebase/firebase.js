import app from 'firebase/app';
import 'firebase/database';
import CONFIG from './config';

var firebase = app.initializeApp(CONFIG);
export default firebase;