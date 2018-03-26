import React from 'react';

import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';

import CloseIcon from 'material-ui/svg-icons/navigation/close';

import { fullWhite } from 'material-ui/styles/colors';

export const UserMenu = ({ source, acronym, logout }) => (
	<div>
		{source && <Avatar src={source} size={40} style={{ margin: '-8px 0' }} />}
		{!source && <Avatar>{acronym}</Avatar>}
		<IconButton
			tooltip="Logout"
			touch={true}
			tooltipPosition="bottom-left"
			onClick={logout}
		>
			<CloseIcon color={fullWhite} />
		</IconButton>
	</div>
);

export default UserMenu;
