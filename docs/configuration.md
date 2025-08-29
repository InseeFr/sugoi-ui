## Configuration

### Development

When you first launch the app, please run the following command:

- `yarn` we expect to be also compatible with npm
- `yarn start` to launch the app

To configure the app we use a `configuration.json` in public folder. You can override the default configuration file used by doing the following steps:

- Create a `.env.local`
- Add the following `VITE_NAME_APP_CONFIG_FILE` it will allow you to change the default configuration file. We recommend to insert this : VITE_NAME_APP_CONFIG_FILE=configuration-local.json
- Then create the `configuration-local.json` inside the public folder and declare var for your development.

Sugoi-ui is a pure frontend app and it will not do a lot if you don't launch sugoi-api even if a fake api mode is possible by declaring the following in the `.env` (or `.env.local`): `VITE_FAKE_API = true`.

### Deploy

#### Container

All vars declared in the `configuration.json` can also be override when running the app in a container by passing them as environment variable.
