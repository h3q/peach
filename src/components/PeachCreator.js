import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import AppBar from 'material-ui/AppBar';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import { fullWhite } from 'material-ui/styles/colors';

import Peach from '../models/Peach';

import LinkPicker from './LinkPicker';

class PeachCreator extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			description: '',
			links: []
		};
	}
	getActions = () => [
		<FlatButton label="Cancel" secondary onClick={this.props.close} />,
		<FlatButton label="Submit" secondary onClick={this.onSubmit} />
	];

	onSubmit = () => {
		const { onSubmit, close, user } = this.props;
		const peach = new Peach({ ...this.state, author: user.doc });
		peach
			.save()
			.then(() => {
				onSubmit(peach);
				close();
			})
			.catch(error => console.error(error));
	};

	onTitleChange = event => this.setState({ title: event.target.value });
	onDescriptionChange = event =>
		this.setState({ description: event.target.value });

	addLink = added =>
		this.setState(({ links }) => ({ links: [...links, added] }));

	removeLink = removed =>
		this.setState(({ links }) => ({
			links: links.filter(link => link !== removed)
		}));

	render() {
		const { close } = this.props;
		return (
			<Dialog
				title={
					<AppBar
						title="Format you Peach, fella."
						showMenuIconButton={false}
						onTitleClick={close}
						iconElementRight={
							<IconButton
								tooltip="Close"
								touch={true}
								tooltipPosition="top-center"
								onClick={close}
							>
								<CloseIcon color={fullWhite} />
							</IconButton>
						}
					/>
				}
				actions={this.getActions()}
				modal={false}
				open
				autoScrollBodyContent
				onRequestClose={close}
			>
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						fullWidth
						onChange={this.onTitleChange}
						floatingLabelText="Title"
						underlineShow={true}
					/>
					<TextField
						fullWidth
						onChange={this.onDescriptionChange}
						floatingLabelText="Description"
						underlineShow={true}
						multiLine={true}
						rows={1}
						rowsMax={5}
					/>
					<LinkPicker
						links={this.state.links}
						addLink={this.addLink}
						removeLink={this.removeLink}
					/>
				</div>
			</Dialog>
		);
	}
}

export default PeachCreator;
