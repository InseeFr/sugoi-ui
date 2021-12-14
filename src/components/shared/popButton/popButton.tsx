import { Button } from '@material-ui/core';
import React from 'react';
import SimpleDialog from './Dialog';

interface props {
	title: string;
	body: React.ReactNode;
	actions?: (params: any) => React.ReactNode;
	text: string;
	color?: 'primary' | 'secondary' | 'inherit' | 'default';
	variant?: 'contained' | 'outlined' | 'text';
	disabled?: boolean;
	open?: boolean;
}

const PopButton = ({
	text,
	title,
	body,
	actions,
	color,
	variant,
	disabled,
	open,
}: props) => {
	const [_open, setOpen] = React.useState(open || false);

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
			<Button
				onClick={handleOpen}
				color={color}
				variant={variant}
				disabled={disabled}
			>
				{text}
			</Button>
			<SimpleDialog
				onClose={handleClose}
				open={_open}
				title={title}
				body={body}
				actions={actions && actions(handleClose)}
			/>
		</>
	);
};

PopButton.defaultProps = {
	disabled: false,
	open: false,
};

export default PopButton;
