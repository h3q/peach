import React, { Component } from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

import { fullWhite } from 'material-ui/styles/colors';
import NavigationClose from 'material-ui/svg-icons/navigation/close';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import { service } from '../firebaseService';
import { Login } from './Login';

import '../assets/stylesheets/App.css';
import PeachList from './pages/PeachList';

import User from '../models/User.js';

const Menu = ({ source, acronym, logout }) => (
	<div className="menu">
		{source && <Avatar src={source} size={40} style={{ margin: '-8px 0' }} />}
		{!source && <Avatar>{acronym}</Avatar>}
		<IconButton
			tooltip="Logout"
			touch={true}
			tooltipPosition="bottom-left"
			onClick={logout}
		>
			<FontIcon className="material-icons" color={fullWhite}>
				close
			</FontIcon>
		</IconButton>
	</div>
);

class App extends Component {
	constructor() {
		super();
		this.state = { user: null };
	}

	componentDidMount() {
		service
			.auth()
			.onAuthStateChanged(
				userData => userData && this.setState({ user: new User(userData) })
			);
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
								<Menu
									source={user.photoURL}
									acronym={user.getAcronym()}
									logout={this.logout}
								/>
							)
						}
					/>
					{!user && <Login service={service} />}
					{user && <PeachList user={user.uid}/>}
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
