import { Grid } from '@mui/material';
import Title from 'src/components/shared/title/title';
import MainFeaturedPost from './landingpage/landingpage';
import CardRights from './right-card';
import { useTranslation } from 'react-i18next';
import { useOidcAccessToken } from '@axa-fr/react-oidc';

const Home = () => {
	const { t } = useTranslation();
	document.title = t('home.page_title');
	const accessToken = useOidcAccessToken().accessToken;

	return (
		<>
			<Title title={t('home.title')} />
			<MainFeaturedPost />
			{accessToken !== null && (
				<Grid container direction="column" spacing={5}>
					<Grid item>
						<CardRights />
					</Grid>
				</Grid>
			)}
		</>
	);
};

export default Home;
