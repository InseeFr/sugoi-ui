import React from 'react';
import { Button } from '@mui/material';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useTranslation } from 'react-i18next';

interface props {
	expand: Boolean;
	setExpand: any;
}

const ExpandButton = ({ expand, setExpand }: props) => {
	const { t } = useTranslation();
	return (
		<Button
			variant="outlined"
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
