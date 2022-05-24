// import { RedisConnection, Worker } from "bullmq";
// import { FastifyInstance } from "fastify";

// export async function createWorker(
//   _queueName: string,
//   server: FastifyInstance,
// ): Promise<Worker> {
//   const worker = new Worker("foo", async (job) => {
//     // Will print { foo: 'bar'} for the first job
//     // and { qux: 'baz' } for the second.
//     server.log.info(job.data);
//   });
//   await worker.waitUntilReady();
//   worker.on("failed", (job, err) => {
//     server.log.error(`${job.id} has failed with ${err.message}`);
//   });
//   worker.on("completed", (job) => {
//     server.log.info(`${job.id} has completed!`);
//   });

//   return worker;
// }
