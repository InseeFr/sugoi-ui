import TextField from '@mui/material/TextField';
import { CircularProgress, Autocomplete, Grid } from '@mui/material';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
interface Props {
	text: string;
	options: any;
	loading: boolean;
	inputChange: (value: any) => void;
	onChange: (value: any) => void;
}

const MyAutocomplete = ({
	text,
	options,
	loading,
	inputChange,
	onChange,
}: Props) => {
	return (
		<Autocomplete
			id="combo-box-demo"
			options={options}
			getOptionLabel={(option) => {
				return option.label ?? option;
			}}
			loading={loading}
			onInputChange={(
				event: object,
				value: string,
				_reason: string,
			) => {
				inputChange(value);
			}}
			onChange={(event: any, newValue: any) => {
				onChange(newValue);
			}}
			renderInput={(params: any) => (
				<TextField
					{...params}
					label={text}
					variant="outlined"
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? (
									<CircularProgress
										color="inherit"
										size={20}
									/>
								) : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
				/>
			)}
			renderOption={(props: any, options: any, { inputValue }) => {
				const matches = match(props.key, inputValue);
				const parts = parse(props.key, matches);
				return (
					<li {...props}>
						<div>
							{parts.map(
								(part: any, index: any) => (
									<Grid
										component="span"
										key={index}
										sx={{
											fontWeight:
												part.highlight
													? 700
													: 400,
										}}
									>
										{part.text}
									</Grid>
								),
							)}
						</div>
					</li>
				);
			}}
		/>
	);
};

export default MyAutocomplete;
