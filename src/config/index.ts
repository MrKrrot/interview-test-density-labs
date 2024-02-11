import 'dotenv/config'
import { Dialect } from 'sequelize'

const {
  DB_DIALECT: C_DB_DIALECT,
  DB_HOST: C_DB_HOST,
  DB_LOGGING: C_DB_LOGGING,
  DB_NAME: C_DB_NAME,
  DB_PASSWORD: C_DB_PASSWORD,
  DB_PORT: C_DB_PORT,
  DB_USER: C_DB_USER,
  DB_TEST_NAME: C_DB_TEST_NAME,
  NODE_ENV: C_NODE_ENV,
  PORT: C_PORT
} = process.env

const ensureEnv = (env: string | undefined, name: string) => {
  if (!env) throw new Error(`${name} env is not defined`)

  return env
}

export const DB_DIALECT = ensureEnv(C_DB_DIALECT, 'DB_DIALECT') as Dialect
export const DB_HOST = ensureEnv(C_DB_HOST, 'DB_HOST')
export const DB_LOGGING = C_DB_LOGGING === 'true'
export const DB_NAME = ensureEnv(C_DB_NAME, 'DB_NAME')
export const DB_PASSWORD = ensureEnv(C_DB_PASSWORD, 'DB_PASSWORD')
export const DB_PORT = parseInt(ensureEnv(C_DB_PORT, 'DB_PORT'))
export const DB_USER = ensureEnv(C_DB_USER, 'DB_USERNAME')
export const DB_TEST_NAME = ensureEnv(C_DB_TEST_NAME, 'DB_TEST_NAME')
export const NODE_ENV = ensureEnv(C_NODE_ENV, 'NODE_ENV')
export const PORT = ensureEnv(C_PORT, 'PORT')
