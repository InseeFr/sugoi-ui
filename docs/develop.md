## Technics choice

For this projet we choose to use only typescript language and material ui as ui-component library. We try to support as much as we can mobile device.

We also try to respect the pattern SOC (separation of concerns). As we can do in java we try to separe the pure ui from the technics parts.

That's why we use some custom hooks to fetch api or to make the formular.

## useForm hooks

the useForm hook is a house made hook for manage our generated formular for the creation or the modification of an entity.

`useForms = (initialValues: any)`

### Arguments

the initial value of the form

### Returns

- iFormValues: the initial form values
- updateIFormValues: a function to update initial values
- formValues: the actual values
- handleChange: a function to update values
- handleReset: a function to reset actual values to the initial one.

## web Request hook

Each function to send or to get data from the api is encapsulate in a hook. this hook exposed the result, and if it's necessary a function to update or retrieve new data.

## Package description

- api: all function to retrieve data from api
- component: pure ui components
- hooks: custom hooks used in the project
- i18n: internationalization (work in progress)
- model: sugoi object model
- redux: the redux implementation
- routes
- utils : other function
