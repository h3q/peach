import React, { Component } from 'react';

import firebase from 'firebase';

const config = {
	apiKey: 'AIzaSyBaeeAEBOlT4GAr9XA57-K51w-UPoepEIM',
	authDomain: 'peach-b1eed.firebaseapp.com',
	databaseURL: 'https://peach-b1eed.firebaseio.com',
	projectId: 'peach-b1eed',
	storageBucket: 'peach-b1eed.appspot.com',
	messagingSenderId: '807043838673'
};
firebase.initializeApp(config);

const uiConfig = {
	// Popup signin flow rather than redirect flow.
	signInFlow: 'popup',
	// Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
	signInSuccessUrl: '/signedIn',
	// We will display Google and Facebook as auth providers.
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.PhoneAuthProvider.PROVIDER_ID
	]
};

export class LoginPage extends Component {
	render() {
		return (
			<StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
		);
	}
}

export default LoginPage;
