import { Grid } from '@material-ui/core';
import { Group } from 'src/lib/model/api/group';
import User from 'src/lib/model/api/user';
import { ChipPerson } from '../../chip';
interface Props {
	group: Group;
	realm: string;
}

export const GroupListUsers = ({ group, realm }: Props) => {
	return (
		<Grid
			container
			direction="row"
			justifyContent="center"
			alignItems="stretch"
			spacing={1}
		>
			{group?.users?.map((user: User, i: number) => (
				<Grid item key={i}>
					<ChipPerson
						realm={realm}
						user={user}
						key={'group_' + group.name + '_user_' + i}
					/>
				</Grid>
			))}
		</Grid>
	);
};
