import { Grid } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getUsers } from '../../api';
import Title from '../commons/title/title';

export const RealmHome = () => {
	const { realm } = useParams<any>();
	const [result, setResult] = useState<any[]>([]);
	const { push } = useHistory();
	const [search, setSearch] = useState<string>('');
	const [selected, setSelected] = useState<any>();

	useEffect(() => {
		if (selected) {
			push('/realm/' + realm + '/users/' + selected.username);
		}
	}, [selected, push, realm]);

	useEffect(() => {
		if (search.length > 1) {
			getUsers(realm, {
				typeRecherche: 'ou',
				identifiant: search,
				size: 6,
			}).then((r) => {
				let results = r.results;
				if (results) {
					setResult(results);
				}
			});
		}
	}, [realm, search]);

	useEffect(() => {
		console.log(search);
		console.log(result);
	});

	return (
		<>
			<Title title={'Rechercher dans le realm ' + realm} />

			<Grid container direction="row" spacing={2}>
				<Grid item xs={12}>
					<Autocomplete
						id="combo-box-demo"
						options={result}
						value={selected?.username}
						getOptionLabel={(option: any) =>
							option.username || ''
						}
						onInputChange={(
							event: object,
							value: string,
							reason: string,
						) => {
							setSearch(value);
						}}
						onChange={(event: any, newValue: any) => {
							setSelected(newValue);
						}}
						renderInput={(params: any) => (
							<TextField
								{...params}
								label="Rechercher dans le realm..."
								variant="outlined"
								fullWidth
							/>
						)}
						renderOption={(option, { inputValue }) => {
							const matches = match(
								option.username,
								inputValue,
							);
							const parts = parse(
								option.username,
								matches,
							);

							return (
								<div>
									{parts.map(
										(
											part: any,
											index: any,
										) => (
											<span
												key={
													index
												}
												style={{
													fontWeight: part.highlight
														? 700
														: 400,
												}}
											>
												{
													part.text
												}
											</span>
										),
									)}
								</div>
							);
						}}
					/>
				</Grid>
			</Grid>
		</>
	);
};

export default RealmHome;
