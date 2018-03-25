import React, { Component } from "react";

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";
import FavoriteIcon from "material-ui/svg-icons/action/favorite";
import FavoriteBorderIcon from "material-ui/svg-icons/action/favorite-border";

const Like = ({ likes = [], uid }) => {
  const number = likes.length;
  const isLiked = likes.indexOf(uid) !== -1;
  return (
    <div>
      {!isLiked && <FavoriteBorderIcon />}
      {isLiked && <FavoriteIcon />}
      <span>{number}</span>
    </div>
  );
};

class PeachItem extends Component {
  onPeachUpvote = () => {
    const { id, onUpvote, uid } = this.props;
    onUpvote(id, uid);
  };

  render() {
    const { peach } = this.props;
    return (
      <Card style={{ margin: 20, width: 400 }}>
        <CardHeader
          title={peach.title}
          subtitle="@Qron"
          actAsExpander={true}
          showExpandableButton={true}
        />

        <CardText style={{ wordBreak: "break-all" }} expandable={true}>
          {peach.description}
        </CardText>

        {/* <div style={{display: "flex", justifyContent: "space-evenly"}}>
          {peach.tags.map(tag => (
            <Chip backgroundColor="#00bcd4" labelColor="white" style={{display: "flex"}} key={tag}> {tag} </Chip>
          ))}
        </div> */}

        <CardActions
          style={{
            flex: 1,
            justifyContent: "flex-end",
            display: "flex",
            alignItems: "center"
          }}>
          <FlatButton
            label="Pluzun"
            primary={true}
            onClick={this.onPeachUpvote}
          />
          <Like likes={peach.likes} uid={this.props.uid} />
        </CardActions>
      </Card>
    );
  }
}

export default PeachItem;
