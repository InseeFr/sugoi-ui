# Editor Config (vscode)

We use the basic configuration from airbnb

- Install prettier extension
- Install eslinter extension
- Add this to your settings.json
     ```json
     "editor.formatOnSave": true,
     "[typescriptreact]": {
         "editor.formatOnSave": false,
         "editor.codeActionsOnSave": {
             "source.fixAll.eslint": true
         }
     }
     ```
- run `npm run lint` to lint the entire project
- run `npm run lint-fix` to solve problem
