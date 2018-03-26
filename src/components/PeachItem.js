import React, { Component } from 'react';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';
import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteBorderIcon from 'material-ui/svg-icons/action/favorite-border';

import RemoveIcon from 'material-ui/svg-icons/action/delete';

const RemoveButton = ({ onClick }) => (
	<FlatButton secondary icon={<RemoveIcon />} onClick={onClick} />
);
const LikeButton = ({ likes, isLiked, onClick }) => (
	<FlatButton
		secondary
		label={likes.toString()}
		labelPosition="before"
		icon={isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
		onClick={onClick}
	/>
);

class PeachItem extends Component {
	constructor({ peach, user }) {
		super();
		this.state = {
			isLiked: peach.likes.indexOf(user.uid) !== -1,
			isOwned: false,
			authorName: null,
			authorPhotoURL: null,
			peach: peach
		};
	}
	componentWillMount() {
		const { user } = this.props;
		const { author } = this.props.peach;
		author.get().then(doc => {
			const { displayName: authorName, photoURL: authorPhotoURL } = doc.data();
			this.setState({
				authorName,
				authorPhotoURL,
				isOwned: doc.id === user.uid
			});
		});
	}
	onLikeButtonClick = () => {
		const { user } = this.props;
		const { peach } = this.state;
		const index = peach.likes.indexOf(user.uid);
		this.state.isLiked
			? peach.likes.splice(index, 1)
			: peach.likes.push(user.uid);
		peach.save();
		this.setState(({ isLiked }) => ({ isLiked: !isLiked }));
	};
	onRemoveButtonClick = () => {
		const { index, remove } = this.props;
		const { peach } = this.state;
		peach.delete();
		remove(index);
	};

	render() {
		const { user } = this.props;
		const { peach } = this.state;
		const { id, title, description, likes, links, created, author } = peach;
		const { isLiked } = this.state;
		return (
			<div style={{ order: -likes.length }}>
				<Card style={{ margin: 10 }}>
					<CardHeader
						title={title}
						subtitle={this.state.authorName}
						avatar={this.state.authorPhotoURL}
						actAsExpander
						showExpandableButton
					/>

					<CardText style={{ wordBreak: 'break-all' }} expandable={true}>
						{description}
					</CardText>

					<CardActions
						style={{ display: 'flex', justifyContent: 'space-between' }}
					>
						{this.state.isOwned && (
							<RemoveButton onClick={this.onRemoveButtonClick} />
						)}
						<LikeButton
							likes={likes.length}
							isLiked={isLiked}
							onClick={this.onLikeButtonClick}
						/>
					</CardActions>
				</Card>
			</div>
		);
	}
}

export default PeachItem;
