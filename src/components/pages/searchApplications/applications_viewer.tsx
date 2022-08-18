import { Grid, Typography, Chip, IconButton } from '@mui/material';
import Application from 'src/lib/model/api/application';
import ZoomInOutlinedIcon from '@mui/icons-material/ZoomInOutlined';
import { SearchResults } from 'src/components/shared/searchResults';

const ApplicationsViewer = ({
	applications,
	loading,
	handleClickOnApp,
}: {
	applications: Application[];
	loading: boolean;
	handleClickOnApp: (rowData: any[]) => void;
}) => {
	const columns = [
		{
			name: 'name',
			label: "Nom de l'application",
		},
		{
			name: 'attributes',
			label: 'Description',
			options: {
				filter: false,
				sort: true,
				customBodyRender: function render(
					value: any,
					_tableMeta: any,
					_updateValue: any,
				) {
					return (
						<Typography>
							{value?.description}
						</Typography>
					);
				},
			},
		},
		{
			name: 'attributes',
			label: 'Contacts',
			options: {
				filter: false,
				sort: true,
				customBodyRender: function render(
					value: any,
					_tableMeta: any,
					_updateValue: any,
				) {
					return (
						<Typography>
							{value &&
								value?.contacts?.map(
									(
										contact: string,
										i: any,
									) => (
										<Chip
											key={i}
											label={
												contact
											}
											size="small"
										/>
									),
								)}
						</Typography>
					);
				},
			},
		},
		{
			name: '',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: function render(
					_dataIndex: any,
					_rowIndex: any,
				) {
					return (
						<IconButton aria-label="Détail">
							<ZoomInOutlinedIcon />
						</IconButton>
					);
				},
			},
		},
	];
	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="stretch"
			spacing={0}
		>
			<Grid item xs={12}>
				<SearchResults
					data={applications}
					columns={columns}
					handleClickOnRow={handleClickOnApp}
					downloadable={false}
					loading={loading}
				/>
			</Grid>
		</Grid>
	);
};

export default ApplicationsViewer;
