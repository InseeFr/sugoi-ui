import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		wrapper: {
			position: 'relative',
		},
		buttonProgress: {
			color: theme.palette.primary.main,
			position: 'absolute',
			top: '50%',
			left: '50%',
			marginTop: -12,
			marginLeft: -12,
		},
	}),
);

interface props {
	children: any;
	handleClick?: () => void;
	loading: boolean;
	error?: any;
	variant?: 'text' | 'outlined' | 'contained' | undefined;
	color?: 'inherit' | 'primary' | 'secondary' | 'default' | undefined;
}

export default function LoadingButton({
	children,
	handleClick,
	loading,
	error,
	variant,
	color,
}: props) {
	const classes = useStyles();

	return (
		<div className={classes.wrapper}>
			<Button
				variant={variant}
				color={color}
				disabled={loading}
				onClick={handleClick}
			>
				{children}
			</Button>
			{loading && (
				<CircularProgress
					size={24}
					className={classes.buttonProgress}
				/>
			)}
		</div>
	);
}
