import { Grid, IconButton } from '@material-ui/core';
import SettingsIcon from '@material-ui/icons/Settings';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import useAddUserToGroup from '../../../../hooks/group/useAddUserToGroup';
import useDeleteUserFromGroup from '../../../../hooks/group/useDeleteUserFromGroup';
import { useGetGroup } from '../../../../hooks/group/useGetGroup';
import { Group } from '../../../../model/api/group';
import SimpleDialog from '../../../commons/popButton/Dialog';
import { AddUsers } from './addUser';
import { GroupListUsers } from './listUser';

interface Props {
	realm: string;
	group: Group;
	handleAddUserToGroup: () => void;
	handleDeleteUserFromGroup: () => void;
	onClose: () => Promise<void>;
}

export const GenericButtonManageGroup = ({
	realm,
	onClose,
	handleAddUserToGroup,
	handleDeleteUserFromGroup,
	group,
}: Props) => {
	const [open, setOpen] = useState(false);
	const { t } = useTranslation();

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		onClose().finally(() => setOpen(false));
	};

	return (
		<>
			<IconButton
				aria-label="Add"
				size="small"
				onClick={handleOpen}
			>
				<SettingsIcon color="primary" fontSize="small" />
			</IconButton>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={t('detail_application.button_manage_group')}
				body={
					<Grid container direction="row">
						<Grid item xs={12} md={6}>
							<AddUsers
								realm={realm}
								group={group as Group}
								handleAddUser={handleAddUserToGroup()}
								handleDeleteUser={handleDeleteUserFromGroup()}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<GroupListUsers
								realm={realm}
								group={group as Group}
							/>
						</Grid>
					</Grid>
				}
				fullwidth
				maxwidth="md"
			/>
		</>
	);
};

export default GenericButtonManageGroup;
