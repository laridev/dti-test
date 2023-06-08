import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Loan management API with Swagger",
            version: "0.1.0",
            description: "This is a simple API to manage loans requests",
            license: {
                name: "MIT",
                url: "https://spdx.org/licenses/MIT.html",
            },
        },
        servers: [{
            url: "http://localhost:3000",
        }],
    },
    apis: ["*/routes.js"],
};
  
export const swaggerSpecs = swaggerJsdoc(options);