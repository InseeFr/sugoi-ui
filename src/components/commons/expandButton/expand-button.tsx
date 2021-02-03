import React from 'react';
import { Button } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { useTranslation } from 'react-i18next';

interface props {
	expand: Boolean;
	setExpand: any;
}

const ExpandButton = ({ expand, setExpand }: props) => {
	const { t } = useTranslation();
	return (
		<Button
			variant="contained"
			color="default"
			endIcon={expand ? <ExpandLessIcon /> : <ExpandMoreIcon />}
			onClick={() => setExpand(!expand)}
		>
			{expand
				? t('commons.expand_button.show_less')
				: t('commons.expand_button.show_more')}
		</Button>
	);
};

export default ExpandButton;
