import { createStyles, Drawer, makeStyles, useTheme } from '@material-ui/core';
import SiderBody from './sider-body';

interface props {
	open: boolean;
	handleDrawerToggle: any;
}

const useStyles = makeStyles(() =>
	createStyles({
		drawerPaper: {
			width: 240,
		},
	}),
);

const SiderTemporary = (props: props) => {
	const { open, handleDrawerToggle } = props;
	const classes = useStyles();
	const theme = useTheme();

	return (
		<Drawer
			variant="temporary"
			anchor={theme.direction === 'rtl' ? 'right' : 'left'}
			open={open}
			onClose={handleDrawerToggle}
			classes={{
				paper: classes.drawerPaper,
			}}
			ModalProps={{
				keepMounted: true, // Better open performance on mobile.
			}}
		>
			<SiderBody />
		</Drawer>
	);
};

export default SiderTemporary;
