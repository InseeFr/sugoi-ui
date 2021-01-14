# Available field in formular

Field's form are generated according to a file. this file let the user to choose which field must be displayed for an entity of a realm.

```json
{
	"name": "Identifiant",
	"helpTextTitle": "Identifiant unique du contact",
	"helpText": "Il servira pour le rechercher à travers l'annuaire.",
	"path": "username",
	"type": "string",
	"modifiable": false,
	"tag": "main"
}
```

For the moment, fields allowed are:

| attributes    | Optionnal | Description |
| ------------- | :-------: | ----------: |
| name          |    no     |       value |
| helpTextTitle |    yes    |       value |
| helpText      |    yes    |       value |
| path          |    no     |       value |
| type          |    no     |       value |
| modifiable    |    yes    |       value |
| tag           |    no     |       value |
| addTitle      |    yes    |       value |
| deleteTitle   |    yes    |       value |
