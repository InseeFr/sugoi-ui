import {
	Button,
	FormControlLabel,
	FormGroup,
	Grid,
	IconButton,
	Switch,
	TextField,
	Tooltip,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import { Group } from 'src/lib/model/api/group';
import { useUpdateGroup } from 'src/lib/hooks/group';

interface Props {
	realm: string;
	group: Group;
	applicationName: string;
	refreshGroup: () => void;
}

export const ButtonManageGroupSettings = ({
	realm,
	group,
	applicationName,
	refreshGroup,
}: Props) => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const [enabledSelfManagedGroup, setEnabledSelfManagedGroup] = useState(
		group.isSelfManaged,
	);
	const [description, setDescription] = useState(group.description);
	const { execute: updateGroup } = useUpdateGroup();

	const handleChangeSelfManagedGroup = (
		_event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setEnabledSelfManagedGroup(!enabledSelfManagedGroup);
	};

	const handleChangeDescription = (
		_event: React.ChangeEvent<HTMLInputElement>,
	) => {
		setDescription(_event.target.value);
	};

	const handleSubmit = () => {
		updateGroup(realm, applicationName, {
			...group,
			isSelfManaged: enabledSelfManagedGroup,
			description: description,
		}).finally(refreshGroup);
		setOpen(false);
	};

	return (
		<>
			<Tooltip
				title={t(
					'detail_application.button_manage_group_settings.title',
				)}
			>
				<IconButton
					aria-label="Add"
					size="small"
					onClick={() => setOpen(true)}
				>
					<SettingsIcon color="primary" fontSize="small" />
				</IconButton>
			</Tooltip>
			<SimpleDialog
				onClose={() => setOpen(false)}
				open={open}
				title={
					t(
						'detail_application.button_manage_group_settings.title',
					) + group.name
				}
				body={
					<Grid container>
						<Grid container flexDirection={'column'}>
							<Grid item xs>
								<TextField
									label={t(
										'detail_application.button_manage_group_settings.description',
									)}
									value={description}
									onChange={
										handleChangeDescription
									}
									fullWidth
								/>
							</Grid>
							<Grid item xs>
								<FormGroup>
									<FormControlLabel
										control={
											<Switch
												checked={
													enabledSelfManagedGroup ??
													false
												}
												name="selfmanaged-toggle"
												color="primary"
												onChange={
													handleChangeSelfManagedGroup
												}
											/>
										}
										label={t(
											'detail_application.button_manage_group_settings.selfmanaged',
										)}
									/>
								</FormGroup>
							</Grid>
						</Grid>
						<Grid
							container
							item
							justifyContent="center"
						>
							<Button
								type="submit"
								variant="contained"
								color="primary"
								onClick={handleSubmit}
							>
								{t(
									'detail_application.button_manage_group_settings.submit',
								)}
							</Button>
						</Grid>
					</Grid>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};

export default ButtonManageGroupSettings;
