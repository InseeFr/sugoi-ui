import React from 'react';
import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from '@material-ui/core';

const GithubButton = () => {
	const handleClick = () => {
		window.location.href = 'https://github.com/InseeFrLab/sugoi-ui';
	};
	return (
		<IconButton
			color="inherit"
			size="medium"
			aria-label="Go to github project"
			onClick={handleClick}
			title="Go to github project"
		>
			<GitHubIcon />
		</IconButton>
	);
};

export default GithubButton;
