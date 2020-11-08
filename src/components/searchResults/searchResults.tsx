import MaterialTable from 'material-table';
import React from 'react';
interface props {
	datasource: any;
}

const columns = [
	{
		title: 'username',
		field: 'username',
	},
	{
		title: 'mail',
		field: 'mail',
	},
	{
		title: 'NomCommun',
		field: 'communName',
	},
];

export const SearchResults = (props: props) => {
	const { datasource } = props;
	return (
		<MaterialTable
			columns={columns}
			data={datasource}
			title="Résultat"
			actions={[
				{
					icon: 'visibility',
					tooltip: 'View user',
					onClick: (event, rowData) => {
						// Do save operation
					},
				},
			]}
			options={{
				actionsColumnIndex: -1,
			}}
		/>
	);
};
