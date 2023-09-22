import { Grid } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Title from 'src/components/shared/title/title';
import { Group } from 'src/lib/model/api/group';
import User from 'src/lib/model/api/user';
import { ChipAccount } from '../../chip';
interface Props {
	group: Group;
	realm: string;
	handleDeleteUser: (username: string) => void;
}

export const GroupListUsers = ({ group, realm, handleDeleteUser }: Props) => {
	const { t } = useTranslation();
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="stretch"
			spacing={2}
		>
			<Grid item xs={12}>
				<Title
					title={t(
						'detail_application.manage_group_popup.group_members',
					)}
					variant="body1"
				/>
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
