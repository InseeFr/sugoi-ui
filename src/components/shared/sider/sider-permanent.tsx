import { Drawer } from '@mui/material';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
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
