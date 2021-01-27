## Available field in formular

the formular generated to view or create an entity is auto-generated. Indeed each realm/userStorage can have diiferent field. We build a way to autogenerate this form according to a json file (send by api).

This file is list of fields represented as the following:

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

For the moment, fields can be a string, group, habilitation or a list.
