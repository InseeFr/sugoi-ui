import { Grid, Paper, Tab, Tabs } from '@mui/material';
import React from 'react';
import GenerateFields from 'src/components/shared/formular/fields/utils';
import Panel from 'src/components/shared/panel/panel';
import { ErrorField, Field } from 'src/lib/model/field';
import { extractFieldAndAddError } from 'src/lib/utils/form_utils';
import ResetPasswordPopup from '../resetPasswordPopup';
import SendUsernamePopup from '../sendUsernamePopup';
import { ContentPanel } from './commons';
import MainPanel from './mainPanel';

interface Props {
	data: any;
	fieldToDisplay: Field[];
	handleChange: any;
	create: boolean;
	errors?: ErrorField[];
	buttons?: any;
	isUser?: Boolean;
	recharge: any;
	id: any;
	realm: any;
	userStorage: any;
}

const DataViewer = ({
	data,
	fieldToDisplay,
	handleChange,
	errors,
	buttons,
	create,
	isUser,
	recharge,
	id,
	realm,
	userStorage,
}: Props) => {
	const mainsFields = extractFieldAndAddError(
		'main',
		fieldToDisplay,
		errors || [],
	);

	const advancedFields = extractFieldAndAddError(
		'advanced',
		fieldToDisplay,
		errors || [],
	);

	const addressFields = extractFieldAndAddError(
		'address',
		fieldToDisplay,
		errors || [],
	);

	const authentificationFields = extractFieldAndAddError(
		'authentication',
		fieldToDisplay,
		errors || [],
	);

	const rightsFields = extractFieldAndAddError(
		'rights',
		fieldToDisplay,
		errors || [],
	);

	const propertiesFields = extractFieldAndAddError(
		'properties',
		fieldToDisplay,
		errors || [],
	);

	const [value, setValue] = React.useState(0);

	const handleChangeTabs = (
		event: React.ChangeEvent<{}>,
		newValue: number,
	) => {
		setValue(newValue);
	};
	return (
		<Grid
			container
			spacing={3}
			direction="column"
			justifyContent="center"
			alignItems="stretch"
		>
			<Grid item xs={12}>
				<Grid
					container
					spacing={3}
					direction="row"
					justifyContent="center"
					alignItems="stretch"
				>
					<Grid item xs={12}>
						<Paper square>
							<Tabs
								value={value}
								indicatorColor="primary"
								textColor="primary"
								onChange={handleChangeTabs}
							>
								<Tab
									label="Détails"
									value={0}
									onClick={() => {
										if (
											recharge !=
											null
										) {
											recharge(
												id,
												realm,
												userStorage,
											);
										}
									}}
								/>
								{rightsFields.length > 0 && (
									<Tab
										label="Droits applicatifs"
										disabled={create}
										value={1}
									/>
								)}
								{isUser ||
								authentificationFields.length >
									0 ? (
									<Tab
										label="Authentification"
										disabled={create}
										value={2}
									/>
								) : null}
							</Tabs>
						</Paper>
					</Grid>
				</Grid>
			</Grid>

			{value === 0 && (
				<>
					<Grid item xs={12}>
						<Panel
							title="Information du profil"
							collapsible={false}
							description="Information générale"
						>
							<MainPanel
								values={data}
								handleChange={handleChange}
								mainsFields={mainsFields}
								addressFields={addressFields}
								advancedFields={advancedFields}
							/>
						</Panel>
					</Grid>
					{propertiesFields.length > 0 && (
						<Grid item xs={12}>
							<Panel
								title="Propriété"
								collapsible={true}
							>
								<ContentPanel
									values={data}
									handleChange={
										handleChange
									}
									fields={propertiesFields}
								/>
							</Panel>
						</Grid>
					)}
					<Grid item xs={12}>
						{buttons}
					</Grid>
				</>
			)}
			{value === 1 && (
				<Grid item xs={12}>
					<Panel
						title="Droits applicatifs"
						collapsible={false}
						description="Gestion des droits de
						l'utilisateur"
					>
						<ContentPanel
							values={data}
							handleChange={handleChange}
							fields={rightsFields}
						/>
					</Panel>
				</Grid>
			)}
			{value === 2 && (
				<>
					<Grid item xs={12}>
						<Panel
							title="Credentials"
							collapsible={true}
							description="Gestion des crédentials"
							collapse={true}
						>
							<Grid
								container
								spacing={3}
								direction="row"
								justifyContent="flex-start"
								alignItems="stretch"
							>
								{GenerateFields(
									data,
									handleChange,
									authentificationFields,
								).map((field, i) => (
									<Grid
										item
										xs={12}
										md={6}
										key={
											'field-' +
											field +
											'-' +
											i
										}
									>
										{field}
									</Grid>
								))}
							</Grid>
						</Panel>
					</Grid>
					{isUser && (
						<Grid item xs={12}>
							<Grid
								container
								direction="row"
								justifyContent="center"
								spacing={3}
							>
								<Grid item>
									<SendUsernamePopup />
								</Grid>

								<Grid item>
									<ResetPasswordPopup />
								</Grid>
							</Grid>
						</Grid>
					)}
				</>
			)}
		</Grid>
	);
};

DataViewer.defaultProps = {
	isUser: false,
};

export default DataViewer;
