import { useSnackbar } from 'notistack';
import React, { useEffect, useReducer, useState } from 'react';
import Detail from './details';
import { useParams } from 'react-router-dom';
import { getUserByIdAndDomain } from '../../api/api';
import FieldsToDisplay from './commons/fieldToDisplay/FieldToDisplayConfig';
import reducer from './details.reducer';

const DetailsContainer = () => {
	const { realmName, id } = useParams<any>();
	const [user, setUser] = useState<any>();
	const { enqueueSnackbar } = useSnackbar();
	const [state, dispatch] = useReducer(reducer, { data: { name: 'toto' } });

	useEffect(() => {
		getUserByIdAndDomain(id, realmName)
			.then((r: any) => setUser(r))
			.catch((err) =>
				enqueueSnackbar("Erreur lors de la requête à l'api", {
					variant: 'error',
					persist: false,
				}),
			);
	}, [id, realmName, enqueueSnackbar]);
	console.log(state);
	return (
		<Detail
			data={state.data}
			fieldToDisplay={FieldsToDisplay}
			id={'toto'}
			dispatch={dispatch}
		/>
	);
};

export default DetailsContainer;
