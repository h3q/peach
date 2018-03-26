import React, { Component } from 'react';

import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';

import Peach from '../models/Peach';

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

	render() {
		const { onSubmit, peach, close } = this.props;
		return (
			<Dialog
				title="Format you Peach, fella."
				actions={this.getActions()}
				modal={false}
				open
				autoScrollBodyContent={true}
				onRequestClose={close}
			>
				What are you going to show to those lovely morons of yours?
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<TextField
						onChange={this.onTitleChange}
						hintText="Peach title"
						underlineShow={true}
					/>
					<TextField
						onChange={this.onDescriptionChange}
						hintText="Peach description"
						underlineShow={true}
						multiLine={true}
						rows={2}
						rowsMax={5}
					/>
					{/*
            * TODO: add links picker
            */}
				</div>
			</Dialog>
		);
	}
}

export default PeachCreator;
