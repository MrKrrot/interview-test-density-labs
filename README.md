# Interview Test

Simple interview test for Full Stack Developer position at Density Labs.

## Table of Contents

- [Pre-requisites](#pre-requisites)
- [Installation](#installation)
- [Usage](#usage)
- [Development](#development)

<h2 id="pre-requisites">Pre-requisites</h2>

- [Node.js](https://nodejs.org/en/) (>= v18.15.0)
- Relational database (e.g. MySQL, PostgreSQL, SQLite, MariaDB, MSSQL)

<h2 id="installation">Installation</h2>

1. Clone the repository:

```bash
git clone https://github.com/MrKrrot/interview-test-density-labs.git
```

2. Install dependencies:

```bash
npm install # Install server & client dependencies
```

3. Set up environment variables:

- `DB_DIALECT`: Database dialect (e.g. mysql, postgres, sqlite, mariadb, mssql)
- `DB_HOST`
- `DB_LOGGING`: Enable or disable logging (true, false)
- `DB_NAME`
- `DB_PASSWORD`
- `DB_PORT`
- `DB_USER`
- `NODE_ENV`: Environment (development, production)
- `PORT`: Server port
- `VITE_API_URL`: API URL (e.g. http://localhost:5000) (**NOTE**: This environment variable is for the client)

<h2 id="usage">Usage</h2>

```bash
# Build client & server
npm run build:api
npm run build:client
# Run server & client (production mode)
npm run start:api
npm run start:client
```

<h2 id="development">Development</h2>

```bash
# Run server & client (development mode)
npm run dev:api
npm run dev:client
```
