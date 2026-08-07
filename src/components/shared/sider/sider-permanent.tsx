import { Drawer } from '@mui/material';
import SiderBody from './sider-body';

const drawerWidth = 240;

const SiderPermanent = () => {
	return (
		<Drawer
			sx={{ width: drawerWidth, flexShrink: 0 }}
			slotProps={{
				paper: {
					sx: { width: drawerWidth },
				},
			}}
			variant="permanent"
			open
		>
			<SiderBody />
		</Drawer>
	);
};
export default SiderPermanent;
