import {
	Grid,
	IconButton,
	LinearProgress,
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
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Pagination } from '@material-ui/lab';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Title from 'src/components/shared/title/title';
import { useGetUsers } from 'src/lib/hooks/api-hooks';
import { Group } from 'src/lib/model/api/group';
import User from 'src/lib/model/api/user';

interface Props {
	realm: string;
	group: Group;
	handleAddUser: any;
	handleDeleteUser: any;
}

export const AddUsers = ({
	realm,
	handleAddUser,
	group,
	handleDeleteUser,
}: Props) => {
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(1);
	const { execute, loading, users } = useGetUsers(realm);
	const [search, setSearch] = useState('');
	const { t } = useTranslation();

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};

	const handleSearchUser = (e: any) => {
		setSearch(e.target.value);
		execute(
			{
				identifiant: e.target.value,
				commonName: e.target.value,
				mail: e.target.value,
				typeRecherche: 'OR',
			},
			realm,
		);
	};

	return (
		<Grid
			container
			direction="column"
			justifyContent="center"
			alignItems="stretch"
			spacing={1}
		>
			<Grid item xs={12}>
				<TextField
					id="application-search-textfield"
					label={t(
						'detail_application.manage_group_popup.search',
					)}
					variant="outlined"
					onChange={handleSearchUser}
					value={search}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<Title
					title={t(
						'detail_application.manage_group_popup.available_users',
					)}
					variant="body1"
				/>
			</Grid>
			<Grid item xs={12}>
				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell
									align="center"
									padding="normal"
								>
									{t(
										'detail_application.manage_group_popup.users',
									)}
								</TableCell>
								<TableCell
									align="right"
									padding="normal"
								>
									{t(
										'detail_application.manage_group_popup.actions',
									)}
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{users
								.slice(
									(page - 1) * rowsPerPage,
									(page - 1) * rowsPerPage +
										rowsPerPage,
								)
								.map((user: User) => (
									<TableRow
										key={user.username}
									>
										<TableCell
											component="th"
											scope="row"
										>
											{user.username +
												' - ' +
												user
													?.attributes
													?.common_name}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="right"
										>
											{group ? (
												(
													group?.users as User[]
												)?.filter(
													(
														_user,
													) =>
														_user.username ===
														user.username,
												)
													.length >
												0 ? (
													<IconButton
														aria-label="Delete"
														size="small"
														onClick={() =>
															handleDeleteUser(
																user.username,
															)
														}
													>
														<HighlightOffIcon
															color="secondary"
															fontSize="small"
														/>
													</IconButton>
												) : (
													<IconButton
														aria-label="Add"
														size="small"
														onClick={() =>
															handleAddUser(
																user.username,
															)
														}
													>
														<AddIcon
															color="primary"
															fontSize="small"
														/>
													</IconButton>
												)
											) : null}
										</TableCell>
									</TableRow>
								))}
						</TableBody>
					</Table>
					{loading && <LinearProgress />}
				</TableContainer>
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
							<MenuItem value={5}>5</MenuItem>
							<MenuItem value={10}>10</MenuItem>
							<MenuItem value={20}>20</MenuItem>
							<MenuItem value={50}>50</MenuItem>
						</Select>
					</Grid>
					<Grid item>
						<Pagination
							count={Math.ceil(
								users.length / rowsPerPage,
							)}
							page={page}
							color="primary"
							onChange={handlePageChange}
						/>
					</Grid>
				</Grid>
			</Grid>
		</Grid>
	);
};
