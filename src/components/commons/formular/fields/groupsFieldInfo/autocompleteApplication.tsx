import { TextField } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import React from 'react';
import { useGetApplications } from '../../../../../hooks/applications/useGetApplications';
import Application from '../../../../../model/api/application';

interface Props {
	realm: string;
	application: Application | undefined;
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
			options={applications}
			value={application}
			getOptionLabel={(option: any) => option.name || ''}
			onInputChange={(
				event: object,
				appName: string,
				reason: string,
			) => {
				searchApplications(realm, appName);
			}}
			onChange={(event: any, applicationSelected: Application) => {
				applicationSelected &&
					handleChangeApplication(applicationSelected.name);
			}}
			renderInput={(params: any) => (
				<TextField
					{...params}
					label={'Application'}
					variant="outlined"
					fullWidth
				/>
			)}
			renderOption={(option, { inputValue }) => {
				const matches = match(option.name, inputValue);
				const parts = parse(option.name, matches);

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
