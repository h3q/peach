import React from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';

export const Page = ({ style, children }, context) => (
	<Paper
		rounded={false}
		zDepth={0}
		style={{
			backgroundColor: context.muiTheme.palette.accent2Color,
			flex: 1,
			display: 'flex',
			flexDirection: 'column',
			...style
		}}
	>
		{children}
	</Paper>
);

Page.contextTypes = {
	muiTheme: PropTypes.object
};

Page.propTypes = {
	style: PropTypes.object,
	children: PropTypes.node
};

export default Page;
