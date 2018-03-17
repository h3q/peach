import React from 'react';

import TextField from 'material-ui/TextField';

export const QronTextField = ({ onChange, id, hintText, underlineShow, multiLine, rows, rowsMax}) => {
	const onFieldChange = (e) => {
		onChange(id, e);
	}
	return (
			<TextField hintText={hintText} onChange={onFieldChange} underlineShow={underlineShow} id={id} multiLine={true} rows={1} rowsMax={5}/>
)};


export default QronTextField;
