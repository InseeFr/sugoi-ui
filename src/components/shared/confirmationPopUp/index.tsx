import {
	Box,
	Button,
	Grid,
	TextField,
	Typography,
	useTheme,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import WarningIcon from '@material-ui/icons/Warning';

interface Props {
	title: string;
	body1: string;
	body2: string;
	bodyBold: string;
	Icon: JSX.Element;
	validation_text: string;
	handleDelete: () => Promise<void>;
}

const ConfirmationPopup = ({
	Icon,
	validation_text,
	handleDelete,
	title,
	body1,
	body2,
	bodyBold,
}: Props) => {
	const [text, setText] = useState('');
	const [open, setOpen] = useState(false);
	const [error, setError] = useState(false);
	const [colorAlert, setColorAlert] = useState('#fcf1ef');
	const [colorHighlight, setColorHightlight] = useState('');
	const theme = useTheme();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	const handleConfirmDelete = () => {
		if (text === validation_text) {
			handleDelete().then(() => handleClose());
		} else {
			setError(true);
		}
	};

	useEffect(() => {
		if (theme.palette.type === 'light') {
			setColorAlert('#fcf1ef');
			setColorHightlight('#f0f0f0');
		} else {
			setColorAlert('#660e00');
			setColorHightlight('#303030');
		}
	}, [theme.palette.type]);

	return (
		<>
			<div onClick={handleOpen} style={{ display: 'inline' }}>
				{Icon}
			</div>
			<SimpleDialog
				onClose={handleClose}
				maxwidth="sm"
				open={open}
				title={title}
				body={
					<Grid container spacing={2} direction="column">
						<Grid item>
							<Box
								style={{
									backgroundColor:
										colorAlert,
								}}
							>
								<div
									style={{
										display: 'flex',
										alignItems:
											'center',
									}}
								>
									{
										<WarningIcon color="error" />
									}
									<Typography
										variant="body1"
										style={{
											fontWeight: 600,
										}}
										display="inline"
									>
										{body1}
									</Typography>
								</div>
								<Typography display="inline">
									{body2}
								</Typography>
								<Typography
									display="inline"
									style={{
										fontWeight: 600,
									}}
								>
									{bodyBold}
								</Typography>
							</Box>
						</Grid>
						<Grid item>
							<Typography
								variant="body1"
								gutterBottom
							>
								Veuillez entrer le texte suivant
								pour confirmer:
							</Typography>
							<Box>
								<span
									style={{
										backgroundColor:
											colorHighlight,
										borderRadius: '4px',
										padding: '2px 4px',
									}}
								>
									{validation_text}
								</span>
							</Box>
						</Grid>
						<Grid item>
							<TextField
								id="validation-entry-field"
								variant="outlined"
								error={error}
								fullWidth
								onChange={(e) =>
									setText(e.target.value)
								}
							/>
							{error && (
								<Typography
									variant="body1"
									gutterBottom
									color="error"
								>
									Le texte ne corresponds
									pas
								</Typography>
							)}
						</Grid>
					</Grid>
				}
				actions={
					<Button
						color="secondary"
						onClick={() => handleConfirmDelete()}
					>
						Confirmer
					</Button>
				}
			/>
		</>
	);
};

export default ConfirmationPopup;
