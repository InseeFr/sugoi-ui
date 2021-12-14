import { Hidden } from '@material-ui/core';
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
			<Hidden xsDown implementation="css">
				<LanguageButton />
				<HelpButton />
				<ApiButton />
				<GithubButton />
				<ThemeButton />
				<AccountButton />
				<NotifButton />
				<LoginButton />
			</Hidden>

			<Hidden smUp implementation="css">
				<MoreIconButton />
			</Hidden>
		</>
	);
};

export default GroupedIcons;
