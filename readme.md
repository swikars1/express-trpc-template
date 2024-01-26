# Turso Migrate not supported

Prisma Migrate and Introspection workflows are currently not supported when working with Turso. This is because Turso uses HTTP to connect to your database, which Prisma Migrate doesn't support.

To update your database schema:

Generate a migration file using prisma migrate dev against a local SQLite database:

`npx prisma migrate dev --name init`

Apply the migration using Turso's CLI:

`turso db shell turso-prisma-db < ./prisma/migrations/20230922132717_init/migration.sql`

Replace `20230922132717_init` with the name of your migration.

For subsequent migrations, repeat the above steps to apply changes to your database. This workflow does not support track the history of applied migrations to your remote database.
