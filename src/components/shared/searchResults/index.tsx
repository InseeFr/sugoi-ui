import { Paper } from '@mui/material';
import MUIDataTable, { MUIDataTableOptions } from 'mui-datatables';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
	data: any;
	columns: any;
	handleClickAdd: () => void;
	handleClickOnRow: any;
	handleDownload?: any;
	downloadable?: boolean;
}

export const SearchResults = ({
	data,
	columns,
	handleClickOnRow,
	handleDownload,
	downloadable,
}: Props) => {
	const { t } = useTranslation();
	const options: MUIDataTableOptions = {
		responsive: 'simple' as any,
		selectableRowsHideCheckboxes: true,

		onRowClick: (rowData: any) => handleClickOnRow(rowData[0]),
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
		selectableRowsOnClick: false,
		downloadOptions: { filename: 'export.csv' },
		onDownload: function download(
			_buildHead,
			_buildBody,
			_columns,
			_data,
		) {
			handleDownload();
			// Must return false to delegate the download to handleDownload
			return false;
		},
		print: false,
		download: downloadable,
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

SearchResults.defaultProps = {
	downloadable: false,
};
