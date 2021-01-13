import { IconButton, Paper } from '@material-ui/core';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import { useHistory } from 'react-router-dom';
import VisibilityIcon from '@material-ui/icons/Visibility';
interface props {
	data: any;
	realm: string;
	type: 'Users' | 'Organizations';
}

export const SearchResults = ({ data, realm, type }: props) => {
	const { push } = useHistory();
	const columns = [
		{
			name: 'username',
		},
		{
			name: 'mail',
		},
		{
			name: 'communName',
		},
		{
			name: 'Voir plus',
			options: {
				filter: false,
				sort: false,
				empty: true,
				customBodyRenderLite: (dataIndex: any) => {
					return (
						<IconButton
							color="primary"
							aria-label="add to shopping cart"
							onClick={() => {
								const link =
									type === 'Users'
										? '/realm/' +
										  realm +
										  '/' +
										  'user/' +
										  data[dataIndex]
												.username
										: '/realm/' +
										  realm +
										  '/' +
										  'organization/' +
										  data[dataIndex]
												.username;
								push(link);
							}}
						>
							<VisibilityIcon />
						</IconButton>
					);
				},
			},
		},
	];

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
