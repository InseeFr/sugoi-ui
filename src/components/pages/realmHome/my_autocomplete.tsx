import { CircularProgress } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { Autocomplete } from '@material-ui/lab';
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
				reason: string,
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
			renderOption={(option, { inputValue }) => {
				const matches = match(option.label, inputValue);
				const parts = parse(option.label, matches);
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

export default MyAutocomplete;
