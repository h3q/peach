import React, { Component } from 'react';

import PeachForm from './PeachForm'
import PeachItem from './PeachItem'
// Material UI imports
import Paper from 'material-ui/Paper';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

const button = {
	position: 'absolute',
	bottom: 0,
	right: 0,
	margin: 10
}

export class PeachList extends Component {
	constructor(props) {
		super()
		this.state = {
			open: false,
			peaches: [{
				title: 'Rx.Observables',
				tags: ['asynchronous', 'observer', 'qron.js', 'dopeshit'],
				text: `The Observable object represents a push based collection.

							The Observer and Observable interfaces provide a generalized mechanism for push-based notification, also known as the observer design pattern.
							The Observable object represents the object that sends notifications (the provider);
							the Observer object represents the class that receives them (the observer).`,
				score: 0
				}]
		}
	};

	handleOpen = () => {
		this.setState({open: true});
	};
	handleClose = () => {
		this.setState({open: false});
	}
	onChange = (id, event) => {
		const value = event.target.value;
		const newValues = {}
		newValues[id] = value;
		this.setState({ values: { ...this.state.values, ...newValues }});
	}
	onSubmit = () => {
		const parsed = this.state.values.tags.split(/\s?,\s?/g)
		const newPeach = {
			title: this.state.values.title,
			tags: parsed,
			text: this.state.values.text,
			score: 0
		}
		this.setState(prevState => ({
			peaches: [...prevState.peaches, newPeach],
			open: false
		}))
	}
	onRequestClose = () => {
		this.setState({
			values: {
				title: null,
				tags: null,
				text: null
			},
		 	open: false
		})
	}

	onUpvote = (id) => {
		const newPeach = { ...this.state.peaches[id], score: this.state.peaches[id].score + 1 };
		const newPeaches = [...this.state.peaches];
		newPeaches[id] = newPeach;
		this.setState({
			peaches: newPeaches
		})
	}

	render() {
		const actions = [
			<FlatButton
				label="Cancel"
				primary={true}
				onClick={this.onRequestClose}
			/>,
			<FlatButton
				label="Submit"
				primary={true}
				onClick={this.onSubmit}
			/>,
    ];

		return (
				<div>
					<Paper style={{padding: 60}} zDepth={0}>
						{ this.state.peaches.map((peach, id) => (
							<PeachItem peach={peach} id={id} key={peach.title+peach.text.length} onUpvote={this.onUpvote}/>)
						)}
						<FloatingActionButton style={button}>
							<ContentAdd onClick={this.handleOpen}/>
						</FloatingActionButton>
					</Paper>

					<PeachForm
						actions={actions}
						open={this.state.open}
						onRequestClose={this.onRequestClose}
						onChange={this.onChange}
					/>
				</div>
		);
	}
}


export default PeachList;
