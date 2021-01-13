import {
	FormControl,
	FormControlLabel,
	FormLabel,
	Grid,
	Radio,
	RadioGroup,
} from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import usePostOrganization from '../../hooks/organization/usePostOrganization';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import usePostUser from '../../hooks/user/usePostUser';
import Formular from '../commons/formular';
import Title from '../commons/title/title';
import MyStepper from './stepper';

const Create = () => {
	const { realm } = useParams<any>();
	const [type, setType] = useState('Users');
	const { push } = useHistory();
	const { formValues, handleChange, updateFormValues } = useForms({});
	const { userConfig, organizationConfig } = useRealmConfig(realm);
	const { execute: createUser } = usePostUser();
	const { execute: createOrganization } = usePostOrganization();

	const handleSubmit = () => {
		if (type === 'Users') {
			createUser(realm, formValues);
		}
		if (type === 'Organizations') {
			createOrganization(realm, formValues);
		}
		push('/realm/' + realm);
	};

	const generateSteps = (type: string) => {
		const steps = [
			{
				title: 'Choix type Entité',
				component: (
					<Grid container direction="row" justify="center">
						<FormControl component="fieldset">
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
								}}
							>
								<div
									style={{
										paddingRight:
											'10px',
									}}
								>
									<FormLabel>
										Créer un :
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
										control={<Radio />}
										label="contact"
									/>
									<FormControlLabel
										value="Organizations"
										control={<Radio />}
										label="organisation"
									/>
								</RadioGroup>
							</div>
						</FormControl>
					</Grid>
				),
			},
		];
		const config = type === 'Users' ? userConfig : organizationConfig;

		const leftSide: any = config?.left;
		const rightSide: any = config?.right;

		Object.keys(leftSide)
			.map((key: string) => leftSide[key])
			.forEach((element) => {
				steps.push({
					title: element.title,
					component: (
						<Formular
							data={formValues}
							handleChange={handleChange as any}
							fields={element.fields}
						/>
					),
				});
			});
		Object.keys(rightSide)
			.map((key: string) => rightSide[key])
			.forEach((element) => {
				steps.push({
					title: element.title,
					component: (
						<Formular
							data={formValues}
							handleChange={handleChange as any}
							fields={element.fields}
						/>
					),
				});
			});

		return steps;
	};

	return (
		<Grid container spacing={2} direction="column">
			<Grid item>
				<Title
					title={'Créer une entité dans le realm: ' + realm}
				/>
			</Grid>
			<Grid item>
				<MyStepper
					steps={generateSteps(type)}
					functionCreate={handleSubmit}
				/>
			</Grid>
		</Grid>
	);
};

export default Create;
