import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import Chip from 'material-ui/Chip';

import { fullWhite } from 'material-ui/styles/colors';

const URL_PATTERN = new RegExp(
	'^(https?:\\/\\/)?' + // protocol
	'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
	'((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
	'(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
		'(\\#[-a-z\\d_]*)?$',
	'i'
);

export const LinksContainer = ({ links, removeLink }) => (
	<div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 100 }}>
		{links.map((link, index) => (
			<Link url={link} removeLink={removeLink} key={index} index={index} />
		))}
	</div>
);

class Link extends Component {
	onRemove = () => this.props.removeLink(this.props.index);

	static contextTypes = {
		muiTheme: PropTypes.object
	};

	getShortenedURL = () => {
		const { url } = this.props;
		if (url.length <= 16) {
			return url;
		}
		return `${url.slice(0, 6)}..${url.slice(-6)}`;
	};
	render() {
		const { url } = this.props;
		return (
			<Chip
				backgroundColor={this.context.muiTheme.palette.accent1Color}
				labelColor={fullWhite}
				onRequestDelete={this.onRemove}
				deleteIconStyle={{ fill: fullWhite }}
				style={{ margin: 4 }}
			>
				<a
					style={{ color: 'inherit', textDecoration: 'none' }}
					href={url}
					target="_blank"
				>
					{this.getShortenedURL()}
				</a>
			</Chip>
		);
	}
}

export class LinkPicker extends Component {
	constructor() {
		super();
		this.state = {
			value: '',
			links: []
		};
	}
	onKeyPress = event => event.key === 'Enter' && this.addLink();

	addLink = () => {
		if (!this.isURL()) return;
		this.setState(
			({ links }) =>
				links.indexOf(this.state.value) < 0 && {
					links: [...links, this.state.value],
					value: ''
				}
		);
	};
	removeLink = removedIndex =>
		this.setState(({ links }) => ({
			links: links.filter((link, index) => removedIndex !== index)
		}));

	onURLChange = event => this.setState({ value: event.target.value });

	isURL = () => URL_PATTERN.test(this.state.value);

	render() {
		const { value, links } = this.state;
		return (
			<div>
				<div style={{ display: 'flex', width: '100%', alignItems: 'flex-end' }}>
					<TextField
						style={{ flex: 1 }}
						floatingLabelText="URL"
						onChange={this.onURLChange}
						onKeyPress={this.onKeyPress}
						value={value}
						errorText={value && !this.isURL(value) && 'Not valid URL'}
					/>
					<FlatButton
						secondary
						style={{ minWidth: 36, borderRadius: '100%', margin: 4 }}
						icon={<AddIcon />}
						onClick={this.addLink}
					/>
				</div>
				<LinksContainer links={links} removeLink={this.removeLink} />
			</div>
		);
	}
}

export default LinkPicker;
