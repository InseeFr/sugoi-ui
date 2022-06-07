import { IconButton } from '@mui/material';
import WebIcon from '@mui/icons-material/Web';
import { useTranslation } from 'react-i18next';
import { useConfig } from 'src/lib/hooks/technics/useConfigFile';

const ApiButton = () => {
	const api = useConfig('api');
	const handleClick = () => {
		window.location.href = api ? api : '/';
	};
	const { t } = useTranslation();
	return (
		<IconButton
			color="inherit"
			size="medium"
			aria-label="Go to api documentation"
			onClick={handleClick}
			title={t('commons.header.buttons.api')}
		>
			<WebIcon />
		</IconButton>
	);
};

export default ApiButton;
