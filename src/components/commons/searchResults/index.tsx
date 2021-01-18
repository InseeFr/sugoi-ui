import { Button, Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import React from 'react';
interface props {
	data: any;
	columns: any;
	handleClickAdd: () => void;
}

export const SearchResults = ({ data, columns, handleClickAdd }: props) => {
	const options = {
		responsive: 'simple' as any,
		selectableRowsHideCheckboxes: true,
		customToolbar: () => {
			return <CustomToolBar handleClick={handleClickAdd} />;
		},
	};

	return (
		<Paper>
			<MUIDataTable
				title={'Résultat de la recherche:'}
				data={data}
				columns={columns}
				options={options}
			/>
		</Paper>
	);
};

const CustomToolBar = ({ handleClick }: any) => {
	return (
		<Tooltip title={'Ajouter'}>
			<Button
				variant="outlined"
				color="primary"
				startIcon={<AddIcon />}
				aria-label="modify user"
				onClick={handleClick}
			>
				Ajouter
			</Button>
		</Tooltip>
	);
};
