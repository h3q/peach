import React, { Component } from 'react';

import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import '../assets/stylesheets/App.css';

import { LoginPage } from './pages/LoginPage';

const Home = () => (
	<div>
		<h2>Home</h2>
	</div>
);

class App extends Component {
	render() {
		return (
			<div className="App">
				<Router>
					<div>
						<ul>
							<li>
								<Link to="/">Home</Link>
							</li>
							<li>
								<Link to="/login">Login</Link>
							</li>
						</ul>

						<hr />

						<Route exact path="/" component={Home} />
						<Route path="/login" component={LoginPage} />
					</div>
				</Router>
			</div>
		);
	}
}

export default App;
