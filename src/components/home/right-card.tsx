import React from 'react';
import {
	Card,
	CardContent,
	CardHeader,
	Divider,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import { RootState } from '../../configuration/store-configuration';
import { useSelector } from 'react-redux';

const CardRights = () => {
	const user = useSelector((state: RootState) => state.user);
	return (
		<Card>
			<CardHeader title="Mes droits" />
			<Divider />
			<CardContent>
				<List>
					{user.role.isAdmin ? (
						<ListItem key="role-admin">
							<ListItemText
								key="role-admin-text"
								inset={true}
							>
								"Administrateur"
							</ListItemText>
						</ListItem>
					) : null}
					{user.role.isReader
						? user.role.readerDomains.map(
								(role: string) => (
									<ListItem
										key={
											'role-reader-' +
											role
										}
									>
										<ListItemText
											key={
												'role-reader-text-' +
												role
											}
											inset={true}
										>
											{'Consultant dans le domaine ' +
												role}
										</ListItemText>
									</ListItem>
								),
						  )
						: null}
					{!user.role.isAdmin &&
					!user.role.isReader &&
					!user.role.isWriter ? (
						<ListItem key={'no-rights'}>
							<ListItemText
								key={'no-rights-text'}
								inset={true}
							>
								{'Aucun droit'}
							</ListItemText>
						</ListItem>
					) : null}
				</List>
			</CardContent>
		</Card>
	);
};

export default CardRights;
