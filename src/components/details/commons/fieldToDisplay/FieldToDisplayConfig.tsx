import {
	getElementFromAddress,
	setElementToAddress,
	getElement,
	setElement,
	getElementFromAttributes,
	setElementToAttributes,
} from '../utils';

export default {
	basic: [
		{
			name: 'Identifiant',
			helpTextTitle: 'Identifiant unique du contact',
			helpText:
				"Il servira pour le rechercher à travers l'annuaire.",
			value: 'username',
		},
		{
			name: 'Nom commun',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'atributes.common_name',
		},
		{
			name: 'Nom',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'lastName',
		},
		{
			name: 'Prenom',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'firstName',
		},
		{
			name: 'Adresse e-mail',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'mail',
		},
		{
			name: 'Numéro de téléphone',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'identifiant',
		},
		{
			name: 'Description',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'attributes.description',
		},
		{
			name: 'Organisation',
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'identifiant',
		},
		{
			name: "Timbre de l'agent",
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'attributes.insee_timbre',
		},
		{
			name: "Organisme de l'agent",
			helpText:
				"Identifiant unique du contact Il servira pour le rechercher à travers l'annuaire.",
			value: 'identifiant',
		},
	],
	address: [
		{
			name: 'Identification du destinataire',
			helpTextTitle: ' Identification du destinataire ',
			helpText: 'Exemple : M. Valéry FRONTERE',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne1',
			modifiable: false,
		},
		{
			name: 'N° appartement, boite aux lettres, étage, couloire',
			helpTextTitle:
				' N° appartement, boite aux lettres, étage, couloir ',
			helpText: 'Exemple : Appartement 12 Escalier C',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne2',
			modifiable: true,
		},
		{
			name: 'Entrée, tour, bâtiment, immeuble, résidence',
			helpTextTitle:
				' Entrée, tour, bâtiment, immeuble, résidence ',
			helpText: 'Exemple : Résidence Les Tilleuls',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne3',
			modifiable: true,
		},
		{
			name: 'Numéro et libellé de la voie',
			helpTextTitle: ' Numéro et libellé de la voie ',
			helpText: 'Exemple : 1 impasse de l Eglise',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne4',
			modifiable: true,
		},
		{
			name: 'Lieu dit ou boîte postale',
			helpTextTitle: ' Lieu dit ou boîte postale ',
			helpText: 'Exemple : AMAREINS',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne5',
			modifiable: true,
		},
		{
			name: 'Code postal et localité de destination',
			helpTextTitle: ' Code postal et localité de destination ',
			helpText: 'Exemple : 01090 FRANCHELEINS',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne6',
			modifiable: true,
		},
		{
			name: 'Pays',
			helpTextTitle: 'Pays',
			helpText: 'Exemple : FRANCE',
			getFunction: getElementFromAddress,
			setFunction: setElementToAddress,
			varName: 'ligne7',
			modifiable: true,
		},
	],
	advanced: [{}],
	rights: [{}],
};
