import { usePutApplication } from 'src/lib/hooks/applications/usePutApplication';
import Application from 'src/lib/model/api/application';
import {
	Grid,
	TextField,
	IconButton,
	ListItem,
	ListItemText,
	List,
	Button,
	ListItemSecondaryAction,
} from '@mui/material';
import Title from 'src/components/shared/title/title';
import DeleteIcon from '@mui/icons-material/Delete';
import PopIcon from 'src/components/shared/popIcon/popIcon';
import React from 'react';
import { useTranslation } from 'react-i18next';

export const ContactsManager = ({
	application,
	realm,
	getApplication,
}: {
	application?: Application;
	realm: string;
	getApplication: (realm: string, name: string) => Promise<void>;
}) => {
	const [newValue, setNewValue] = React.useState<string>();
	const { t } = useTranslation();
	const { execute: executeUpdate } = usePutApplication();

	const add = () => {
		if (newValue && application) {
			const applicationUpdated: Application = {
				...application,
				attributes: {
					...(application.attributes ?? {}),
					contacts: [
						...(application.attributes?.contacts ?? []),
						newValue,
					],
				},
			};
			executeUpdate(realm, applicationUpdated).then(() => {
				(getApplication(realm, applicationUpdated?.name),
					setNewValue(undefined));
			});
		}
	};

	const delet = (pos: number) => {
		if (
			application &&
			application.attributes &&
			application.attributes.contacts
		) {
			const applicationUpdated: Application = {
				...application,
				attributes: {
					...application.attributes,
					contacts: application.attributes.contacts.filter(
						(_, i) => i !== pos,
					),
				},
			};

			executeUpdate(realm, applicationUpdated).then(() =>
				getApplication(realm, applicationUpdated?.name),
			);
		}
	};
	return (
		<Grid>
			<Grid container sx={{ flexDirection: 'column' }} spacing={2}>
				<Grid>
					<Title
						title={t(
							'detail_application.contacts_title',
						)}
						variant="subtitle1"
					/>
				</Grid>
				<Grid>
					<Grid
						container
						sx={{ flexDirection: 'column' }}
						spacing={1}
					>
						<List dense={true}>
							{application?.attributes?.contacts?.map(
								(contact: string, i: any) => (
									<ListItem
										disableGutters
										key={
											'contacts' +
											{
												i,
											}
										}
									>
										<ListItemText
											primary={
												contact
											}
										/>
										<ListItemSecondaryAction>
											<IconButton
												edge="end"
												aria-label="delete"
												onClick={() =>
													delet(
														i,
													)
												}
											>
												<DeleteIcon />
											</IconButton>
										</ListItemSecondaryAction>
									</ListItem>
								),
							)}
						</List>
					</Grid>
				</Grid>
				<Grid>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
						}}
					>
						<TextField
							variant="outlined"
							label="nouvel attribut"
							name="nouvelAttribut"
							value={newValue || ''}
							fullWidth
							onChange={(e) =>
								setNewValue(e.target.value)
							}
						/>
						<PopIcon
							helpTextTitle="ajouter un nouvel attribut"
							helpText="ajouter un nouvel attribut"
						/>
					</div>
				</Grid>
				<Grid>
					<Button
						variant="contained"
						color="primary"
						style={{ float: 'right' }}
						onClick={add}
					>
						Ajouter
					</Button>
				</Grid>
			</Grid>
		</Grid>
	);
};
