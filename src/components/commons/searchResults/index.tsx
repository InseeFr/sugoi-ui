import { Paper } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React from 'react';
interface props {
	data: any;
	columns: any;
}

export const SearchResults = ({ data, columns }: props) => {
	const options = {
		responsive: 'simple' as any,
		selectableRowsHideCheckboxes: true,
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
