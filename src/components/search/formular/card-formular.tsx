import React, { useState } from 'react';
import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardHeader,
	Collapse,
	Divider,
	Grid,
	TextField,
} from '@material-ui/core';
import D from '../../../i18n';
import ExpandButton from './expand-button';
import Selector from './selector';

interface props {
	setValues: Function;
}

const initialFValues = {
	type: 'user',
	identifiant: '',
	communName: '',
	description: '',
	email: '',
};

const AdvancedSearchForm = (props: props) => {
	const { setValues } = props;
	const [expand, setExpand] = useState(false);
	const [formValues, setFormValues] = useState(initialFValues);

	const onFinish = () => setValues(formValues);

	const reset = () => setFormValues(initialFValues);

	const handleInputChange = (e: any) => {
		const { name, value } = e.target;
		setFormValues({
			...formValues,
			[name]: value,
		});
	};

	return (
		<Card>
			<CardHeader title={D.formular_card_title} />
			<Divider />
			<CardContent>
				<Grid
					container
					direction="column"
					justify="center"
					alignItems="center"
				>
					<Grid item xs={12}>
						<Selector
							value={formValues.type}
							setValue={handleInputChange}
						/>
					</Grid>
					<Collapse in={expand}>
						<Grid
							container
							direction="column"
							justify="center"
							alignItems="center"
						>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									label="identifiant"
									name="identifiant"
									fullWidth
									value={
										formValues.identifiant
									}
									onChange={
										handleInputChange
									}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									variant="outlined"
									label="communName"
									name="communName"
									fullWidth
									value={
										formValues?.communName
									}
									onChange={
										handleInputChange
									}
									style={{
										marginTop: '16px',
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									label="description"
									name="description"
									fullWidth
									value={
										formValues?.description
									}
									onChange={
										handleInputChange
									}
									style={{
										marginTop: '16px',
									}}
								/>
							</Grid>

							<Grid item xs={12}>
								<TextField
									variant="outlined"
									label="email"
									name="email"
									fullWidth
									value={formValues?.email}
									onChange={
										handleInputChange
									}
									style={{
										marginTop: '16px',
									}}
								/>
							</Grid>
						</Grid>
					</Collapse>
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
							onClick={onFinish}
						>
							Valider
						</Button>
					</Grid>
					<Grid item>
						<Button
							variant="contained"
							color="secondary"
							onClick={reset}
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

export default AdvancedSearchForm;
