import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import { DialogActions, DialogContent } from '@material-ui/core';
import DialogTitle from './DialogTitle';

export interface SimpleDialogProps {
	open: boolean;
	onClose: any;
	title?: string;
	body?: React.ReactNode;
	actions?: React.ReactNode;
}

const SimpleDialog = ({
	title,
	body,
	actions,
	open,
	onClose,
}: SimpleDialogProps) => {
	return (
		<Dialog
			onClose={onClose}
			aria-labelledby="simple-dialog-title"
			open={open}
			maxWidth="xl"
		>
			<DialogTitle title={title} onClose={onClose} />
			<DialogContent dividers>{body}</DialogContent>
			<DialogActions>{actions}</DialogActions>
		</Dialog>
	);
};

export default SimpleDialog;
