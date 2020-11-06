import {
	Button,
	Card,
	CardContent,
	CardHeader,
	Checkbox,
	FormControl,
	FormControlLabel,
	FormHelperText,
	Grid,
	Input,
	InputLabel,
	TextField,
} from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { Realm } from '../../model/interface';
import { getRealms } from './../../api/api';
import D from './../../i18n';
import ExpandButton from './expand-button';

interface props {
	setValues: Function;
}

// const fields = [
// 	{
// 		label: 'identifiant_field',
// 		name: 'identifiant_field',
// 		description: 'identifiant_field_desc',
// 		required: false,
// 	},
// 	{
// 		label: 'nom_commun_field',
// 		name: 'nom_commun_field',
// 		description: 'nom_commun_field_desc',
// 		required: false,
// 	},
// 	{
// 		label: 'description_field',
// 		name: 'description_field',
// 		description: 'description_field_desc',
// 		required: false,
// 	},
// 	{
// 		label: 'email_field',
// 		name: 'email_field',
// 		description: 'email_field_desc',
// 		required: false,
// 	},
// ];

const AdvancedSearchForm = (props: props) => {
	// const { setValues } = props;
	const [expand, setExpand] = useState(false);
	const [, setLoading] = useState(true);
	const [, setRealms] = useState<Realm[]>([]);
	// const onFinish = (values: any) => {
	// 	console.log('Received values of form: ', values);
	// 	setValues(values);
	// };

	useEffect(() => {
		getRealms()
			.then((r) => {
				setRealms(r);
				setLoading(false);
			})
			.catch((err) => {
				// setLoading(false);
				// return Notification(
				// 	'Erreur ',
				// 	'Erreur lors de la récupération des realms',
				// );
			});
	}, []);

	return (
		<Card>
			<CardHeader title={D.formular_card_title} />
			<CardContent>
				<InputLabel htmlFor="my-input">
					Email address
				</InputLabel>
				<Input
					id="my-input"
					aria-describedby="my-helper-text"
				/>
				<FormHelperText id="my-helper-text">
					We'll never share your email.
				</FormHelperText>
				{expand ? (
					<Grid
						spacing={0}
						direction="column"
						alignItems="baseline"
					>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="lastName"
								name="lastName"
								label="Last name"
								fullWidth
								autoComplete="family-name"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								required
								id="address1"
								name="address1"
								label="Address line 1"
								fullWidth
								autoComplete="shipping address-line1"
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								id="address2"
								name="address2"
								label="Address line 2"
								fullWidth
								autoComplete="shipping address-line2"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="city"
								name="city"
								label="City"
								fullWidth
								autoComplete="shipping address-level2"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								id="state"
								name="state"
								label="State/Province/Region"
								fullWidth
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="zip"
								name="zip"
								label="Zip / Postal code"
								fullWidth
								autoComplete="shipping postal-code"
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								required
								id="country"
								name="country"
								label="Country"
								fullWidth
								autoComplete="shipping country"
							/>
						</Grid>
						<Grid item xs={12}>
							<FormControlLabel
								control={
									<Checkbox
										color="secondary"
										name="saveAddress"
										value="yes"
									/>
								}
								label="Use this address for payment details"
							/>
						</Grid>
					</Grid>
				) : null}

				<Grid item xs={12} sm={6}>
					<Button variant="contained" color="primary">
						Valider
					</Button>
					<ExpandButton
						expand={expand}
						setExpand={setExpand}
					/>
				</Grid>
			</CardContent>
		</Card>
	);
};

export default AdvancedSearchForm;
