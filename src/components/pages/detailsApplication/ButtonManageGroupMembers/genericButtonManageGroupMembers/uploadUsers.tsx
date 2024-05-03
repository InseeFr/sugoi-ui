import { Grid, TextField, Tooltip, IconButton } from '@mui/material';
import { useState } from 'react';
import { Upload } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
import Title from 'src/components/shared/title/title';
import { useTranslation } from 'react-i18next';

export const UploadUsers = ({
	uploadUserCall,
}: {
	uploadUserCall: (username: string) => void;
}) => {
	const { enqueueSnackbar } = useSnackbar();
	const { t } = useTranslation();

	const [usernamesContent, setUsernamesContent] = useState('');

	const handleInputChange = (
		event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setUsernamesContent(event.target.value);
	};

	const handleUpload = () => {
		const usernames: string[] = usernamesContent.split('\n');
		for (const username of usernames) {
			if (!/^[a-zA-Z0-9_-]+$/.test(username.trim())) {
				enqueueSnackbar(
					t(
						'detail_application.manage_group_popup.upload.error',
					),
					{ variant: 'error' },
				);
				return;
			}
		}
		for (const username of usernames) {
			uploadUserCall(username.trim());
		}
	};

	return (
		<Grid item container alignItems={'center'} spacing={1}>
			<Grid item xs={12}>
				<Title
					title={t(
						'detail_application.manage_group_popup.upload.title',
					)}
				/>
			</Grid>
			<Grid item xs={10}>
				<TextField
					fullWidth
					label={t(
						'detail_application.manage_group_popup.upload.textfield',
					)}
					variant="outlined"
					multiline
					rows={10}
					value={usernamesContent}
					onChange={handleInputChange}
				/>
			</Grid>
			<Grid item xs={2}>
				<Tooltip
					title={t(
						'detail_application.manage_group_popup.upload.tooltip',
					)}
					placement="top"
				>
					<IconButton
						color="primary"
						onClick={handleUpload}
					>
						<Upload />
					</IconButton>
				</Tooltip>
			</Grid>
		</Grid>
	);
};
