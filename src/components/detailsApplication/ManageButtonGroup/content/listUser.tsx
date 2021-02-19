import { Grid } from '@material-ui/core';
import React from 'react';
import { Group } from '../../../../model/api/group';
import User from '../../../../model/api/user';
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
			justify="center"
			alignItems="stretch"
			spacing={1}
		>
			{group?.users?.map((user: User) => (
				<Grid item>
					<ChipPerson realm={realm} user={user} />
				</Grid>
			))}
		</Grid>
	);
};
