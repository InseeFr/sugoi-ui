import React from 'react';
import MaterialTable from 'material-table';
import { useHistory, useParams } from 'react-router-dom';
interface props {
	datasource: any;
	type: 'user' | 'organization';
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
	const { realm } = useParams<any>();
	const { datasource, type } = props;
	const { push } = useHistory();
	return (
		<MaterialTable
			columns={columns}
			data={datasource}
			title="Résultat"
			actions={[
				{
					icon: 'visibility',
					tooltip: 'View user',
					onClick: (event, rowData: any) => {
						push(
							'/realm/' +
								realm +
								'/' +
								type +
								'/' +
								rowData.username,
						);
					},
				},
			]}
			options={{
				actionsColumnIndex: -1,
			}}
			localization={{
				body: {
					emptyDataSourceMessage:
						"Pas d'enregistreent à afficher",
					addTooltip: 'Ajouter',
					deleteTooltip: 'Supprimer',
					editTooltip: 'Editer',
					filterRow: {
						filterTooltip: 'Filtrer',
					},
					editRow: {
						deleteText:
							'Voulez-vous supprimer cette ligne?',
						cancelTooltip: 'Annuler',
						saveTooltip: 'Enregistrer',
					},
				},
				grouping: {
					placeholder: "Tirer l'entête ...",
					groupedBy: 'Grouper par:',
				},
				header: {
					actions: 'Actions',
				},
				pagination: {
					labelDisplayedRows: '{from}-{to} de {count}',
					labelRowsSelect: 'lignes',
					labelRowsPerPage: 'lignes par page:',
					firstAriaLabel: 'Première page',
					firstTooltip: 'Première page',
					previousAriaLabel: 'Page précédente',
					previousTooltip: 'Page précédente',
					nextAriaLabel: 'Page suivante',
					nextTooltip: 'Page suivante',
					lastAriaLabel: 'Dernière page',
					lastTooltip: 'Dernière page',
				},
				toolbar: {
					addRemoveColumns:
						'Ajouter ou supprimer des colonnes',
					nRowsSelected: '{0} ligne(s) sélectionée(s)',
					showColumnsTitle: 'Voir les colonnes',
					showColumnsAriaLabel: 'Voir les colonnes',
					exportTitle: 'Exporter',
					exportAriaLabel: 'Exporter',
					searchTooltip: 'Chercher',
					searchPlaceholder: 'Chercher',
				},
			}}
		/>
	);
};
