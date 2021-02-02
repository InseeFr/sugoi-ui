import React from 'react';
import { Button } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface props {
	expand: Boolean;
	setExpand: any;
}

const ExpandButton = ({ expand, setExpand }: props) => {
	return (
		<Button
			variant="contained"
			color="default"
			endIcon={expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			onClick={() => setExpand(!expand)}
		>
			{expand ? 'Voir plus' : 'Voir moins'}
		</Button>
	);
};

export default ExpandButton;
