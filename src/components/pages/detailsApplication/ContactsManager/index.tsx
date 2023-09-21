import { usePutApplication } from 'src/lib/hooks/applications/usePutApplication';
import Application from 'src/lib/model/api/application';
import AttributesApplication from 'src/lib/model/api/attributesApplication';
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
	const [newValue, setNewValue] = React.useState<any>();
	const { t } = useTranslation();
	const { execute: executeUpdate } = usePutApplication();
	const maj = () => {
		if (application != undefined) {
			executeUpdate(realm, application).then(() =>
				getApplication(realm, application?.name),
			);
		}
	};

	const add = () => {
		if (newValue) {
			if (
				application?.attributes == undefined ||
				application?.attributes?.contacts == undefined
			) {
				if (application != undefined) {
					if (application.attributes == undefined) {
						application.attributes =
							{} as AttributesApplication;
					}
					application.attributes.contacts = [newValue];
				}
			} else {
				application?.attributes?.contacts?.push(newValue);
			}

			setNewValue(undefined);
		}
		maj();
	};

	const delet = (pos: number) => {
		application?.attributes?.contacts?.splice(pos, 1);
		maj();
	};
	return (
		<Grid item>
			<Grid
				container
				direction="column"
				justifyContent="center"
				alignItems="stretch"
				spacing={2}
			>
				<Grid item>
					<Title
						title={t(
							'detail_application.contacts_title',
						)}
						variant="subtitle1"
					/>
				</Grid>
				<Grid item>
					<Grid
						container
						direction="column"
						justifyContent="center"
						alignItems="stretch"
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
				<Grid item>
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
				<Grid item>
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
