import getKnexInstance from "../src/db/knex";

async function seedDb() {
    const knex = getKnexInstance();
    knex.seed.run();

    console.log("✅ Database seeded");
    process.exit();
}

seedDb();
