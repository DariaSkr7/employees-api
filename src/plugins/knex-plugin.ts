import { FastifyInstance } from "fastify";
import fp from "fastify-plugin";
import { Knex } from "knex";
import getKnexInstance from "../db/knex";

async function knexPlugin(fastify: FastifyInstance) {
  const knexInstance = getKnexInstance();
  console.log("💾 knex initialized....");
  fastify.decorate("excel", knexInstance);
}

export default fp(knexPlugin, {
  name: "excel",
});

declare module "fastify" {
  interface FastifyInstance {
    excel: Knex;
  }
}
