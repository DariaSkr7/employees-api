import Fastify from "fastify";
import routes from "./routes";
import knexPlugin from "./plugins/knex-plugin";
import redisPlugin from "./plugins/redis-plugin";

const fastify = Fastify();
fastify.register(redisPlugin);
fastify.register(knexPlugin);
fastify.register(routes);

async function main() {
    try {
        const address = await fastify.listen({ port: 3000, host: "0.0.0.0" });
        console.log("nice 💪 " + address);
    } catch (e) {
        console.log("oh no 🫡");
        console.log("error 🫡");
        console.log((e as Error).message);
    }
}

main();