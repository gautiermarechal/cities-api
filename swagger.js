const {
  getCitiesByCountryCode,
  getCitiesByName,
  getCitiesByCoordinates,
  getCityById,
} = require("./openapi/cities.swagger");

const {
  getCountriesByName,
  getCountriesByCode,
  getCountriesByRegionCode,
  getCountries,
} = require("./openapi/countries.swagger");
const { login, logout } = require("./openapi/users.swagger");

const swaggerDocument = {
  openapi: "3.0.0",
  visibility: "private",
  info: {
    version: "1.0.0",
    title: "World Cities API",
    description: `Get any city in the world and its coordinates.
      Get the city either by:   
        - Name    
        - Country name    
        - Coordinates (The nearest city of the entered coordinates)
      This API allows for a simple way to manipulate cities informations, without any friction.`,
    termsOfService: "",
    contact: {
      name: "Gautier Marechal",
      email: "gautier.marechal@gaut.io",
      url: "https://gaut.io",
    },
    license: {
      name: "Apache 2.0",
      url: "https://www.apache.org/licenses/LICENSE-2.0.html",
    },
  },
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    "/cities/country/{countryCode}": {
      get: getCitiesByCountryCode,
    },
    "/cities/name/{cityName}": {
      get: getCitiesByName,
    },
    "/cities/coordinates": {
      get: getCitiesByCoordinates,
    },
    "/cities/id/{cityId}": {
      get: getCityById,
    },
    "/countries/name/{countryName}": {
      get: getCountriesByName,
    },
    "/countries/code/{countryCode}": {
      get: getCountriesByCode,
    },
    "/countries/region/{regionCode}": {
      get: getCountriesByRegionCode,
    },
    "/countries": {
      get: getCountries,
    },
    "/users/login": {
      post: login,
    },
    "/users/logout": {
      post: logout,
    },
  },
  definitions: {
    City: {
      properties: {
        id: {
          type: "string",
          description: "City ID",
        },
        name: {
          type: "string",
          description: "City Name",
        },
        country_code: {
          type: "string",
          description: "City country code in ISO2 format",
        },
        location: {
          properties: {
            coordinates: {
              type: "array",
              description:
                "The coordinates of the city. First item in the coordinates array is longitude. Second item is latitude.",
            },
            type: {
              type: "string",
            },
          },
        },
      },
    },
    Cities: {
      type: "array",
      $ref: "#/definitions/City",
    },
    Country: {
      properties: {
        name: {
          type: "string",
          description: "City name",
        },
        code: {
          type: "string",
          description: "Country code in ISO2 format",
        },
        capital: {
          type: "string",
          description: "Country capital",
        },
        region: {
          type: "string",
          description: "Region code",
        },
        currency: {
          properties: {
            code: {
              type: "string",
              description: "Currency code",
            },
            name: {
              type: "string",
            },
            symbol: {
              type: "string",
            },
          },
        },
        language: {
          properties: {
            code: {
              type: "string",
            },
            name: {
              type: "string",
            },
          },
        },
        flag: {
          type: "string",
        },
      },
    },
    Countries: {
      type: "array",
      $ref: "#/definitions/Country",
    },
    User: {
      properties: {
        name: {
          type: "string",
        },
        password: {
          type: "string",
        },
      },
    },
  },
};

module.exports = { swaggerDocument };
