import {
	Grid,
	IconButton,
	MenuItem,
	Paper,
	Select,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import { Pagination } from '@material-ui/lab';
import React from 'react';
import { Group } from 'src/lib/model/api/group';

interface Props {
	appGroups: Group[];
	groups: Group[];
	handleAdd: any;
	handleDelete: any;
}

export const ManageGroup = ({
	appGroups,
	groups,
	handleAdd,
	handleDelete,
}: Props) => {
	const [rowsPerPage, setRowsPerPage] = React.useState(5);
	const [page, setPage] = React.useState(1);

	const handlePageChange = (
		event: React.ChangeEvent<unknown>,
		value: number,
	) => {
		setPage(value);
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
				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead>
							<TableRow>
								<TableCell
									align="center"
									padding="normal"
								>
									Groupes
								</TableCell>
								<TableCell
									align="right"
									padding="normal"
								>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody>
							{appGroups
								?.slice(
									(page - 1) * rowsPerPage,
									(page - 1) * rowsPerPage +
										rowsPerPage,
								)
								.map((group: Group) => (
									<TableRow
										key={group.name}
									>
										<TableCell
											component="th"
											scope="row"
										>
											{group.name}
										</TableCell>
										<TableCell
											component="th"
											scope="row"
											align="right"
										>
											{groups
												.filter(
													(
														g,
													) =>
														g !==
														null,
												)
												.map(
													(
														g: Group,
													) =>
														g.name,
												)
												.includes(
													group.name,
												) ? (
												<IconButton
													aria-label="Delete"
													size="small"
													onClick={() =>
														handleDelete(
															group.name,
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
														handleAdd(
															group.name,
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
								appGroups?.length / rowsPerPage,
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

export default ManageGroup;
