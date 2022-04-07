import { config } from "dotenv";
config();
import { anonKey, supabaseURL } from "../env";
import { spawnSync } from "child_process";

import path from "path";
async function main() {
  const url = new URL(`${supabaseURL}/rest/v1/?apikey=${anonKey}`);
  url.toString(); //?
  const res = spawnSync("npx", [
    "openapi-typescript",
    url.toString(),
    "--output",
    `${path.resolve(__dirname, "../schemas-and-types/definitions.ts")}`,
  ]);
  console.log(res.stdout.toString());
  console.log(res.stderr.toString());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
