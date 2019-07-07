import app from 'firebase/app';
import 'firebase/database';

const config = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
};

export default class Firebase {
  constructor() {
    app.initializeApp(config);
  }

  database = () => app.database();
}
