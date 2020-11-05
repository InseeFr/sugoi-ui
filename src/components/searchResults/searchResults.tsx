import React from 'react';
import { Link } from 'react-router-dom';

interface props {
	datasource: any;
}

const columns = [
	{
		title: 'username',
		dataIndex: 'username',
		key: 'username',
	},
	{
		title: 'mail',
		dataIndex: 'mail',
		key: 'mail',
	},
	{
		title: 'NomCommun',
		dataIndex: 'address',
		key: 'address',
	},
	{
		title: 'Action',
		key: 'action',
		render: (__: any, record: any) => (
			<Link
				to={{
					pathname: '/detail/' + record.name,
				}}
			>
				voir plus
			</Link>
		),
	},
];

export const SearchResults = (props: props) => {
	const { datasource } = props;
	return <div>Table</div>;
};
