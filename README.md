# SUGOI UI

The opensourcing (and documentation) is still a work in progress, please be patient :)

## Quick start

### Using docker

```
docker run -p 8080:8080 --env API_URL_CI=https://sugoi-api.yourdomain.com inseefrlab/sugoi-ui
```

### Using NodeJS

We recommend using `yarn` instead of `npm` but both should work just fine.

```
yarn
yarn start
```

## Configuration

Main configuration file is [.json](configuration.json). You can either fill it or create a `.env.local` with a env variable set to `REACT_APP_NAME_APP_CONFIG_FILE=configuration-local.json` and a `configuration-local.json` with your configuration.
