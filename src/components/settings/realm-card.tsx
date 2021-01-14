import React from 'react';
import {
	Button,
	CardContent,
	Card,
	CardActions,
	CardHeader,
	Divider,
	TextField,
	Grid,
} from '@material-ui/core';
import { Realm } from '../../model/api/realm';
import UserStorageCard from './userStorage-card';

interface props {
	realm: Realm;
}

const RealmCard = ({ realm }: props) => {
	return (
		<Card variant="outlined">
			<CardHeader title={'Realm ' + realm.name} />
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
							label="realm url"
							id="realm-url"
							defaultValue={realm.url}
							variant="filled"
							size="small"
							disabled
							fullWidth
						/>
					</Grid>
					<Grid item>
						<TextField
							label="branche applicative"
							id="app-branch"
							defaultValue={
								realm.appBranch
									? realm.appBranch
									: 'none'
							}
							variant="filled"
							size="small"
							disabled
							fullWidth
						/>
					</Grid>
					{realm.userStorages.map((us) => (
						<Grid item>
							<UserStorageCard
								realm={realm}
								userStorage={us}
							/>
						</Grid>
					))}
				</Grid>
			</CardContent>
			<CardActions>
				<Button size="small">Learn More</Button>
			</CardActions>
		</Card>
	);
};

export default RealmCard;
