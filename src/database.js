import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyBaeeAEBOlT4GAr9XA57-K51w-UPoepEIM',
	authDomain: 'peach-b1eed.firebaseapp.com',
	databaseURL: 'https://peach-b1eed.firebaseio.com',
	projectId: 'peach-b1eed',
	storageBucket: 'peach-b1eed.appspot.com',
	messagingSenderId: '807043838673'
};

const database = firebase.initializeApp(config);

export default database;
