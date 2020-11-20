import React from 'react';
import { Button } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import D from '../../../i18n';

interface props {
	expand: Boolean;
	setExpand: any;
}

const ExpandButton = (props: props) => {
	const { expand, setExpand } = props;

	return (
		<Button
			variant="contained"
			color="default"
			endIcon={expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			onClick={() => setExpand(!expand)}
		>
			{expand ? D.formular_button_reduce : D.formular_button_expand}
		</Button>
	);
};

export default ExpandButton;
