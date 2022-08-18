import {
	Grid,
	LinearProgress,
	Link,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Pagination,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Application from 'src/lib/model/api/application';

interface Props {
	applications: Application[];
	loading: boolean;
	handleClickOnApp: any;
}

const ApplicationsList = ({
	loading,
	applications,
	handleClickOnApp,
}: Props) => {
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const { t } = useTranslation();

	const [page, setPage] = useState(1);
	const handleChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	useEffect(() => {
		setPage(1);
	}, [applications]);

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="stretch"
			spacing={3}
		>
			<Grid item xs={12}>
				<TableContainer component={Paper}>
					<Table size="small">
						<TableHead>
							<TableRow>
								<TableCell
									align="center"
									padding="normal"
								>
									{t(
										'search_application.table_header',
									)}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{applications.length === 0 ? (
								<TableRow key="no-data">
									<TableCell
										component="th"
										scope="row"
										align="center"
									>
										{t(
											'search_application.table_no_entry',
										)}
									</TableCell>
								</TableRow>
							) : (
								applications
									.slice(
										(page - 1) *
											rowsPerPage,
										page * rowsPerPage,
									)
									.map((application) => (
										<TableRow
											key={
												application.name
											}
										>
											<TableCell
												component="th"
												scope="row"
												align="center"
											>
												<Link
													onClick={() =>
														handleClickOnApp(
															application,
														)
													}
												>
													{
														application.name
													}
												</Link>
											</TableCell>
										</TableRow>
									))
							)}
						</TableBody>
					</Table>
				</TableContainer>
				{loading && <LinearProgress />}
			</Grid>
			<Grid item xs={12}>
				<Grid
					container
					direction="row"
					justifyContent="space-between"
					alignItems="center"
				>
					<Grid item>
						<Select
							value={rowsPerPage}
							onChange={(e: any) =>
								setRowsPerPage(e.target.value)
							}
							displayEmpty
						>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
					</Grid>
					<Grid item>
						<Pagination
							count={Math.ceil(
								applications.length /
									rowsPerPage,
							)}
							page={page}
							color="primary"
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};

export default ApplicationsList;
