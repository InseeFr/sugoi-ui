export default {
	type: 'user',
	left: {
		basic: {
			title: 'Informations principales',
			description: 'trololol',
			collapsible: true,
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
					name: 'Identifiant',
					helpTextTitle: 'Identifiant unique du contact',
					helpText:
						"Il servira pour le rechercher à travers l'annuaire.",
					path: 'attributes.mail',
					type: 'string',
					modifiable: true,
				},
			],
		},
	},
};
