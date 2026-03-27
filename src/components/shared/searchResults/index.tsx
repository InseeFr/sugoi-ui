import { Paper, Box, Tooltip, IconButton } from '@mui/material';
import { MRT_Localization_FR } from 'material-react-table/locales/fr';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';
import DownloadIcon from '@mui/icons-material/Download';

interface Props {
	data: any;
	columns: any;
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

	const columnsReactDataTable = useMemo(() => columns, [columns]);

	const table = useMaterialReactTable({
		columns: columnsReactDataTable,
		data,
		muiTableBodyRowProps: ({ row }: any) => ({
			onClick: () => {
				handleClickOnRow(row.original);
			},
		}),
		localization: MRT_Localization_FR,
		renderTopToolbarCustomActions: () => {
			return (
				<Box sx={{ ml: 'auto' }}>
					{downloadable && (
						<Tooltip
							title={t(
								'commons.search_result.textLabels.toolbar.downloadCsv',
							)}
						>
							<IconButton onClick={handleDownload}>
								<DownloadIcon />
							</IconButton>
						</Tooltip>
					)}
				</Box>
			);
		},
	});

	return (
		<Paper>
			<MaterialReactTable table={table} />
		</Paper>
	);
};

SearchResults.defaultProps = {
	downloadable: false,
};
