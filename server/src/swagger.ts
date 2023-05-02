import swaggerAutogen from 'swagger-autogen'

const doc = {
    info: {
      title: 'Food Shop',
      description: 'Description',
    },
    host: 'localhost:5000',
    schemes: ['http'],
  };

const outputFile = './swagger_output.json'
const endpointsFiles = [
    './routes/routes.ts',
]

swaggerAutogen()(outputFile, endpointsFiles, doc).then(async () => { 
    await import('./app') 
})
