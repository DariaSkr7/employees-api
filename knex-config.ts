export default {
    development: {
        client: "mysql2",
        version: "8.0",
        migrations: {
            directory: "./src/db/migrations",
        },
        seeds: {
            directory: "./src/db/seeds",
        },
        connection: {
            host: "localhost",
            user: "root",
            password: "password",
            database: "employees",
        },
    },
};
