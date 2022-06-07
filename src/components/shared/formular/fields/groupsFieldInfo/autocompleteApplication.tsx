import { TextField, Grid } from '@mui/material';
import { Autocomplete } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import { useGetApplications } from 'src/lib/hooks/api-hooks';

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
	const { applications, execute: searchApplications } =
		useGetApplications();

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
			isOptionEqualToValue={(option, value) => option === value}
			renderInput={(params: any) => (
				<TextField
					{...params}
					label={'Application'}
					variant="outlined"
					fullWidth
				/>
			)}
			renderOption={(option: any, { inputValue }) => {
				const matches = match(option, inputValue);
				const parts = parse(option, matches);

				return (
					<div>
						{parts.map((part: any, index: any) => (
							<Grid
								component="span"
								key={index}
								sx={{
									fontWeight: part.highlight
										? 700
										: 400,
								}}
							>
								{part.text}
							</Grid>
						))}
					</div>
				);
			}}
		/>
	);
};

export default AutoCompleteApplication;
