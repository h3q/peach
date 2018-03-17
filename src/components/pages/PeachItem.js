import React, { Component } from 'react'

import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import Chip from 'material-ui/Chip';

const styles = {
  chip: {
		margin: 1
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
		marginLeft: 5
  },
};

class PeachItem extends Component {
  onPeachUpvote = () => {
    const {id, onUpvote } = this.props;
    onUpvote(id)
  };

  render() {
    const { peach } = this.props;
    return (
      <Card style={{marginBottom: 20}}>
        <CardHeader
          title={peach.title}
          actAsExpander={true}
          showExpandableButton={true}
        />
        <div style={styles.wrapper}>
          {peach.tags.map(tag => (
            <Chip backgroundColor="#F06292" labelColor="white" style={styles.chip} key={tag}> {tag} </Chip>
          ))}
        </div>
        <CardText expandable={true}>{peach.text}</CardText>

        <CardActions>
          <FlatButton label="Pluzun" primary={true} onClick={this.onPeachUpvote}/>
          <span>score: {peach.score}</span>
        </CardActions>

      </Card>
    )
  }
}

export default PeachItem;
