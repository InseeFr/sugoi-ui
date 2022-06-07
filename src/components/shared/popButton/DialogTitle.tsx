import React from 'react';
import { DialogTitle as Muidialog, useTheme } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export interface DialogTitleProps {
	title?: string;
	onClose?: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
	const theme = useTheme();
	const { title, onClose, ...other } = props;
	return (
		<Muidialog
			{...other}
			sx={{
				margin: '0',
				padding: theme.spacing(2),
			}}
		>
			<Typography variant="h6">{title}</Typography>
			{onClose ? (
				<IconButton
					aria-label="close"
					sx={{
						position: 'absolute',
						right: theme.spacing(1),
						top: theme.spacing(1),
						color: theme.palette.grey[500],
					}}
					onClick={onClose}
					size="large"
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</Muidialog>
	);
};

export default DialogTitle;
