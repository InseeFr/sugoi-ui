import {
	createStyles,
	Fab,
	makeStyles,
	Theme,
	useScrollTrigger,
	Zoom,
} from '@material-ui/core';
import React from 'react';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

interface props {
	/**
	 * Injected by the documentation to work in an iframe.
	 * You won't need it on your project.
	 */
	window?: () => Window;
	children: React.ReactElement;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			position: 'fixed',
			bottom: theme.spacing(2),
			right: theme.spacing(2),
		},
	}),
);

const ScrollTopUtils = (props: props) => {
	const { children, window } = props;
	const classes = useStyles();
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
			<div
				onClick={handleClick}
				role="presentation"
				className={classes.root}
			>
				{children}
			</div>
		</Zoom>
	);
};
const ScrollTop = () => {
	return (
		<ScrollTopUtils>
			<Fab
				color="secondary"
				size="small"
				aria-label="scroll back to top"
			>
				<KeyboardArrowUpIcon />
			</Fab>
		</ScrollTopUtils>
	);
};
export default ScrollTop;
