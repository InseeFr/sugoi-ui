import { AppBar, IconButton, Toolbar, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import { useTranslation } from 'react-i18next';
import GroupedIcons from './all-icon-button/grouped-buttons';
interface props {
	handleDrawerToggle: any;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		appBar: {
			zIndex: theme.zIndex.drawer + 1,
		},
		menuButton: {
			marginRight: theme.spacing(2),
			[theme.breakpoints.up('sm')]: {
				display: 'none',
			},
		},
		toolbar: {
			paddingRight: 12, // keep right padding when drawer closed
		},
		title: {
			flexGrow: 12,
		},
	}),
);

const MyHeader = (props: props) => {
	const { t } = useTranslation();
	const { handleDrawerToggle } = props;
	const classes = useStyles();

	return (
		<AppBar position="fixed" className={classes.appBar}>
			<Toolbar className={classes.toolbar}>
				<IconButton
					color="inherit"
					aria-label="open drawer"
					edge="start"
					onClick={handleDrawerToggle}
					className={classes.menuButton}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					component="h1"
					variant="h6"
					color="inherit"
					noWrap
					className={classes.title}
				>
					{t('commons.header.title')}
				</Typography>
				<GroupedIcons />
			</Toolbar>
		</AppBar>
	);
};

export default MyHeader;
