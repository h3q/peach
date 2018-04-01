import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PeachCreator from './PeachCreator';
import PeachItem from './PeachItem';

import { findAll as fetchAllPeach } from '../models/Peach';

// Material UI imports
import List from 'material-ui/List';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import Page from './Page';

export class PeachList extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
      peaches: []
    };
  }

  static contextTypes = {
    muiTheme: PropTypes.object
  };

  static propTypes = {
    user: PropTypes.object
  };

  handleOpen = () => {
    this.setState({ open: true });
  };
  handleClose = () => {
    this.setState({ open: false });
  };

  componentWillMount = () => {
    fetchAllPeach().then(peaches => {
      this.setState({ peaches: peaches });
    });
  };

  addPeach = peach =>
    this.setState(({ peaches }) => ({ peaches: [...peaches, peach] }));

  removePeach = removed =>
    this.setState(({ peaches }) => ({
      peaches: peaches.filter((peach, index) => index !== removed)
    }));

  render() {
    const { user } = this.props;
    const { peaches } = this.state;

    return (
      <Page>
        <Toolbar
          style={{
            justifyContent: 'flex-end',
            backgroundColor: this.context.muiTheme.palette.primary2Color
          }}>
          <ToolbarGroup>
            <FloatingActionButton
              onClick={this.handleOpen}
              secondary
              style={{ position: 'relative', top: '50%' }}>
              <ContentAdd />
            </FloatingActionButton>
          </ToolbarGroup>
        </Toolbar>
        <List className="peaches">
          {peaches.map((peach, index) => (
            <PeachItem
              peach={peach}
              index={index}
              key={index}
              user={user}
              remove={this.removePeach}
            />
          ))}
        </List>

        {this.state.open && (
          <PeachCreator
            onSubmit={this.addPeach}
            close={this.handleClose}
            user={user}
          />
        )}
      </Page>
    );
  }
}

export default PeachList;
