const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger.json'
const endpointsFiles = ['./app/routes/exo.routes.js']

swaggerAutogen(outputFile, endpointsFiles) 