import { host } from "../env";
import S from "fluent-json-schema";

export interface Header {
  "Content-Type"?: string;
  Authorization?: string;
}

export const headerSchema = S.object()
  .id("postheaders")
  .title("HTTP POST Header")
  .additionalProperties(true)
  .prop("Content-Type", S.string())
  .oneOf([
    S.object().prop("Authorization", S.string().required()),
    S.object().prop("authorization", S.string().required()),
  ]);
// console.log(JSON.stringify(headerSchema.valueOf(), undefined, 2));

export const headers = headerSchema.valueOf();
