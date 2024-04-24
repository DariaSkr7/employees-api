import knex from "knex";
import knexConfig from "../../knex-config";

type envType = "development";
const env = (process.env.envionment as envType) ?? "development";

export default function getKnexInstance() {
    const config = knexConfig[env];
    const knexInstance = knex(config);

    return knexInstance;
}
