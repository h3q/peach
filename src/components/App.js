import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import AppBar from 'material-ui/AppBar';

import { service } from '../firebaseService';
import { Login } from './Login';

import '../assets/stylesheets/main.css';
import PeachList from './PeachList';

import User from '../models/User.js';

import { UserMenu } from './UserMenu';

class App extends Component {
	constructor() {
		super();
		this.state = { user: null };
	}

	componentDidMount() {
		service.auth().onAuthStateChanged(userData => {
			if (userData) {
				const user = new User(userData);
				user
					.save()
					.then(() => this.setState({ user }), error => console.error(error));
			}
		});
	}

	logout = () => {
		service.auth().signOut();
		this.setState({ user: null });
	};

	render() {
		const { user } = this.state;
		return (
			<MuiThemeProvider>
				<div className="app">
					<AppBar
						title="Peach"
						showMenuIconButton={false}
						iconElementRight={
							user && (
								<UserMenu
									source={user.photoURL}
									acronym={user.getAcronym()}
									logout={this.logout}
								/>
							)
						}
					/>
					{!user && <Login service={service} />}
					{user && <PeachList user={user} />}
				</div>
			</MuiThemeProvider>
		);
	}
}

// AppBarUserPanel.propTypes = {
// 	user: PropTypes.object.isRequired,
// 	logout; PropTypes.func.isRequired
// };

export default App;
