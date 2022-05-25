import { Env } from "@humanwhocodes/env";
const env = new Env();
const jwtSecret = env.require("JWT_SECRET");
const host = env.require("HOST");
const port = parseInt(env.require("PORT"), 10);
const supabaseURL = env.require("SUPABASE_URL");
const serviceRoleKey = env.require("SUPABASE_SERVICE_ROLE_KEY");
const anonKey = env.require("SUPABASE_ANON_KEY");

if (anonKey === undefined) {
  throw new Error("ANON_KEY is not defined");
}
if (serviceRoleKey === undefined) {
  throw new Error("SERVICE_ROLE_KEY is not defined");
}
if (supabaseURL === undefined) {
  throw new Error("SUPABASE_URL is not defined");
}

if (jwtSecret === undefined) {
  throw new Error("JWT_SECRET is not defined");
}
if (host === undefined) {
  throw new Error("HOST is not defined");
}
if (port === undefined || isNaN(port)) {
  throw new Error("PORT is not defined or NaN");
}

export { host, port, jwtSecret, serviceRoleKey, anonKey, supabaseURL };
