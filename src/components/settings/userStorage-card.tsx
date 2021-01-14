import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
} from '@material-ui/core';
import { Realm } from '../../model/api/realm';
import { UserStorage } from '../../model/api/userStorage';

interface props {
	userStorage: UserStorage;
	realm: Realm;
}

const UserStorageCard = ({ realm, userStorage }: props) => {
	return (
		<Card variant="outlined">
			<CardHeader
				title={
					userStorage.name
						? 'UserStorage ' + userStorage.name
						: 'UserStorage ' + realm.name
				}
			/>
			<Divider />
			<CardContent>
				<Grid
					container
					direction="column"
					justify="space-between"
					alignItems="stretch"
					spacing={2}
				>
					<Grid item>
						<TextField
							label="branche contact"
							id="userStorage-user-branch"
							defaultValue={userStorage.userBranch}
							variant="filled"
							size="small"
							disabled
							fullWidth
						/>
					</Grid>
					<Grid item>
						<TextField
							label="branche organisation"
							id="userStorage-oragnization-branch"
							defaultValue={
								userStorage.organizationBranch
							}
							variant="filled"
							size="small"
							disabled
							fullWidth
						/>
					</Grid>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default UserStorageCard;
