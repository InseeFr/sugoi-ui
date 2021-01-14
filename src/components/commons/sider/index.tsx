import React from 'react';
import { Hidden } from '@material-ui/core';
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

			<Hidden xsDown implementation="css">
				<SiderPermanent />
			</Hidden>
		</>
	);
};

export default Sider;
