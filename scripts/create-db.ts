import knex from "knex";
import knexConfig from "../knex-config";

type envType = "development";
const env = (process.env.envionment as envType) ?? "development";

async function createDb() {
    const config = knexConfig[env];
    const dbName = config.connection.database;

    // @ts-ignore
    config.connection.database = undefined;

    const knexInstance = knex(config);
    await knexInstance.raw("CREATE DATABASE employees");

    console.log("✅ Database created");
    process.exit();
}

createDb();
