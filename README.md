# PERN Starter
Starter kit for PERN (Postgres, Express, React, and Node) stack apps with full-stack JWT-based user authentication

- Uses [`knex`](https://www.npmjs.com/package/knex) for dynamic SQL query building, database migrations and seeding
- Uses [`jsonwebtoken`](https://www.npmjs.com/package/jsonwebtoken) for user authentication and [`bcrypt`](https://www.npmjs.com/package/bcrypt) for password encryption

## Set up
- Start a new project without the repository's commit history: `git clone --depth=1 https://github.com/j3k2/pern-starter.git <your-project-name>`.
- Create .env file in the root directory with DATABASE_URL (connection string for your Postgres database) and JWT_SECRET (secret to be used for JWT signature).
- Run the initial database migration with `knex migrate:latest`.