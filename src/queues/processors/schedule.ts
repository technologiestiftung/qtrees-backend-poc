import Queue from "bull";
import sql from "../../db";
import { definitions } from "../../schemas-and-types/definitions";
type Subscription = definitions["subscriptions"];
const handler: Queue.ProcessCallbackFunction<unknown> = async (job: any) => {
  // console.log(job.name, job.data);
  const day = new Date().getDay();
  const cron = `0 8 * * ${day}` as Subscription["cron"];
  try {
    const subscriptions = await sql<Subscription[]>`
    SELECT profile_id as id, ST_AsGeoJSON(geom) as geojson FROM subscriptions where cron = ${cron}::cron`;
    console.log(subscriptions);
    return subscriptions;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export default handler;
