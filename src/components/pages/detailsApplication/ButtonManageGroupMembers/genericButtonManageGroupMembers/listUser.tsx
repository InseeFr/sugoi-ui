import { Grid, IconButton, Tooltip } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Title from 'src/components/shared/title/title';
import { Group } from 'src/lib/model/api/group';
import User from 'src/lib/model/api/user';
import { ChipAccount } from '../../chip';
import { ContentCopy } from '@mui/icons-material';
import { useSnackbar } from 'notistack';
interface Props {
	group: Group;
	realm: string;
	handleDeleteUser: (username: string) => void;
}

export const GroupListUsers = ({ group, realm, handleDeleteUser }: Props) => {
	const { t } = useTranslation();
	const { enqueueSnackbar } = useSnackbar();
	const handleCopy = () => {
		navigator.clipboard
			.writeText(
				group.users.map((user) => user.username).join('\n'),
			)
			.then(() => {
				enqueueSnackbar(
					t(
						'detail_application.manage_group_popup.copy_info',
					),
					{
						variant: 'info',
					},
				);
			});
	};
	return (
		<Grid container>
			<Grid
				container
				item
				justifyContent="space-between"
				alignItems="center"
			>
				<Title
					title={t(
						'detail_application.manage_group_popup.group_members',
					)}
					variant="body1"
				/>
				<Tooltip
					title={t(
						'detail_application.manage_group_popup.copy_tooltip',
					)}
					placement="top"
				>
					<IconButton
						color="primary"
						onClick={handleCopy}
						aria-label="copy"
					>
						<ContentCopy />
					</IconButton>
				</Tooltip>
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justifyContent="center"
					alignItems="stretch"
					spacing={1}
				>
					{group?.users?.map((user: User, i: number) => (
						<Grid
							item
							key={
								'group_' +
								group.name +
								'_user_' +
								i
							}
						>
							<ChipAccount
								realm={realm}
								username={user.username!}
								key={
									'group_' +
									group.name +
									'_user_' +
									i
								}
								handleDeleteUser={
									handleDeleteUser
								}
							/>
						</Grid>
					))}
				</Grid>
			</Grid>
		</Grid>
	);
};
