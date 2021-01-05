import React, { useEffect, useReducer, useState } from 'react';
import Detail from './details';
import { useParams } from 'react-router-dom';
import { getUserByIdAndDomain } from '../../api/api';
import FieldsToDisplay from '../commons/dataViewer/fieldToDisplay/FieldToDisplayConfig';
import reducer from '../commons/dataViewer/dataviewer.reducer';
import { Loader } from '../commons/loader/loader';

const DetailsContainer = () => {
	const { realmName, id } = useParams<any>();
	const [state, dispatch] = useReducer(reducer, {
		data: {},
		initialData: {},
	});
	const [error, setError] = useState<any>();
	const [loading, setLoading] = useState<any>(true);

	useEffect(() => {
		getUserByIdAndDomain(id, realmName)
			.then((r: any) => {
				// dispatch({ type: 'UpdateData', payload: r });
			})
			.catch((err) => {
				setError(err);
			})
			.finally(() => setLoading(false));
		setLoading(false);
	}, [id, realmName]);

	console.log(state);

	if (error) throw new Error(error);

	return loading ? (
		<Loader />
	) : (
		<>
			<Detail
				data={state.data}
				fieldToDisplay={FieldsToDisplay}
				id={'toto'}
				dispatch={dispatch}
			/>
		</>
	);
};

export default DetailsContainer;
