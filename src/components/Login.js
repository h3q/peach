import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';

import Paper from 'material-ui/Paper';
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar';
import { fullWhite } from 'material-ui/styles/colors';

import Page from './Page';

const UI_CONFIG = {
	signInFlow: 'popup',
	signInOptions: [
		firebase.auth.GoogleAuthProvider.PROVIDER_ID,
		firebase.auth.FacebookAuthProvider.PROVIDER_ID,
		firebase.auth.GithubAuthProvider.PROVIDER_ID,
		firebase.auth.TwitterAuthProvider.PROVIDER_ID,
		firebase.auth.EmailAuthProvider.PROVIDER_ID,
		firebase.auth.PhoneAuthProvider.PROVIDER_ID
	],
	callbacks: {
		signInSuccess: () => false
	}
};

export const Login = ({ service }, context) => (
	<Page style={{ alignItems: 'center', justifyContent: 'center' }}>
		<Paper zDepth={2}>
			<Toolbar
				style={{
					backgroundColor: context.muiTheme.palette.primary3Color
				}}
			>
				<ToolbarGroup>
					<ToolbarTitle text="Login" style={{ color: fullWhite }} />
				</ToolbarGroup>
			</Toolbar>
			<StyledFirebaseAuth uiConfig={UI_CONFIG} firebaseAuth={service.auth()} />
		</Paper>
	</Page>
);

Login.contextTypes = {
	muiTheme: PropTypes.object
};

Login.propTypes = {
	service: PropTypes.object
};

export default Login;
