import {
	Grid,
	LinearProgress,
	MenuItem,
	Select,
	Typography,
	Pagination,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import Application from 'src/lib/model/api/application';
import ApplicationCard from 'src/components/pages/searchApplications/application_card';
import { useTranslation } from 'react-i18next';

const ApplicationsFavoriteList = ({
	applications,
	handleClickOnApp,
	loading,
}: {
	applications: Application[];
	handleClickOnApp: (application: Application) => void;
	loading: boolean;
}) => {
	const { t } = useTranslation();

	const [rowsPerPage, setRowsPerPage] = useState(8);

	const [page, setPage] = useState(1);
	const handleChange = (
		_event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	useEffect(() => {
		setPage(1);
	}, [applications]);
	return (
		<Grid container sx={{ flexDirection: 'column' }} spacing={3}>
			<Grid size={12}>
				<Grid
					container
					direction="row"
					sx={{
						justifyContent: 'center',
						alignItems: 'stretch',
					}}
					spacing={3}
				>
					{loading ? (
						<LinearProgress />
					) : applications.length > 0 ? (
						applications
							.slice(
								(page - 1) * rowsPerPage,
								page * rowsPerPage,
							)
							.map((application, i) => (
								<Grid
									key={i}
									size={{
										xs: 12,
										md: 3,
									}}
								>
									<ApplicationCard
										application={
											application
										}
										handleClick={() =>
											handleClickOnApp(
												application,
											)
										}
									/>
								</Grid>
							))
					) : (
						<Typography>
							{t('search_application.no_favorite')}
						</Typography>
					)}
				</Grid>
			</Grid>
			<Grid size={12}>
				<Grid
					container
					direction="row"
					sx={{
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<Grid>
						<Select
							value={rowsPerPage}
							onChange={(e: any) =>
								setRowsPerPage(e.target.value)
							}
							displayEmpty
						>
							<MenuItem value={8}>8</MenuItem>
							<MenuItem value={12}>12</MenuItem>
							<MenuItem value={16}>16</MenuItem>
						</Select>
					</Grid>
					<Grid>
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

export default ApplicationsFavoriteList;
