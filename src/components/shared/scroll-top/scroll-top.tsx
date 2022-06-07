import React from 'react';
import { Fab, useScrollTrigger, Zoom, Box, useTheme } from '@mui/material';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { useTranslation } from 'react-i18next';

interface props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children: React.ReactElement;
}

const ScrollTopUtils = (props: props) => {
	const theme = useTheme();
	const { children, window } = props;
	// Note that you normally won't need to set the window ref as useScrollTrigger
	// will default to window.
	// This is only being set here because the demo is in an iframe.
	const trigger = useScrollTrigger({
		target: window ? window() : undefined,
		disableHysteresis: true,
		threshold: 100,
	});

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		const anchor = (
			(event.target as HTMLDivElement).ownerDocument || document
		).querySelector('#back-to-top-anchor');

		if (anchor) {
			anchor.scrollIntoView({
				behavior: 'smooth',
				block: 'center',
			});
		}
	};

	return (
		<Zoom in={trigger}>
			<Box
				onClick={handleClick}
				role="presentation"
				sx={{
					position: 'fixed',
					bottom: theme.spacing(2),
					right: theme.spacing(2),
				}}
			>
				{children}
			</Box>
		</Zoom>
	);
};
const ScrollTop = () => {
	const { t } = useTranslation();
	return (
		<ScrollTopUtils>
			<Fab
				color="secondary"
				size="small"
				aria-label="scroll back to top"
				title={t('commons.back_to_top.text')}
			>
				<KeyboardArrowUpIcon />
			</Fab>
		</ScrollTopUtils>
	);
};
export default ScrollTop;
