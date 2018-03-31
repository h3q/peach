import React, { Component } from 'react';

import { Card, CardActions, CardHeader, CardText } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Chip from 'material-ui/Chip';

import FavoriteIcon from 'material-ui/svg-icons/action/favorite';
import FavoriteBorderIcon from 'material-ui/svg-icons/action/favorite-border';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import DoneIcon from 'material-ui/svg-icons/action/done';
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
const EditButton = ({ onClick, editMode }) => (
  <FlatButton
    secondary
    icon={editMode ? <DoneIcon /> : <EditIcon />}
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
      peach: peach,
      editMode: false
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
  onEditButtonClick = () => {
    const { peach } = this.state;
    if (this.state.editMode) peach.save();
    this.setState(({ editMode }) => ({ editMode: !editMode }));
  };
  onTitleChange = event => {
    const { peach } = this.state;
    peach.description = event.target.value;
  };
  onDescriptionChange = event => {
    const { peach } = this.state;
    peach.description = event.target.value;
  };

  render() {
    const { user } = this.props;
    const { peach } = this.state;
    const { id, title, description, likes, links, created, author } = peach;
    const { isLiked, editMode } = this.state;
    return (
      <div style={{ order: -likes.length }}>
        <Card style={{ margin: 10 }}>
          {!this.state.editMode && (
            <div>
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
            </div>
          )}
          {this.state.editMode && (
            <div
              style={{ margin: 10, display: 'flex', flexDirection: 'column' }}>
              <TextField
                onChange={this.onTitleChange}
                defaultValue={title}
                underlineShow={true}
              />
              <TextField
                onChange={this.onDescriptionChange}
                defaultValue={description}
                underlineShow={true}
                multiLine={true}
                rows={1}
                rowsMax={5}
              />
            </div>
          )}
          <CardActions
            style={{ display: 'flex', justifyContent: 'space-between' }}>
            {this.state.isOwned && (
              <div>
                <RemoveButton onClick={this.onRemoveButtonClick} />
                {!this.state.editMode && (
                  <EditButton
                    onClick={this.onEditButtonClick}
                    editMode={editMode}
                  />
                )}
                {this.state.editMode && (
                  <EditButton
                    onClick={this.onEditButtonClick}
                    editMode={editMode}
                  />
                )}
              </div>
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
