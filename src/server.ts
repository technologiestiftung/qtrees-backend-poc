import "make-promises-safe";

import fastify, { FastifyReply, FastifyRequest } from "fastify";
import fastifyJwt from "fastify-jwt";
import fastifyAuth from "fastify-auth";
import fastifySensible from "fastify-sensible";

import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { definitions } from "./schemas-and-types/definitions";
// Create a single supabase client for interacting with your database
import { jwtSecret, host, serviceRoleKey, supabaseURL } from "./env";
import { schema } from "./schemas-and-types/schema";
import {
  Params,
  Querystring,
  Response as HttpPostResponse,
  Body as HttpPostBody,
  Header,
  JWTPayload,
} from "./schemas-and-types/types";

declare module "fastify" {
  interface FastifyInstance {
    verifyJWT: (request: FastifyRequest, reply: FastifyReply) => Promise<void>;
    supabase: SupabaseClient;
  }
}

type UserRole = definitions["user_roles"];

const supabase = createClient(supabaseURL, serviceRoleKey);
export function buildServer() {
  const server = fastify({});
  server
    .register(fastifySensible)
    .register(fastifyAuth)
    .register(fastifyJwt, {
      secret: jwtSecret,
    })
    .decorate(
      "verifyJWT",
      async (request: FastifyRequest, _reply: FastifyReply) => {
        await request.jwtVerify();
      }
    )
    .decorate("supabase", supabase)
    .after(() => {
      server.get("/", async (request, reply) => {
        reply.send({ hello: "world" });
      });
      server.get("/trees", async (request, reply) => {
        reply.send([
          { id: 1, type: "cypress" },
          { id: 2, type: "maple" },
        ]);
      });
      server.route<{
        Params: Params;
        Response: HttpPostResponse;
        Body: HttpPostBody;
        Querystring: Querystring;
        Header: Header;
      }>({
        schema,
        method: "POST",
        url: "/trees/:id",
        preHandler: server.verifyJWT,
        handler: async (request, reply) => {
          const decoded = await request.jwtVerify<JWTPayload>();
          const { sub } = decoded;
          const { data, error } = await server.supabase
            .from<UserRole>("user_roles")
            .select("*")
            .eq("user_id", sub);
          if (error) {
            throw server.httpErrors.internalServerError(error.message);
          }
          if (data === null || data.length === 0) {
            throw server.httpErrors.forbidden(
              "You dont have the right permissions"
            );
          }
          if (!["admin", "editor"].includes(data[0].role)) {
            throw server.httpErrors.forbidden(
              "You dont have the right permissions"
            );
          }
          console.log("write to db");
          const { id } = request.params;
          reply.status(201).send({ id });
        },
      });
    });

  return server;
}
