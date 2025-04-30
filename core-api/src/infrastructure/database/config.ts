import SQLite from 'sqlite3';

import { Options } from 'sequelize';
import { databaseConfig } from "../../config";

export const sqliteOptions: Options = {
  database: databaseConfig.dbName,
  dialect: 'sqlite',
  username: databaseConfig.dbUser,
  password: databaseConfig.dbPassword,
  storage: process.env.SQLITE_DB_PATH, 
  dialectOptions: {
    // Your sqlite3 options here
    // for instance, this is how you can configure the database opening mode:
    mode: SQLite.OPEN_READWRITE | SQLite.OPEN_CREATE | SQLite.OPEN_FULLMUTEX,
  },
}

export const sqliteMemoryOptions: Options = {
  database: databaseConfig.dbName,
  dialect: 'sqlite',
  username: databaseConfig.dbUser,
  password: databaseConfig.dbPassword,
  storage: ':memory:',
}

export const mySqlOptions: Options = {
  host: databaseConfig.dbHost,
  username: databaseConfig.dbUser,
  password: databaseConfig.dbPassword,
  port: databaseConfig.dbPort,
  database: databaseConfig.dbName,
  dialect: 'mysql'
}
