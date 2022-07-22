import { Grid } from '@mui/material';
import Title from 'src/components/shared/title/title';
import MainFeaturedPost from './landingpage/landingpage';
import CardRights from './right-card';
import { useTranslation } from 'react-i18next';
import { RootState } from 'src/lib/configuration/store-configuration';
import { useSelector } from 'react-redux';

const Home = () => {
	const { t } = useTranslation();
	document.title = t('home.page_title');
	const isAuthenticated = useSelector(
		(store: RootState) => store.user.isAuthenticated,
	);

	return (
		<>
			<Title title={t('home.title')} />
			<MainFeaturedPost />
			{isAuthenticated && (
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
