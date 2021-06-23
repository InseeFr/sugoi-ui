import {
	Card,
	CardContent,
	CardHeader,
	CircularProgress,
	Divider,
	List,
	ListItem,
	ListItemText,
} from '@material-ui/core';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useWhoAmI } from './../../hooks/api/whoami';

const CardRights = () => {
	const { t } = useTranslation();
	const { rights, loading } = useWhoAmI();

	return (
		<Card>
			<CardHeader title={t('home.rights.title')} />
			<Divider />
			<CardContent>
				{loading ? (
					<CircularProgress />
				) : (
					<List>
						{rights?.isAdmin && (
							<ListItem key="role-admin">
								<ListItemText
									key="role-admin-text"
									inset={true}
								>
									{t('home.rights.admin')}
								</ListItemText>
							</ListItem>
						)}
						{rights &&
							rights?.readerRealm.length > 0 &&
							rights?.readerRealm.map(
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
							)}

						{rights &&
							rights?.writerRealm.length > 0 &&
							rights?.writerRealm.map(
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
							)}
						{rights &&
							rights?.passwordRealm.length > 0 &&
							rights?.passwordRealm.map(
								(role: string) => (
									<ListItem
										key={
											'role-password-' +
											role
										}
									>
										<ListItemText
											key={
												'role-password-text-' +
												role
											}
											inset={true}
										>
											{t(
												'home.rights.password',
											) + role}
										</ListItemText>
									</ListItem>
								),
							)}
						{rights &&
							rights?.appManager.length > 0 &&
							rights?.appManager.map(
								(role: string) => (
									<ListItem
										key={
											'role-app-' +
											role
										}
									>
										<ListItemText
											key={
												'role-app-text-' +
												role
											}
											inset={true}
										>
											{t(
												'home.rights.app',
											) +
												role.replace(
													'*_*\\',
													'',
												)}
										</ListItemText>
									</ListItem>
								),
							)}
						{rights &&
							!rights?.isAdmin &&
							rights?.writerRealm.length === 0 &&
							rights?.readerRealm.length === 0 &&
							rights?.passwordRealm.length === 0 &&
							rights?.appManager.length === 0 && (
								<ListItem key={'no-rights'}>
									<ListItemText
										key={
											'no-rights-text'
										}
										inset={true}
									>
										{t(
											'home.rights.no_right',
										)}
									</ListItemText>
								</ListItem>
							)}
					</List>
				)}
			</CardContent>
		</Card>
	);
};

export default CardRights;
