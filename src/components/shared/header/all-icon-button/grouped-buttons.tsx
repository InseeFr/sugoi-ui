import { Box } from '@mui/material';
import AccountButton from './account-button';
import ApiButton from './api-button';
import GithubButton from './github-button';
import HelpButton from './help-button';
import LanguageButton from './language-button';
import LoginButton from './login-button';
import MoreIconButton from './moreicon-button';
import NotifButton from './notif-button';
import { ThemeButton } from './theme-button';

const GroupedIcons = () => {
	return (
		<>
			<Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
				<LanguageButton />
				<HelpButton />
				<ApiButton />
				<GithubButton />
				<ThemeButton />
				<AccountButton />
				<NotifButton />
				<LoginButton />
			</Box>

			<Box sx={{ display: { xs: 'flex', sm: 'none' } }}>
				<MoreIconButton />
			</Box>
		</>
	);
};

export default GroupedIcons;
