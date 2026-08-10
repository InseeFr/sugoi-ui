import { Grid } from '@mui/material';
import GenerateFields from 'src/components/shared/formular/fields/utils';
import Panel from 'src/components/shared/panel/panel';
import { Field } from 'src/lib/model/field';

interface mainPanelProps {
	values: any;
	handleChange: any;
	mainsFields: Field[];
	addressFields: Field[];
	advancedFields: Field[];
}

const MainPanel = ({
	values,
	handleChange,
	mainsFields,
	addressFields,
	advancedFields,
}: mainPanelProps) => {
	return (
		<Grid
			container
			spacing={3}
			direction="column"
			alignContent="center"
			alignItems="stretch"
		>
			<Grid size={12}>
				<Grid container spacing={3} direction="row">
					{GenerateFields(
						values,
						handleChange,
						mainsFields,
					).map((field, i) => (
						<Grid
							key={'field-' + field + '-' + i}
							size={{
								xs: 12,
								md: 6,
							}}
						>
							{field}
						</Grid>
					))}
				</Grid>
			</Grid>
			<Grid size={12}>
				{addressFields.length > 0 && (
					<Panel
						title="Adresse"
						collapsible={true}
						description="Information générale"
						elevation={0}
						transparent={true}
					>
						<Grid container spacing={3} direction="row">
							{GenerateFields(
								values,
								handleChange,
								addressFields,
							).map((field, i) => (
								<Grid
									key={
										'field-' +
										field +
										'-' +
										i
									}
									size={{
										xs: 12,
										md: 6,
									}}
								>
									{field}
								</Grid>
							))}
						</Grid>
					</Panel>
				)}
			</Grid>

			<Grid size={12}>
				{advancedFields.length > 0 && (
					<Panel
						title="Information Complémentaire"
						collapsible={true}
						description="Autres infos"
						elevation={0}
						transparent={true}
					>
						<Grid container spacing={3} direction="row">
							{GenerateFields(
								values,
								handleChange,
								advancedFields,
							).map((field, i) => (
								<Grid
									key={
										'field-' +
										field +
										'-' +
										i
									}
									size={{
										xs: 12,
										md: 6,
									}}
								>
									{field}
								</Grid>
							))}
						</Grid>
					</Panel>
				)}
			</Grid>
		</Grid>
	);
};

export default MainPanel;
