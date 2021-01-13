import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	Divider,
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForms } from '../../../hooks/technics/useForms';
import D from '../../../i18n';
import { field } from '../../../model/field';
import ExpandButton from '../../commons/expandButton/expand-button';
import Formular from '../../commons/formular';
import TextFieldInfo from '../../commons/formular/fields/textFieldInfo';
interface props {
	realm: string;
	onSubmit: any;
}

const LeftfieldsUser: field[] = [
	{
		name: 'Identifiant',
		helpTextTitle: 'Identifiant',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin de l'identifiant recherché. L'identifiant d'un contact/d'une organisation est unique dans l'annuaire. La recherche sera plus précise.",
		path: 'identifiant',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Description',
		helpTextTitle: 'Description',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin du nom commun recherché. Caractères autorisés : alphabétiques, chiffres, apostrophes, espaces, tirets",
		path: 'description',
		type: 'string',
		modifiable: true,
	},
	{
		name: "Organisation d'appartenance",
		helpTextTitle: " Identifiant de l'organisation d'appartenance ",
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement.  Le champ saisi doit être le début de l'identifiant recherché.",
		type: 'string',
		modifiable: true,
		path: 'organization',
	},
];
const RightfieldsUser: field[] = [
	{
		name: 'Nom commun',
		helpTextTitle: ' Nom commun',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin du nom commun recherché. Caractères autorisés : alphabétiques, chiffres, apostrophes, espaces, tirets",
		path: 'nomCommun',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Adresse e-mail',
		helpTextTitle: ' Adresse e-mail ',
		helpText:
			"Le champ saisi peut être une portion de l'adresse mail recherchée.",
		path: 'description',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Certificat associé',
		helpTextTitle: 'Certificat associé',
		path: 'certificate',
		type: 'string',
		modifiable: true,
	},
];

const RightfieldsOrganization: field[] = [
	{
		name: 'Nom commun',
		helpTextTitle: ' Nom commun',
		helpText:
			"Il n'est pas obligatoire de le saisir entièrement. Le champ saisi peut être le début, le milieu ou la fin du nom commun recherché. Caractères autorisés : alphabétiques, chiffres, apostrophes, espaces, tirets",
		path: 'nomCommun',
		type: 'string',
		modifiable: true,
	},
	{
		name: 'Adresse e-mail',
		helpTextTitle: ' Adresse e-mail ',
		helpText:
			"Le champ saisi peut être une portion de l'adresse mail recherchée.",
		path: 'description',
		type: 'string',
		modifiable: true,
	},
];

const SearchFormular = ({ realm, onSubmit }: props) => {
	const [type, setType] = useState<any>('Users');
	const [expand, setExpand] = useState(false);
	const {
		formValues,
		handleChange,
		handleReset,
		updateFormValues,
	} = useForms({
		type: 'user',
	});

	return (
		<Card>
			<CardHeader title={D.formular_card_title} />
			<Divider />
			<CardContent>
				<Grid container direction="row" spacing={2}>
					<Grid item xs={12} md={6}>
						<Grid
							container
							direction="row"
							justify="center"
						>
							<FormControl component="fieldset">
								<div
									style={{
										display: 'flex',
										alignItems:
											'center',
									}}
								>
									<div
										style={{
											paddingRight:
												'10px',
										}}
									>
										<FormLabel>
											Rechercher un
											:
										</FormLabel>
									</div>
									<RadioGroup
										row
										name="type"
										value={type}
										onChange={(e) => {
											setType(
												e.target
													.value,
											);
											updateFormValues(
												{},
											);
										}}
									>
										<FormControlLabel
											value="Users"
											control={
												<Radio />
											}
											label="contact"
										/>
										<FormControlLabel
											value="Organizations"
											control={
												<Radio />
											}
											label="organisation"
										/>
									</RadioGroup>
								</div>
							</FormControl>
						</Grid>
					</Grid>
					<Grid item xs={12} md={6}>
						<TextFieldInfo
							name="realm"
							value={realm}
							modifiable={false}
							helpText="Realm selectionné"
						/>
					</Grid>
					<Grid item xs={12}>
						<Collapse in={expand}>
							<Grid container direction="row">
								<Grid item xs={12} md={6}>
									<Formular
										data={formValues}
										fields={
											LeftfieldsUser
										}
										handleChange={
											handleChange as any
										}
									/>
								</Grid>
								<Grid item xs={12} md={6}>
									<Formular
										data={formValues}
										fields={
											type ===
											'Users'
												? RightfieldsUser
												: RightfieldsOrganization
										}
										handleChange={
											handleChange as any
										}
									/>
								</Grid>
							</Grid>
						</Collapse>
					</Grid>
				</Grid>
			</CardContent>
			<CardActions>
				<Grid
					container
					direction="row"
					justify="flex-end"
					spacing={3}
				>
					<Grid item>
						<Button
							variant="contained"
							color="primary"
							onClick={() =>
								onSubmit(type, {
									...formValues,
								})
							}
						>
							Valider
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							onClick={() => handleReset()}
						>
							reset
						</Button>
					</Grid>
					<Grid item>
						<ExpandButton
							expand={expand}
							setExpand={setExpand}
						/>
					</Grid>
				</Grid>
			</CardActions>
		</Card>
	);
};

export default SearchFormular;
