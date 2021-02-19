import { Button, Paper } from '@material-ui/core';
import Tooltip from '@material-ui/core/Tooltip';
import AddIcon from '@material-ui/icons/Add';
import MUIDataTable from 'mui-datatables';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface props {
	data: any;
	columns: any;
	handleClickAdd: () => void;
}

export const SearchResults = ({ data, columns, handleClickAdd }: props) => {
	const { t } = useTranslation();
	const options = {
		responsive: 'simple' as any,
		selectableRowsHideCheckboxes: true,
		customToolbar: () => {
			return <CustomToolBar handleClick={handleClickAdd} />;
		},
		textLabels: {
			body: {
				noMatch: t(
					'commons.search_result.textLabels.body.noMatch',
				),
				toolTip: t(
					'commons.search_result.textLabels.body.toolTip',
				),
			},
			pagination: {
				next: t(
					'commons.search_result.textLabels.pagination.next',
				),
				previous: t(
					'commons.search_result.textLabels.pagination.previous',
				),
				rowsPerPage: t(
					'commons.search_result.textLabels.pagination.rowsPerPage',
				),
				displayRows: t(
					'commons.search_result.textLabels.pagination.displayRows',
				),
			},
			toolbar: {
				search: t(
					'commons.search_result.textLabels.toolbar.search',
				),
				downloadCsv: t(
					'commons.search_result.textLabels.toolbar.downloadCsv',
				),
				print: t(
					'commons.search_result.textLabels.toolbar.print',
				),
				viewColumns: t(
					'commons.search_result.textLabels.toolbar.viewColumns',
				),
				filterTable: t(
					'commons.search_result.textLabels.toolbar.filterTable',
				),
			},
			filter: {
				all: t('commons.search_result.textLabels.filter.all'),
				title: t(
					'commons.search_result.textLabels.filter.title',
				),
				reset: t(
					'commons.search_result.textLabels.filter.reset',
				),
			},
			viewColumns: {
				title: t(
					'commons.search_result.textLabels.viewColumns.title',
				),
				titleAria: t(
					'commons.search_result.textLabels.viewColumns.titleAria',
				),
			},
			selectedRows: {
				text: t(
					'commons.search_result.textLabels.selectedRows.text',
				),
				delete: t(
					'commons.search_result.textLabels.selectedRows.delete',
				),
				deleteAria: t(
					'commons.search_result.textLabels.selectedRows.deleteAria',
				),
			},
		},
	};

	return (
		<Paper>
			<MUIDataTable
				title={t('commons.search_result.title')}
				data={data}
				columns={columns}
				options={options}
			/>
		</Paper>
	);
};

const CustomToolBar = ({ handleClick }: any) => {
	const { t } = useTranslation();
	return (
		<Tooltip title={'Ajouter'}>
			<Button
				disableElevation
				variant="contained"
				color="default"
				startIcon={<AddIcon />}
				aria-label="create user"
				onClick={handleClick}
			>
				{t('commons.search_result.buttons.add')}
			</Button>
		</Tooltip>
	);
};
