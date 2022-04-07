import { port, host } from "./env";
import { buildServer } from "./server";
const server = buildServer();
async function main(): Promise<void> {
  server.listen({ port, host }, (err) => {
    if (err) {
      console.error(err);
      process.exit(1);
    } else {
      //
      console.log(`Server listening on ${host}:${port}`);
    }
  });
}

main().catch(console.error);
