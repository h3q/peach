import React, { Component } from 'react';

import PeachCreator from './PeachCreator';
import PeachItem from './PeachItem';

import Peach, { findAll as fetchAllPeach } from '../models/Peach';

// Material UI imports
import List from 'material-ui/List';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

const styles = {
	root: {
		display: 'flex',
		alignItems: 'flex-start',
		flexWrap: 'wrap'
	}
};

// TODO: add peach'likes to css rule "flex-order" (?), in order to sort peaches by descending likess

export class PeachList extends Component {
	constructor() {
		super();
		this.state = {
			open: false,
			peaches: []
		};
	}

	handleOpen = () => {
		this.setState({ open: true });
	};
	handleClose = () => {
		this.setState({ open: false });
	};

	componentWillMount = () => {
		fetchAllPeach().then(peaches => {
			this.setState({ peaches: peaches });
		});
	};

	addPeach = peach =>
		this.setState(({ peaches }) => ({ peaches: [...peaches, peach] }));

	removePeach = removed =>
		this.setState(({ peaches }) => ({
			peaches: peaches.filter((peach, index) => index !== removed)
		}));

	render() {
		const { user } = this.props;
		const { peaches } = this.state;

		return (
			<div>
				<Toolbar style={{ justifyContent: 'flex-end' }}>
					<ToolbarGroup>
						<FloatingActionButton
							onClick={this.handleOpen}
							secondary
							style={{ position: 'relative', top: '50%' }}
						>
							<ContentAdd />
						</FloatingActionButton>
					</ToolbarGroup>
				</Toolbar>
				<List className="peaches">
					{peaches.map((peach, index) => (
						<PeachItem
							peach={peach}
							index={index}
							key={index}
							user={user}
							remove={this.removePeach}
						/>
					))}
				</List>

				{this.state.open && (
					<PeachCreator
						onSubmit={this.addPeach}
						close={this.handleClose}
						user={user}
					/>
				)}
			</div>
		);
	}
}

export default PeachList;
