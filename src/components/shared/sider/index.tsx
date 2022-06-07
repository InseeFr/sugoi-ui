import { Hidden } from '@mui/material';
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
			<Hidden smUp implementation="css">
				<SiderTemporary
					open={drawerOpen}
					handleDrawerToggle={handleDrawerToggle}
				/>
			</Hidden>

			<Hidden smDown implementation="css">
				<SiderPermanent />
			</Hidden>
		</>
	);
};

export default Sider;
