import { styled } from '@mui/material/styles';
import { Typography, Paper, Grid, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useOidc } from '@axa-fr/react-oidc';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'src/lib/configuration/store-configuration';

const PREFIX = 'MainFeaturedPost';

const classes = {
	mainFeaturedPost: `${PREFIX}-mainFeaturedPost`,
	overlay: `${PREFIX}-overlay`,
	mainFeaturedPostContent: `${PREFIX}-mainFeaturedPostContent`,
};

const StyledPaper = styled(Paper)(({ theme }) => ({
	[`&.${classes.mainFeaturedPost}`]: {
		position: 'relative',
		backgroundColor: theme.palette.grey[800],
		color: theme.palette.common.white,
		marginBottom: theme.spacing(6),
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},

	[`& .${classes.overlay}`]: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		right: 0,
		left: 0,
		backgroundColor: 'rgba(0,0,0,.3)',
	},

	[`& .${classes.mainFeaturedPostContent}`]: {
		position: 'relative',
		padding: theme.spacing(3),
		[theme.breakpoints.up('md')]: {
			padding: theme.spacing(6),
			paddingRight: 0,
		},
	},
}));

const MainFeaturedPost = () => {
	const navigate = useNavigate();
	const { login } = useOidc();
	const isAuthenticated = useSelector(
		(store: RootState) => store.user.isAuthenticated,
	);
	const { t } = useTranslation();

	const action: any = () => {
		if (!isAuthenticated) {
			login();
			navigate('/');
		}
	};

	return (
		<StyledPaper
			className={classes.mainFeaturedPost}
			sx={{
				backgroundImage: `url(/landing.jpg)`,
			}}
		>
			<div className={classes.overlay} />
			<Grid container>
				<Grid item md={6}>
					<div className={classes.mainFeaturedPostContent}>
						<Typography
							component="h1"
							variant="h3"
							color="inherit"
							gutterBottom
						>
							{t('home.landing.title')}
						</Typography>
						<Typography
							variant="h5"
							color="inherit"
							paragraph
						>
							{t('home.landing.description')}
						</Typography>
						{isAuthenticated ? null : (
							<Button
								variant="contained"
								onClick={action}
								sx={{
									backgroundColor:
										'#7986cb',
									color: '#ffffff',
								}}
							>
								<Box
									fontWeight="fontWeightBold"
									m={1}
								>
									<Typography>
										{t(
											'home.landing.go_button',
										)}
									</Typography>
								</Box>
							</Button>
						)}
					</div>
				</Grid>
			</Grid>
		</StyledPaper>
	);
};

export default MainFeaturedPost;
