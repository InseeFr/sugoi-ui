import { Drawer } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import SiderBody from './sider-body';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
		},
		drawerPaper: {
			width: drawerWidth,
		},
	}),
);

const SiderPermanent = () => {
	const classes = useStyles();

	return (
		<Drawer
			className={classes.drawer}
			variant="permanent"
			classes={{
				paper: classes.drawerPaper,
			}}
			open
		>
			<SiderBody />
		</Drawer>
	);
};
export default SiderPermanent;
