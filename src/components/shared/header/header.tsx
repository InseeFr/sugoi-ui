import {
	AppBar,
	IconButton,
	Toolbar,
	Typography,
	useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useTranslation } from 'react-i18next';
import GroupedIcons from './all-icon-button/grouped-buttons';
interface props {
	handleDrawerToggle: any;
}

const MyHeader = (props: props) => {
	const theme = useTheme();
	const { t } = useTranslation();
	const { handleDrawerToggle } = props;

	return (
		<AppBar
			position="fixed"
			sx={{
				zIndex: theme.zIndex.drawer + 1,
			}}
		>
			<Toolbar
				sx={{
					paddingRight: 12, // keep right padding when drawer closed
				}}
			>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					sx={{
						marginRight: theme.spacing(2),
						[theme.breakpoints.up('sm')]: {
							display: 'none',
						},
					}}
					size="large"
				>
					<MenuIcon />
				</IconButton>
				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					sx={{
						flexGrow: 12,
					}}
				>
					{t('commons.header.title')}
				</Typography>
				<GroupedIcons />
			</Toolbar>
		</AppBar>
	);
};

export default MyHeader;
