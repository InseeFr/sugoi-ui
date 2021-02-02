import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	Divider,
	Grid,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useForms } from '../../../hooks/technics/useForms';
import { field } from '../../../model/field';
import ExpandButton from '../../commons/expandButton/expand-button';
import TextFieldInfo from '../../commons/formular/fields/textFieldInfo';
import GenerateFields from '../../commons/formular/fields/utils';
interface props {
	realm: string;
	onSubmit: any;
	formFields: field[];
}

const SearchFormular = ({ realm, onSubmit, formFields }: props) => {
	const [expand, setExpand] = useState(false);
	const { formValues, handleChange, handleReset } = useForms({});

	return (
		<Card>
			<CardHeader title="Ma recherche:" />
			<Divider />
			<CardContent>
				<Grid container direction="row" spacing={2}>
					<Grid item xs={12}>
						<TextFieldInfo
							name="realm"
							value={realm}
							modifiable={false}
							helpText="Realm selectionné"
						/>
					</Grid>
					<Grid item xs={12}>
						<Collapse in={expand}>
							<Grid
								container
								direction="row"
								spacing={2}
							>
								{GenerateFields(
									formValues,
									handleChange,
									formFields,
								).map((field, i) => {
									return (
										<Grid
											item
											xs={12}
											md={6}
											key={
												'field' +
												i
											}
										>
											{field}
										</Grid>
									);
								})}
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
								onSubmit({
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
