const getCitiesByCountryCode = {
  tags: ["Cities"],
  description: "Returns cities from a country code. Result is paginated.",
  operationId: "getCitiesByCountryCode",
  responses: {
    200: {
      description: "Cities by country code.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/City",
          },
        },
      },
    },
    401: {
      description: "Unauthorized",
    },
  },
  parameters: [
    {
      in: "path",
      name: "countryCode",
      type: "string",
      description: "ISO2 country code of the cities. (Try it out: FR)",
    },
    {
      in: "query",
      name: "page_number",
      type: "integer",
      minimum: 0,
      description:
        "Pagination: The page number of the cities received. MIN: 0 (Try it out: 0)",
    },
    {
      in: "query",
      name: "page_size",
      type: "integer",
      description:
        "Pagination: Size of the array of cities you will receive. MIN: 1, MAX:100 (Try it out: 10)",
    },
  ],
};

const getCitiesByName = {
  tags: ["Cities"],
  description:
    "Returns cities from city name. Returns cities that include the city name you are searching for. You will receive a maximum of 10 cities.",
  operationId: "getCitiesByName",
  responses: {
    200: {
      description: "Array of cities. Maximum length: 10.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Cities",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "path",
      name: "cityName",
      type: "string",
      description: "City name. (Try it out: Paris)",
    },
    {
      in: "query",
      name: "page_number",
      type: "integer",
      minimum: 0,
      description:
        "Pagination: The page number of the cities received.  MIN: 0 (Try it out: 0)",
    },
    {
      in: "query",
      name: "page_size",
      type: "integer",
      description:
        "Pagination: Size of the array of cities you will receive. MIN: 1, MAX:100 (Try it out: 10)",
    },
  ],
};

const getCitiesByCoordinates = {
  tags: ["Cities"],
  description: "Returns closest cities from coordinates entered.",
  operationId: "getCitiesByCoordinates",
  responses: {
    200: {
      description: "Array of closest cities from coordinates.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Cities",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "query",
      name: "lat",
      type: "float",
      description: "City latitude. (Try it out: 48.8566)",
    },
    {
      in: "query",
      name: "lng",
      type: "float",
      description: "City longitude. (Try it out: 2.3522)",
    },
    {
      in: "query",
      name: "page_number",
      type: "integer",
      minimum: 0,
      description:
        "Pagination: The page number of the cities received.  MIN: 0 (Try it out: 0)",
    },
    {
      in: "query",
      name: "page_size",
      type: "integer",
      description:
        "Pagination: Size of the array of cities you will receive. MIN: 1, MAX:100 (Try it out: 10)",
    },
  ],
};

const getCityById = {
  tags: ["Cities"],
  description: "Returns city by its id.",
  operationId: "getCityById",
  responses: {
    200: {
      description: "City by id.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/City",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "path",
      name: "cityId",
      type: "integer",
      description: "City id. (Try it out: 2988507)",
    },
  ],
};

module.exports = {
  getCitiesByCountryCode,
  getCitiesByName,
  getCitiesByCoordinates,
  getCityById,
};
