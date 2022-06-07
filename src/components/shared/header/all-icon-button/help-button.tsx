import { IconButton } from '@mui/material';
import { useTranslation } from 'react-i18next';
import HelpIcon from '@mui/icons-material/Help';
import { useConfig } from 'src/lib/hooks/technics/useConfigFile';

export const HelpButton = () => {
	const { t } = useTranslation();
	const documentation_link = useConfig('documentation_link');
	const handleClick = () => {
		window.location.href = documentation_link as string;
	};
	return documentation_link ? (
		<IconButton
			color="inherit"
			aria-label="Go documentation"
			onClick={handleClick}
			title={t('commons.header.buttons.help')}
			size="large"
		>
			<HelpIcon />
		</IconButton>
	) : null;
};

export default HelpButton;
