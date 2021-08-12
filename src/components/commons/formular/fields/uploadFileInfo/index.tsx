import { Button, Grid, Link, Typography } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import { DropzoneArea } from 'material-ui-dropzone';
import { useState } from 'react';
import { download } from '../../../../../utils/downloadFile';
import SimpleDialog from '../../../popButton/Dialog';
import PopIcon from '../../../popIcon/popIcon';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import { Loader } from '../../../loader/loader';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
			alignItems: 'center',
		},
	}),
);

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
	const classes = useStyles();
	const [open, setOpen] = useState(false);

	const [files, setFiles] = useState<File[]>([]);

	return (
		<>
			<Grid container direction="column">
				<Grid item xs={12}>
					<div className={classes.root}>
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
					</div>
				</Grid>
				<Grid item xs={12}>
					{loading ? (
						<Loader />
					) : (
						<div className={classes.root}>
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
						</div>
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
