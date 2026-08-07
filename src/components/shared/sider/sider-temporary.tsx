import { Drawer, useTheme } from '@mui/material';
import SiderBody from './sider-body';

interface props {
	open: boolean;
	handleDrawerToggle: any;
}

const SiderTemporary = (props: props) => {
	const { open, handleDrawerToggle } = props;
	const theme = useTheme();

	return (
		<Drawer
			variant="temporary"
			anchor={theme.direction === 'rtl' ? 'right' : 'left'}
			open={open}
			onClose={handleDrawerToggle}
			slotProps={{
				paper: {
					sx: { width: 240 },
				},
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
