import { Sequelize } from "sequelize-typescript";
import { databaseConfig } from "../../config";
import { mySqlOptions, sqliteMemoryOptions, sqliteOptions } from "./config";
import User from "./entities/user";
import Document from "./entities/document";
import Page from "./entities/page";

let dbConnection: Sequelize;
switch (databaseConfig.dbDialect) {
  case "sqlite":
    dbConnection = new Sequelize(sqliteOptions);
    break;
  case "sqliteMemory":
    dbConnection = new Sequelize(sqliteMemoryOptions);
    break;
  case "mysql":
    dbConnection = new Sequelize(mySqlOptions);
    break;
  case "mssql":
    dbConnection = new Sequelize(
      databaseConfig.dbName,
      databaseConfig.dbUser,
      databaseConfig.dbPassword,
      {
        host: databaseConfig.dbHost,
        dialect: "mssql",
        dialectOptions: {
          options: {
            encrypt: true, // Required for Azure
            trustServerCertificate: false, // For secure connection
            enableArithAbort: true, // Required by Azure
          },
        },
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
        logging: false, // Disable logging; default: console.log
      },
    );
    break;
  default:
    throw Error("Database dialect was not defined!");
}

// Start the authentication
dbConnection
  .authenticate()
  .then(() => {
    // console.log('Database authentication has been established successfully.');
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
    throw new Error(`Unable to connect to the database: ${err}`);
  });

/* Add all entities to repository */
dbConnection.addModels([__dirname + "/entities/"]);
// Migrate all models to database or do anything due they was already created
if (databaseConfig.addModels) {
  try {
    // Sync all models
    dbConnection.sync();
    console.log("Database models was syncronized successfully!");
  } catch (error: any) {
    console.error("Error to database models:", { error });
  }
}

class DbContext {
  public dbConnection: Sequelize = dbConnection;
  public Users = User;
  public Documents = Document;
  public Pages = Page;
}

export default new DbContext();
