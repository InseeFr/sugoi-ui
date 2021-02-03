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
import { useTranslation } from 'react-i18next';

const CardRights = () => {
	const user = useSelector((state: RootState) => state.user);
	const { t } = useTranslation();

	return (
		<Card>
			<CardHeader title={t('home.rights.title')} />
			<Divider />
			<CardContent>
				<List>
					{user.role.isAdmin ? (
						<ListItem key="role-admin">
							<ListItemText
								key="role-admin-text"
								inset={true}
							>
								{t('home.rights.admin')}
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
											{t(
												'home.rights.reader',
											) + role}
										</ListItemText>
									</ListItem>
								),
						  )
						: null}
					{user.role.isWriter
						? user.role.writerDomains.map(
								(role: string) => (
									<ListItem
										key={
											'role-writer-' +
											role
										}
									>
										<ListItemText
											key={
												'role-writer-text-' +
												role
											}
											inset={true}
										>
											{t(
												'home.rights.writer',
											) + role}
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
								{t('home.rights.no_right')}
							</ListItemText>
						</ListItem>
					) : null}
				</List>
			</CardContent>
		</Card>
	);
};

export default CardRights;
