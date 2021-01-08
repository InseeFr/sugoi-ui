import { IconButton } from '@material-ui/core';
import WebIcon from '@material-ui/icons/Web';
import React from 'react';
import { useConfig } from '../../../../hooks/technics/useConfigFile';

const ApiButton = () => {
	const api = useConfig('api');
	const handleClick = () => {
		window.location.href = api ? api : '/';
	};
	return (
		<IconButton
			color="inherit"
			size="medium"
			aria-label="Go to api documentation"
			onClick={handleClick}
			title="Go to api documentation"
		>
			<WebIcon />
		</IconButton>
	);
};

export default ApiButton;
