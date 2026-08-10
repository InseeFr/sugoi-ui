import { Box } from '@mui/material';
import SiderPermanent from './sider-permanent';
import SiderTemporary from './sider-temporary';

interface props {
	drawerOpen: boolean;
	handleDrawerToggle: any;
}

export const Sider = (props: props) => {
	const { drawerOpen, handleDrawerToggle } = props;
	return (
		<>
			<Box sx={{ display: { xs: 'block', sm: 'none' } }}>
				<SiderTemporary
					open={drawerOpen}
					handleDrawerToggle={handleDrawerToggle}
				/>
			</Box>

			<Box sx={{ display: { xs: 'none', sm: 'block' } }}>
				<SiderPermanent />
			</Box>
		</>
	);
};

export default Sider;
