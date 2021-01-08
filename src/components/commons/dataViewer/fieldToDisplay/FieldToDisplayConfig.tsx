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
					name: 'mail',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'attributes.mail',
					type: 'string',
					modifiable: true,
				},
				{
					name: 'truc',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'truc',
					type: 'list',
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
		propriete: {},
	},
};
