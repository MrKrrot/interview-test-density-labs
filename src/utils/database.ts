import { Sequelize } from 'sequelize'
import {
  DB_DIALECT,
  DB_HOST,
  DB_LOGGING,
  DB_NAME,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
  DB_TEST_NAME,
  NODE_ENV
} from '@config'

export const sequelize = new Sequelize(
  NODE_ENV === 'test' ? DB_TEST_NAME : DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    host: DB_HOST,
    port: DB_PORT,
    dialect: DB_DIALECT,
    logging: DB_LOGGING
  }
)
