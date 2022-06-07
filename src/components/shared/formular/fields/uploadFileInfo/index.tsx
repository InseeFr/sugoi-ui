import { Box, Button, Grid, Link, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import EditIcon from '@mui/icons-material/Edit';
import { DropzoneArea } from 'react-mui-dropzone';
import { useState } from 'react';
import { Loader } from 'src/components/shared/loader/loader';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import PopIcon from 'src/components/shared/popIcon/popIcon';

interface Props {
	deleteAction: any;
	saveAction: (file: File) => Promise<void>;
	getAction: any;
	value: any;
	title: string;
	helpTextTitle: string;
	helpText: string;
	valuePresentText: string;
	valueAbsentText: string;
	acceptedFiles: string[];
	dropZoneText: string;
	loading: boolean;
	modifiable: boolean;
}

const UploadFile = ({
	title,
	helpText,
	helpTextTitle,
	value,
	valueAbsentText,
	valuePresentText,
	getAction,
	deleteAction,
	saveAction,
	acceptedFiles,
	dropZoneText,
	loading,
	modifiable,
}: Props) => {
	const [open, setOpen] = useState(false);

	const [files, setFiles] = useState<File[]>([]);

	return (
		<>
			<Grid container direction="column">
				<Grid item xs={12}>
					<Box
						sx={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<Typography align="right">
							{title}
						</Typography>
						<PopIcon
							helpTextTitle={helpTextTitle}
							helpText={helpText}
						/>
						{modifiable && (
							<IconButton
								color="primary"
								aria-label="upload file"
								size="small"
								onClick={() => setOpen(!open)}
							>
								<EditIcon />
							</IconButton>
						)}
					</Box>
				</Grid>
				<Grid item xs={12}>
					{loading ? (
						<Loader />
					) : (
						<Box
							sx={{
								display: 'flex',
								alignItems: 'center',
							}}
						>
							<Typography>
								{value ? (
									<Link
										href="#"
										onClick={() =>
											getAction()
										}
									>
										{valuePresentText}
									</Link>
								) : (
									valueAbsentText
								)}
							</Typography>
							{modifiable && (
								<IconButton
									color="secondary"
									aria-label="upload file"
									size="small"
									onClick={() =>
										deleteAction()
									}
									disabled={
										value ? false : true
									}
								>
									<DeleteForeverIcon />
								</IconButton>
							)}
						</Box>
					)}
				</Grid>
			</Grid>
			<SimpleDialog
				title="Upload file"
				open={open}
				onClose={() => setOpen(false)}
				body={
					<>
						<DropzoneArea
							acceptedFiles={acceptedFiles}
							dropzoneText={dropZoneText}
							onChange={(files) => setFiles(files)}
							filesLimit={1}
							clearOnUnmount={false}
							disableRejectionFeedback={true}
						/>
					</>
				}
				actions={
					<Button
						color="primary"
						variant="contained"
						onClick={() =>
							saveAction(files[0]).finally(() =>
								setOpen(false),
							)
						}
					>
						Enregistrer
					</Button>
				}
				maxwidth={'md'}
			/>
		</>
	);
};

UploadFile.defaultProps = {
	title: 'Upload file',
	dropZoneText: 'Drag and drop your file here',
	helpText: '',
	helpTextTitle: '',
	valueAbsentText: 'No file to download',
	valuePresentText: 'Click to download file',
};

export default UploadFile;
