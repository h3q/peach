import React, { Component } from "react";

import { Card, CardActions, CardHeader, CardText } from "material-ui/Card";
import FlatButton from "material-ui/FlatButton";
import Chip from "material-ui/Chip";

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
          {peach.text}
        </CardText>

        {/* <div style={{display: "flex", justifyContent: "space-evenly"}}>
          {peach.tags.map(tag => (
            <Chip backgroundColor="#00bcd4" labelColor="white" style={{display: "flex"}} key={tag}> {tag} </Chip>
          ))}
        </div> */}

        <CardActions style={{ flex: 1, justifyContent: "flex-end" }}>
          <FlatButton
            label="Pluzun"
            primary={true}
            onClick={this.onPeachUpvote}
          />
        </CardActions>
      </Card>
    );
  }
}

export default PeachItem;
