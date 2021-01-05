import { Button } from '@material-ui/core';
import React from 'react';
import SimpleDialog from './Dialog';

interface props {
	title: string;
	body: React.ReactNode;
	actions?: React.ReactNode;
	text: string;
	color?: 'primary' | 'secondary' | 'inherit' | 'default';
	variant?: 'contained' | 'outlined' | 'text';
}

const PopButton = ({ text, title, body, actions, color, variant }: props) => {
	const [open, setOpen] = React.useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};
	if (!color) color = 'primary';
	if (!variant) variant = 'text';
	return (
		<>
			<Button onClick={handleOpen} color={color} variant={variant}>
				{text}
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={title}
				body={body}
				actions={actions}
			/>
		</>
	);
};

export default PopButton;
