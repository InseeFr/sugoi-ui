import { Grid, Typography, Chip } from '@mui/material';
import Application from 'src/lib/model/api/application';
import { SearchResults } from 'src/components/shared/searchResults';

const ApplicationsViewer = ({
	applications,
	handleClickOnApp,
}: {
	applications: Application[];
	handleClickOnApp: (app: Application) => void;
}) => {
	const columns = [
		{
			accessorKey: 'name',
			header: "Nom de l'application",
		},
		{
			accessorKey: 'attributes.description',
			header: 'Description',
		},
		{
			accessorKey: 'attributes.contacts',
			header: 'Contacts',
			Cell: ({ cell }: any) => {
				const value = cell.getValue();
				return (
					<Typography>
						{value &&
							value.map(
								(contact: string, i: any) => (
									<Chip
										key={i}
										label={contact}
										size="small"
									/>
								),
							)}
					</Typography>
				);
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
				/>
			</Grid>
		</Grid>
	);
};

export default ApplicationsViewer;
