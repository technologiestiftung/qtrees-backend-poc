// db.js
import postgres from "postgres";
import { databaseURL } from "./env";

const sql = postgres(databaseURL); // will use psql environment variables

export default sql;
