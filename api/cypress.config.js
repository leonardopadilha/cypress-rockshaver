require('dotenv').config()

const { defineConfig } = require("cypress");
const { configurePlugin } = require("cypress-mongodb");

module.exports = defineConfig({
  projectId: "r2cugf",
  env: {
    mongodb: {
        uri: process.env.MONGO_URL,
        database: process.env.DATABASE,
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      configurePlugin(on);
    },
    baseUrl: process.env.API_URL
  },
});
