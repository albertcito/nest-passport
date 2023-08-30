## NestJS

## Requitements
- Node
- PostgreSQL

## To install:
- Clone this project
- `cp .env.example .env` Create .env file
- `yarn install` Installs all the dependencies for your project
- `docker-compose up -d` Run database postgress in docker with

## Install DB
In order to install DB the code must be compiled. So if you are working with migration
remember to run `yarn build` first.
- `yarn db migration:run` Build code an migrate  database tables.
- `yarn seed:run` To populate the DB with faker data. Using [typeorm-extension](https://github.com/tada5hi/typeorm-extension)

## Reload DB
- Remove all tables and schemas: `yarn db schema:drop`
- [Install DB](#install-db) again

## Run the server
- Run `yarn start:dev`
- Go to http://localhost:4000/graphql/
- Run this query
```graphql
mutation {
  login(email:"me@albertcito.com", password:"Hola12345") {
    token
  }
}
```
- Add the token in HTTP HEADERS tab to run the private queries:
```json
{
  "Authorization": "Bearer ${token}"
}
```

## Contribute

For Bible formating, please review: [Unified Standard Format Markers](https://ubsicap.github.io/usfm/chapters_verses/index.html)

Before to send a PR please do it:
- Run `yarn test` to run the test in dev environment.
- Run `yarn build` to ensure build is working.
- Run `yarn prod:test` to run the test in with the js files.
- Run `yarn eslint --fix` to validate the code style.
- Run `yarn ejslint --fix` to validate the ejs files.

## Email Debug
- To debug email in your localhost use this software: https://nodemailer.com/app/
