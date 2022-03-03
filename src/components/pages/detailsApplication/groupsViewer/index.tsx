import {
	Grid,
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
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { useState } from 'react';
import { Group } from 'src/lib/model/api/group';
import { ChipButton, ChipPerson } from './../chip';
interface Props {
	groups: Group[];
	realm: string;
	loading: boolean;
	updateComponent?: (group: Group) => JSX.Element;
	deleteComponent?: (group: Group) => JSX.Element;
	paginate: boolean;
}

export const GroupsViewer = ({
	realm,
	groups,
	loading,
	updateComponent,
	deleteComponent,
	paginate,
}: Props) => {
	const [rowsPerPage, setRowsPerPage] = useState(10);
	const [page, setPage] = useState(1);

	const handleChange = (
		_event: React.ChangeEvent<unknown>,
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
			<Grid item>
				<TableContainer component={Paper}>
					<Table size="small" aria-label="a dense table">
						<TableHead key="table-head">
							<TableRow key="table-head-row-1">
								<TableCell
									align="left"
									padding="normal"
								>
									Groupe
								</TableCell>
								<TableCell
									align="left"
									padding="normal"
								>
									Descriptions
								</TableCell>
								<TableCell
									align="left"
									padding="normal"
								>
									Utilisateurs
								</TableCell>
								<TableCell
									align="left"
									padding="normal"
								>
									Actions
								</TableCell>
							</TableRow>
						</TableHead>
						<TableBody key="table-body">
							{groups?.length > 0 && !loading ? (
								groups
									.slice(
										(page - 1) *
											rowsPerPage,
										(page - 1) *
											rowsPerPage +
											rowsPerPage,
									)
									.map((group: any, i) => (
										<TableRow
											key={
												'table-body-row-' +
												i
											}
										>
											<TableCell
												component="th"
												scope="row"
											>
												{
													group.name
												}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{
													group.description
												}
											</TableCell>
											<TableCell
												component="th"
												scope="row"
											>
												{group?.users?.map(
													(
														user: any,
														i: any,
													) => {
														return (
															(i <
																5 && (
																<ChipPerson
																	user={
																		user
																	}
																	realm={
																		realm
																	}
																	key={
																		'chip-' +
																		i
																	}
																/>
															)) ||
															(i ===
																5 && (
																<ChipButton
																	group={
																		group
																	}
																	realm={
																		realm
																	}
																	key={
																		'chip-button' +
																		i
																	}
																/>
															))
														);
													},
												)}
											</TableCell>
											<TableCell>
												{updateComponent &&
													updateComponent(
														group,
													)}
												{deleteComponent &&
													deleteComponent(
														group,
													)}
											</TableCell>
										</TableRow>
									))
							) : (
								<TableRow key="no-data">
									<TableCell
										component="th"
										scope="row"
									>
										Aucun groupe
									</TableCell>
								</TableRow>
							)}
						</TableBody>
					</Table>
					{loading && <LinearProgress />}
				</TableContainer>
			</Grid>
			{paginate && (
				<Grid item>
					<Grid
						container
						direction="row"
						justifyContent="space-between"
						alignItems="center"
						spacing={3}
					>
						<Grid item>
							<Grid item>
								<Select
									value={rowsPerPage}
									onChange={(e: any) =>
										setRowsPerPage(
											e.target
												.value,
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
						</Grid>
						<Pagination
							count={Math.ceil(
								groups.length / rowsPerPage,
							)}
							page={page}
							color="primary"
							onChange={handleChange}
						/>
					</Grid>
				</Grid>
			)}
		</Grid>
	);
};

GroupsViewer.defaultProps = {
	paginate: true,
};
