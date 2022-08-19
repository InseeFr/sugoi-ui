import { Grid } from '@mui/material';
import { Field } from 'src/lib/model/field';
import GenerateFields from 'src/components/shared/formular/fields/utils';
import Panel from 'src/components/shared/panel/panel';

export const generatePanel = (
	title: string,
	children: JSX.Element,
	collapsible?: boolean,
	description?: string,
	elevation?: number,
) => {
	return (
		<Panel
			title={title}
			collapsible={collapsible}
			description={description}
			elevation={elevation}
		>
			{children}
		</Panel>
	);
};

interface contentProps {
	values: any;
	handleChange: any;
	fields: Field[];
}

export const ContentPanel = ({
	values,
	handleChange,
	fields,
}: contentProps) => {
	return (
		<Grid
			container
			spacing={1}
			direction="column"
			justifyContent="center"
			alignItems="stretch"
		>
			{GenerateFields(values, handleChange, fields).map(
				(field, i) => (
					<Grid
						item
						xs={12}
						key={'field-' + field + '-' + i}
					>
						{field}
					</Grid>
				),
			)}
		</Grid>
	);
};
