import React, { Component } from 'react';
import QronTextField from './QronTextField'

import Dialog from 'material-ui/Dialog';

class PeachForm extends Component {
  render() {
    const { actions, open, onRequestClose, onChange} = this.props;
    return (
  		<Dialog
  			title="Format you Peach, fella."
  			actions={actions}
  			modal={false}
  			open={open}
  			onRequestClose={onRequestClose}
  			autoScrollBodyContent={true}
  		>
  			What are you going to show to those lovely morons of yours?
  			<div style={{ display: "flex", flexDirection: "column" }} >
  			<QronTextField onChange={onChange} id="title" hintText="Peach title" underlineShow={true}/>
  			<QronTextField onChange={onChange} id="tags" hintText="Peach tags" underlineShow={true}/>
  			<QronTextField onChange={onChange} id="text" hintText="Peach text" underlineShow={true} multiLine={true} rows={2} rowsMax={5}/>
  			</div>
  		</Dialog>
  	)
  }
}

export default PeachForm;
