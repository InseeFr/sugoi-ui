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
import { useTranslation } from 'react-i18next';
import { useForms } from '../../../hooks/technics/useForms';
import { Field } from '../../../model/field';
import ExpandButton from '../../commons/expandButton/expand-button';
import TextFieldInfo from '../../commons/formular/fields/textFieldInfo';
import GenerateFields from '../../commons/formular/fields/utils';
interface props {
	realm: string;
	userStorage?: string;
	onSubmit: any;
	formFields: Field[];
}

const SearchFormular = ({
	realm,
	userStorage,
	onSubmit,
	formFields,
}: props) => {
	const [expand, setExpand] = useState(true);
	const { formValues, handleChange, handleReset } = useForms({});
	const { t } = useTranslation();

	const submit = (e: any) => {
		e.preventDefault();
		onSubmit({ ...formValues });
	};

	return (
		<form onSubmit={submit}>
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
								helpText={t(
									'commons.search_forms.selected_realm',
								)}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextFieldInfo
								name="UserStorage"
								value={
									userStorage
										? userStorage
										: 'all'
								}
								modifiable={false}
								helpText={t(
									'commons.search_forms.selected_userStorage',
								)}
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
								type="submit"
							>
								{t(
									'commons.search_forms.validate',
								)}
							</Button>
						</Grid>
						<Grid item>
							<Button
								variant="contained"
								color="secondary"
								onClick={() => handleReset()}
							>
								{t(
									'commons.search_forms.reset',
								)}
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
		</form>
	);
};

export default SearchFormular;
