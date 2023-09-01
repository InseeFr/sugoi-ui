import { Box, DialogTitle as Muidialog } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';

export interface DialogTitleProps {
	title?: string;
	onClose?: () => void;
}

const DialogTitle = (props: DialogTitleProps) => {
	const { title, onClose, ...other } = props;
	return (
		<Muidialog {...other}>
			<Box
				display="flex"
				alignItems="center"
				justifyContent="space-between"
			>
				<Typography>{title}</Typography>
				{onClose ? (
					<IconButton
						aria-label="close"
						onClick={onClose}
						size="large"
					>
						<CloseIcon />
					</IconButton>
				) : null}
			</Box>
		</Muidialog>
	);
};

export default DialogTitle;
