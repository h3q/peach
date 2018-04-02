import React, { Component } from 'react';
import PropTypes from 'prop-types';

import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import AddIcon from 'material-ui/svg-icons/content/add';

import Chip from 'material-ui/Chip';

import { fullWhite } from 'material-ui/styles/colors';

import isURL from '../utils/isURL';

class Link extends Component {
	static contextTypes = {
		muiTheme: PropTypes.object
	};

	removeLink = () => this.props.removeLink(this.props.url);

	getShortenedURL = () => {
		const { url } = this.props;
		if (url.length <= 16) {
			return url;
		}
		return `${url.slice(0, 6)}..${url.slice(-6)}`;
	};
	isRemovable = () => !!this.props.removeLink;
	render() {
		const { url } = this.props;
		return (
			<Chip
				backgroundColor={this.context.muiTheme.palette.accent1Color}
				labelColor={fullWhite}
				onRequestDelete={this.isRemovable() ? this.removeLink : null}
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

export const LinksContainer = ({ links, removeLink }) => (
	<div style={{ display: 'flex', flexWrap: 'wrap', maxHeight: 100 }}>
		{links.map(link => <Link url={link} removeLink={removeLink} key={link} />)}
	</div>
);

export class LinkPicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: ''
		};
	}

	resetValue = () =>
		this.setState({
			value: ''
		});

	onKeyPress = event => event.key === 'Enter' && this.addLink();

	addLink = () => {
		const { addLink, links } = this.props;
		const { value } = this.state;
		if (!isURL() || links.indexOf(value) > -1) {
			return;
		}
		this.resetValue();
		addLink(value);
	};
	removeLink = removed => {
		this.props.removeLink(removed);
		this.ref.focus();
	};

	onURLChange = event => this.setState({ value: event.target.value });

	render() {
		const { value } = this.state;
		const { links } = this.props;
		return (
			<div>
				<div style={{ display: 'flex', width: '100%', alignItems: 'flex-end' }}>
					<TextField
						ref={ref => Object.assign(this, { ref })}
						style={{ flex: 1 }}
						floatingLabelText="URL"
						onChange={this.onURLChange}
						onKeyPress={this.onKeyPress}
						value={value}
						errorText={value && !isURL(value) && 'Not valid URL'}
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
