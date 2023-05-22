# Migrations, Models and Seeds
Database migrations, models and seeding are managed using [`sequelize-cli`](https://www.npmjs.com/package/sequelize-cli). The [`.sequelizerc`](../.sequelizerc) file specifies the configuration used by this package.

# Adding a new migration
Documentation can be found [here](https://sequelize.org/docs/v6/other-topics/migrations). The instructions have been summarised and adapted for this project below:

## Models
A model can be created using the below command. The format of the produced file should be left as-is, for consistency.

```
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

At the time of writing, this command only accepts the field names and data types.

The models are created at [`/src/db/models`](../src/db/models). Open the relevant model file and add additional field attributes as required. The `modelName` option should be changed to [snake case](https://en.wikipedia.org/wiki/Snake_case) so that, for example, `AuthToken` would become `auth_token`.

## Migrations
The above command should also have created a migration script at [`/db/migrations`](./migrations). By default, `sequelize-cli` pluralises all table names. It is safe to manually edit the migration file before it is used, so edit the migration file to make sure table names are not pluralised. For example, `auth_tokens` should be changed to `auth_token`.

## Seeding
Not implemented yet.

# Running the migrations
The migrations are automatically run by the `app` container on startup:

```
docker-compose up --build -d`
```