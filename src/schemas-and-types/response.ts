export interface Response {}
export const response = {
  "2xx": {
    description: "Created",
    type: "object",

    properties: {
      id: {
        type: "integer",
      },
      name: {
        type: "string",
      },
    },
  },
};
