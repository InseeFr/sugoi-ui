export default {
	type: 'user',
	left: {
		basic: {
			title: 'Informations principales',
			description: 'trololol',
			collapsible: false,
			type: 'panel',
			fields: [
				{
					name: 'Identifiant',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'username',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'Nom commun',
					helpTextTitle: ' Nom commun du contact ',
					helpText:
						" Il servira pour le rechercher à travers l'annuaire. Caractères autorisés : alphabétiques chiffres apostrophes espaces tirets",
					path: 'attributes.commun_name',
					type: 'string',
					modifiable: true,
				},
				{
					name: 'Nom',
					helpTextTitle: ' Nom du contact ',
					helpText:
						'Caractères autorisés : alphabétiques chiffres apostrophes espaces tirets',
					path: 'lastname',
					type: 'string',
					modifiable: true,
				},
				{
					name: 'Prenom',
					helpTextTitle: ' Prénom du contact ',
					helpText:
						'Caractères autorisés : alphabétiques chiffres apostrophes espaces tirets',
					path: 'name',
					type: 'string',
					modifiable: true,
				},
				{
					name: 'Adresse e-mail',
					helpTextTitle:
						' Adresse de messagerie du contact ',
					helpText:
						" Elle servira pour la rechercher à travers l'annuaire. ",
					path: 'username',
					type: 'string',
					modifiable: true,
				},
				{
					name: 'Numéro de téléphone',
					helpTextTitle: ' Numéro de téléphone du contact ',
					helpText:
						'Entre 1 et 25 caractères numériques, points, tirets, parenthèses, signe plus, et espaces uniquement. ',
					path: 'attributes.phone_number',
					type: 'string',
					modifiable: true,
				},
				{
					name: 'Description',
					path: 'username',
					type: 'string',
					modifiable: true,
				},
			],
		},
	},
	right: {
		adress: {
			title: 'Adresse',
			description: 'trololol',
			collapsible: true,
			type: 'panel',
			fields: [
				{
					name: 'ligne1',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne1',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'ligne2',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne2',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'ligne3',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne3',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'ligne4',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne4',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'ligne5',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne5',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'ligne6',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne6',
					type: 'string',
					modifiable: false,
				},
				{
					name: 'ligne7',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'address.ligne7',
					type: 'string',
					modifiable: false,
				},
			],
		},
		propriete: {
			title: 'Propriété',
			description: 'trololol',
			collapsible: false,
			type: 'panel',
			fields: [
				{
					name: 'Propriété',
					helpTextTitle: ' Propriétés du contact',
					helpText:
						'Ajouter une propriété à saisir en cliquant sur "Ajouter un champ". Supprimer une propriété saisie en vidant le champ ou en cliquant sur la croix rouge à droite du champ. Aucune limite d\'ajout.',
					path: 'attributes.propriété',
					type: 'list',
					addTitle: 'Ajouter une propriété',
					deleteTitle: 'Supprimer une propriété',
					textButton: 'Gérer les propriétés',
					modifiable: true,
				},
			],
		},
	},
};
