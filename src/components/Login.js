import React from 'react';

import firebase from 'firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

const config = {
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID
		//firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		//firebase.auth.GithubAuthProvider.PROVIDER_ID,
		//firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		//firebase.auth.EmailAuthProvider.PROVIDER_ID,
		//firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	callbacks: {
		signInSuccess: () => false
	}
};

export const Login = ({ service }) => (
	<StyledFirebaseAuth uiConfig={config} firebaseAuth={service.auth()} />
);

export default Login;
