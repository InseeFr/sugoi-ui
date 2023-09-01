import {
	FormControlLabel,
	FormGroup,
	IconButton,
	Switch,
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
}

export const ButtonManageGroupSettings = ({
	realm,
	group,
	applicationName,
}: Props) => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const [enabledSelfManagedGroup, setEnabledSelfManagedGroup] = useState(
		group.isSelfManaged,
	);
	const { execute: updateGroup } = useUpdateGroup();

	const handleChangeSelfManagedGroup = (
		_event: React.ChangeEvent<HTMLInputElement>,
	) => {
		updateGroup(realm, applicationName, {
			...group,
			isSelfManaged: !enabledSelfManagedGroup,
		});
		setEnabledSelfManagedGroup(!enabledSelfManagedGroup);
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
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};

export default ButtonManageGroupSettings;
