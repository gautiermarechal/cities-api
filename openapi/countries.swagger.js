const getCountriesByName = {
  tags: ["Countries"],
  description: "Returns countries from a country name. Result is paginated.",
  operationId: "getCountriesByName",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Countries by country name.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Country",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "path",
      name: "countryName",
      type: "string",
      description: "Country name. (Try it out: France)",
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

const getCountriesByCode = {
  tags: ["Countries"],
  description: "Returns countries from a country code.",
  operationId: "getCountriesByCode",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Countries by country code.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Country",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "path",
      name: "countryCode",
      type: "string",
      description: "Country code. (Try it out: FR)",
    },
  ],
};

const getCountriesByRegionCode = {
  tags: ["Countries"],
  description: "Returns countries from a region code.",
  operationId: "getCountriesByRegionCode",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Countries by region code.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Country",
          },
        },
      },
    },
  },
  parameters: [
    {
      in: "path",
      name: "regionCode",
      type: "string",
      description: "Region code. (Try it out: EU)",
    },
  ],
};

const getCountries = {
  tags: ["Countries"],
  description: "Returns paginated countries",
  operationId: "getCountries",
  security: [
    {
      bearerAuth: [],
    },
  ],
  responses: {
    200: {
      description: "Paginated countries.",
      content: {
        "application/json": {
          schema: {
            $ref: "#/definitions/Countries",
          },
        },
      },
    },
  },
  parameters: [
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

module.exports = {
  getCountries,
  getCountriesByName,
  getCountriesByCode,
  getCountriesByRegionCode,
};
