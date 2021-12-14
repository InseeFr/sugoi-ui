import GitHubIcon from '@material-ui/icons/GitHub';
import { IconButton } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

const GithubButton = () => {
	const { t } = useTranslation();
	const handleClick = () => {
		window.location.href = 'https://github.com/InseeFrLab/sugoi-ui';
	};
	return (
		<IconButton
			color="inherit"
			size="medium"
			aria-label="Go to github project"
			onClick={handleClick}
			title={t('commons.header.buttons.github')}
		>
			<GitHubIcon />
		</IconButton>
	);
};

export default GithubButton;
