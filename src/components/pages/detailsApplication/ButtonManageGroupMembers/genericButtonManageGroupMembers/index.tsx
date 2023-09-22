import { Grid, IconButton, Tooltip } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import SimpleDialog from 'src/components/shared/popButton/Dialog';
import { Group } from 'src/lib/model/api/group';
import { AddUsers } from './addUser';
import { GroupListUsers } from './listUser';

interface Props {
	realm: string;
	group: Group | undefined;
	handleAddUserToGroup: () => void;
	handleDeleteUserFromGroup: (username: string) => void;
	onClose: () => Promise<void>;
}

export const GenericButtonManageGroupMembers = ({
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
			<Tooltip
				title={t(
					'detail_application.button_manage_group_members',
				)}
			>
				<IconButton
					aria-label="Add"
					size="small"
					onClick={handleOpen}
				>
					<PersonIcon color="primary" fontSize="small" />
				</IconButton>
			</Tooltip>
			<SimpleDialog
				onClose={handleClose}
				open={open}
				title={
					t(
						'detail_application.button_manage_group_members',
					) + group?.name
				}
				body={
					<Grid container direction="row" spacing={2}>
						<Grid item xs={12} md={6}>
							<AddUsers
								realm={realm}
								group={group as Group}
								handleAddUser={handleAddUserToGroup()}
								handleDeleteUser={
									handleDeleteUserFromGroup
								}
							/>
						</Grid>
						<Grid item xs={12} md={6}>
							<GroupListUsers
								realm={realm}
								group={group as Group}
								handleDeleteUser={
									handleDeleteUserFromGroup
								}
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

export default GenericButtonManageGroupMembers;
