import firebase from 'firebase';
import firestore from 'firebase/firestore';

import config from './config/firebase';

export const service = firebase.initializeApp(config);

export const store = firebase.firestore();

export default service;
