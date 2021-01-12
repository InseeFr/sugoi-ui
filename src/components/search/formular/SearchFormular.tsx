import React, { useState } from 'react';
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
	TextField,
} from '@material-ui/core';
import D from '../../../i18n';
import ExpandButton from '../../commons/expandButton/expand-button';
import TextFieldInfo from '../../commons/formular/fields/textFieldInfo';
import Formular from '../../commons/formular';
import { field } from '../../../model/field';
import { useForms } from '../../../hooks/technics/useForms';
interface props {
	realm: string;
	onSubmit: any;
}

const LeftfieldsUser: field[] = [
	{
		name: 'Identifiant',
		helpTextTitle: 'Identifiant unique du contact',
		helpText: "Il servira pour le rechercher à travers l'annuaire.",
		path: 'username',
		type: 'string',
		modifiable: false,
	},
];
const RightfieldsUser: field[] = [
	{
		name: 'Identifiant',
		helpTextTitle: 'Identifiant unique du contact',
		helpText: "Il servira pour le rechercher à travers l'annuaire.",
		path: 'username',
		type: 'string',
		modifiable: false,
	},
];

const SearchFormular = ({ realm, onSubmit }: props) => {
	const [type, setType] = useState<any>('Users');
	const [expand, setExpand] = useState(false);
	const { formValues, handleChange, handleReset } = useForms({
		type: 'user',
	});
	return (
		<Card>
			<CardHeader title={D.formular_card_title} />
			<Divider />
			<CardContent>
				<Grid container direction="row" spacing={2}>
					<Grid item xs={12} md={6}>
						<FormControl
							component="fieldset"
							style={{ display: 'flex' }}
						>
							<FormLabel component="legend">
								{D.formular_radio_button_choose}
							</FormLabel>
							<RadioGroup
								row
								aria-label={
									D.formular_radio_button_choose
								}
								name="type"
								value={type}
								onChange={(e) =>
									setType(e.target.value)
								}
							>
								<FormControlLabel
									value="Users"
									control={<Radio />}
									label={
										D.formular_radio_button_user
									}
								/>
								<FormControlLabel
									value="Organizations"
									control={<Radio />}
									label={
										D.formular_radio_button_organization
									}
								/>
							</RadioGroup>
						</FormControl>
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
											type ===
											'Users'
												? LeftfieldsUser
												: []
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
												? LeftfieldsUser
												: []
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
