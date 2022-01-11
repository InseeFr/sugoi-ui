import { Drawer } from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import SiderBody from './sider-body';

const drawerWidth = 240;

const useStyles = makeStyles(() =>
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
