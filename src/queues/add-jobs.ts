// import  Queue from "bull";

// export async function addJobs({
//   queue,
//   name,
//   data,
//   jobOptions,
// }: {
//   name: string;
//   queue: Queue;
//   data: unknown;
//   jobOptions?: JobsOptions;
// }): Promise<void> {
//   await queue.add(name, data, {
//     ...jobOptions,
//     removeOnComplete: true,
//     removeOnFail: true,
//   });
// }
