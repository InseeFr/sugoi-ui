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
import D from './../../i18n';

const CardRights = () => {
	const user = useSelector((state: RootState) => state.user);
	return (
		<Card>
			<CardHeader title={D.right_card_title} />
			<Divider />
			<CardContent>
				<List>
					{user.role.isAdmin ? (
						<ListItem key="role-admin">
							<ListItemText
								key="role-admin-text"
								inset={true}
							>
								{D.right_card_administrator}
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
											{D.right_card_reader +
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
								{D.right_card_norights}
							</ListItemText>
						</ListItem>
					) : null}
				</List>
			</CardContent>
		</Card>
	);
};

export default CardRights;
