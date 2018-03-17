import React, { Component } from 'react';

// import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../assets/stylesheets/App.css';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

// import { LoginPage } from './pages/LoginPage';
import { PeachList } from './pages/PeachList';

class App extends Component {
	state = { title: 'Peach' };
	render() {
		return (
			<MuiThemeProvider>
				<div className="App">
					<AppBar
						title={this.state.title}
						iconClassNameRight="muidocs-icon-navigation-expand-more"
					/>

					<PeachList />
				</div>
			</MuiThemeProvider>
		);
	}
}

export default App;
