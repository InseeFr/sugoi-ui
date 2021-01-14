import { Grid } from '@material-ui/core';
import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import usePostOrganization from '../../hooks/organization/usePostOrganization';
import useRealmConfig from '../../hooks/realm/useRealmConfig/useRealmConfig';
import { useForms } from '../../hooks/technics/useForms';
import usePostUser from '../../hooks/user/usePostUser';
import Title from '../commons/title/title';

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

	return (
		<Grid container spacing={2} direction="column">
			<Grid item>
				<Title
					title={'Créer une entité dans le realm: ' + realm}
				/>
			</Grid>
		</Grid>
	);
};

export default Create;
