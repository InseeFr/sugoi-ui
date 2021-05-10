import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React from 'react';
import { useGetApplications } from '../../../../../hooks/api/applications/useGetApplications';

interface Props {
	realm: string;
	application: String | undefined;
	handleChangeApplication: any;
}

export const AutoCompleteApplication = ({
	realm,
	application,
	handleChangeApplication,
}: Props) => {
	const {
		applications,
		execute: searchApplications,
	} = useGetApplications();

	return (
		<Autocomplete
			id="autocompleteSearchApplication"
			options={applications.map((application) => application.name)}
			value={application ?? ''}
			getOptionLabel={(option: any) => option}
			onInputChange={(
				_event: object,
				appName: string,
				_reason: string,
			) => {
				realm && appName && searchApplications(realm, appName);
			}}
			onChange={(_event: any, applicationSelected: String) => {
				handleChangeApplication(applicationSelected);
			}}
			getOptionSelected={(option, value) => option === value}
			renderInput={(params: any) => (
				<TextField
					{...params}
					label={'Application'}
					variant="outlined"
					fullWidth
				/>
			)}
			renderOption={(option, { inputValue }) => {
				const matches = match(option, inputValue);
				const parts = parse(option, matches);

				return (
					<div>
						{parts.map((part: any, index: any) => (
							<span
								key={index}
								style={{
									fontWeight: part.highlight
										? 700
										: 400,
								}}
							>
								{part.text}
							</span>
						))}
					</div>
				);
			}}
		/>
	);
};

export default AutoCompleteApplication;
