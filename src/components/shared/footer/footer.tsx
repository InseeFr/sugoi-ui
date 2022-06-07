import { Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();
	return (
		<Grid container direction="column" alignItems="center">
			<Grid item xs={12}>
				<Typography
					variant="body2"
					color="textSecondary"
					align="center"
				>
					{t('commons.footer.version.text')}:{' '}
					{process.env.REACT_APP_UI_VERSION}
				</Typography>
			</Grid>
		</Grid>
	);
};

export default Footer;
