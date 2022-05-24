import Queue from "bull";
import { redisURL } from "../env";
import path from "path";
const scheduleQueue = new Queue("schedule", redisURL);
const scheduleJobName = "schedule";

export function runQueues() {
  scheduleQueue.process(
    scheduleJobName,
    5,
    path.join(__dirname, "./processors/schedule.js"),
  );
  scheduleQueue.on("error", (error) => {
    console.error(error);
  });
  scheduleQueue.on("complete", (job, result) => {
    console.log("complete", job.name, job.data, result);
  });

  scheduleQueue.add(
    scheduleJobName,
    { type: "schedule" },
    // { repeat: { cron: "* * * * *" } },
  );
}
