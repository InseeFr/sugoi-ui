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
			options={options || []}
			getOptionLabel={(option) => {
				return option?.label || '';
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
			//problem here --> to solve
			renderOption={(option: any, { inputValue }) => {
				const matches = match(option?.label, inputValue);
				const parts = parse(option?.label, matches);
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

export default MyAutocomplete;
