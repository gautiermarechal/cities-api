const login = {
  tags: ["Users"],
  description: "Login",
  operationId: "login",
  responses: {
    200: {
      description: "Successfully logged in",
      content: {
        "application/json": {},
      },
    },
  },
  requestBody: {
    required: true,
    content: {
      "application/json": {
        schema: { $ref: "#/definitions/User" },
      },
    },
  },
};

const logout = {
  tags: ["Users"],
  description: "Logout",
  operationId: "logout",
  responses: {
    200: {
      description: "Successfully logged out",
      content: {
        "application/json": {},
      },
    },
  },
};

module.exports = {
  login,
  logout,
};
