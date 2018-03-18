import React from 'react';
import ReactDOM from 'react-dom';
import './scss/index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';
import * as auth from './firebase/auth';
import * as firebase from './firebase/firebase';
import * as db from './firebase/db';

export {
    auth,
    db,
    firebase,
};

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
