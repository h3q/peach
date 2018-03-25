import React, { Component } from 'react';

import PeachForm from './PeachForm';
import PeachItem from './PeachItem';
import Peach, { findAll as findAllPeach } from '../../models/Peach';

// Material UI imports
import List from 'material-ui/List';

import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import FlatButton from 'material-ui/FlatButton';

const button = {
  position: 'absolute',
  bottom: 0,
  right: 0,
  margin: 10
};
const styles = {
  root: {
    display: 'flex',
    alignItems: 'flex-start',
    flexWrap: 'wrap'
  }
};

// TODO: add peach'likes to css rule "flex-order" (?), in order to sort peaches by descending likess

export class PeachList extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
      peaches: []
    };
  }

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  onChange = (id, event) => {
    const value = event.target.value;
    const newValues = {};
    newValues[id] = value;
    this.setState({ values: { ...this.state.values, ...newValues } });
  };
  onSubmit = () => {
    const peach = new Peach({
      title: this.state.values.title,
      description: this.state.values.text,
      likes: [],
      creationDate: Date.now()
    });
    this.setState(prevState => ({
      peaches: [...prevState.peaches, peach],
      open: false
    }));
  };
  onRequestClose = () => {
    this.setState({
      values: {
        title: null,
        tags: null,
        text: null
      },
      open: false
    });
  };
  onUpvote = index => {
    const { peaches } = this.state;

    const { user } = this.props;

    const peach = peaches[index];

    const likeIndex = peach.likes.indexOf(user);

    if (likeIndex === -1) {
      peach.likes.push(user);
    } else {
      peach.likes.splice(likeIndex, 1);
    }

    this.setState({ peaches: [...peaches] });
  };

  componentWillMount = () => {
    findAllPeach().then(peaches => {
      this.setState({ peaches: peaches });
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.onRequestClose}
      />,
      <FlatButton label="Submit" primary={true} onClick={this.onSubmit} />
    ];

    return (
      <div>
        <List style={styles.root}>
          {this.state.peaches.map((peach, index) => (
            <PeachItem
              peach={peach}
              id={index}
              key={index}
              style={{ order: peach.likes.length * -1 }}
              user={this.props.user}
              onUpvote={this.onUpvote}
            />
          ))}
        </List>
        <FloatingActionButton style={button}>
          <ContentAdd onClick={this.handleOpen} />
        </FloatingActionButton>

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
