import {
	Box,
	Divider,
	FormControlLabel,
	Link,
	Switch,
	Typography,
} from '@material-ui/core';
import React from 'react';
import './footer.scss';
import { ThemeButton } from './theme-button';

const Footer = () => (
	<Box pt={4}>
		<Divider variant="middle" />
		<Box pt={4}>
			<Typography
				variant="body2"
				color="textSecondary"
				align="center"
			>
				{'Copyright © '}
				<Link color="inherit" href="https://material-ui.com/">
					Your Website
				</Link>
				{new Date().getFullYear()}
			</Typography>
		</Box>
		<ThemeButton />
	</Box>
);

export default Footer;
