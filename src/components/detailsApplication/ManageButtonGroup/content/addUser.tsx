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
import useGetUsers from '../../../../hooks/user/useGetUsers';
import { Group } from '../../../../model/api/group';
import User from '../../../../model/api/user';

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
	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
	};
	const handleSearchUser = (e: any) => {
		setSearch(e.target.value);
		execute(realm, {
			identifiant: e.target.value,
			nomCommun: e.target.value,
			typeRecherche: 'OR',
		});
	};
	return (
		<Grid
			container
			direction="column"
			justify="center"
			alignItems="stretch"
			spacing={1}
		>
			<Grid item xs={12}>
				<TextField
					id="application-search-textfield"
					label="Votre recherche"
					variant="outlined"
					onChange={handleSearchUser}
					value={search}
					fullWidth
				/>
			</Grid>
			<Grid item xs={12}>
				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell
									align="center"
									padding="default"
								>
									Utilisateurs
								</TableCell>
								<TableCell
									align="right"
									padding="default"
								>
									Action
								</TableCell>
							</TableRow>
						</TableHead>
						{loading && <LinearProgress />}
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
											{group?.users.filter(
												(
													_user,
												) =>
													_user.username ===
													user.username,
											).length >
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
											)}
										</TableCell>
									</TableRow>
								))}
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
