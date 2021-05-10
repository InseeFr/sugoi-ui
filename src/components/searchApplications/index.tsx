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
	TextField,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useParams } from 'react-router-dom';
import { useCreateApplication } from '../../hooks/api/applications';
import { useGetApplications } from '../../hooks/api/applications/useGetApplications';
import Title from '../commons/title/title';
import CreateApplicationButton from './button-create-app';

export const SearchApplications = () => {
	const { realm } = useParams<any>();
	const { push } = useHistory();
	const [rowsPerPage, setRowsPerPage] = React.useState(10);
	const [page, setPage] = React.useState(1);
	const { applications, execute, loading } = useGetApplications(realm);
	const { t } = useTranslation();
	const { execute: createApplication } = useCreateApplication();
	const [search, setSearch] = useState<string>('');

	const handleCreateApp = (appName: string, owner: string) => {
		createApplication(realm, {
			name: appName,
			owner: owner,
			groups: [],
		}).then((r) => execute(realm));
	};

	const handleSearch = (e: any) => {
		setSearch(e.target.value);
		setPage(1);
		execute(realm, e.target.value === '' ? undefined : e.target.value);
	};

	const handleChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	return (
		<>
			<Title title={t('search_application.title') + realm} />
			<Grid
				container
				direction="column"
				justify="center"
				alignItems="stretch"
				spacing={3}
			>
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justify="flex-end"
						alignItems="center"
					>
						<CreateApplicationButton
							handleCreateApp={handleCreateApp}
						/>
					</Grid>
				</Grid>
				<Grid item xs={12}>
					<TextField
						id="application-search-textfield"
						label={t('search_application.search_field')}
						variant="outlined"
						onChange={handleSearch}
						value={search}
						fullWidth
					/>
				</Grid>
				<Grid item xs={12}>
					<TableContainer component={Paper}>
						<Table size="small">
							<TableHead>
								<TableRow>
									<TableCell
										align="center"
										padding="default"
									>
										{t(
											'search_application.table_header',
										)}
									</TableCell>
								</TableRow>
							</TableHead>
							{loading && <LinearProgress />}
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
											(page - 1) *
												rowsPerPage +
												rowsPerPage,
										)
										.map(
											(
												application,
											) => (
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
																push(
																	'/realm/' +
																		realm +
																		'/' +
																		'applications/' +
																		application.name,
																)
															}
														>
															{
																application.name
															}
														</Link>
													</TableCell>
												</TableRow>
											),
										)
								)}
							</TableBody>
						</Table>
					</TableContainer>
				</Grid>
				<Grid item xs={12}>
					<Grid
						container
						direction="row"
						justify="space-between"
						alignItems="center"
					>
						<Grid item>
							<Select
								value={rowsPerPage}
								onChange={(e: any) =>
									setRowsPerPage(
										e.target.value,
									)
								}
								displayEmpty
							>
								<MenuItem value={10}>
									10
								</MenuItem>
								<MenuItem value={20}>
									20
								</MenuItem>
								<MenuItem value={50}>
									50
								</MenuItem>
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
		</>
	);
};
