import swaggerJsdoc from 'swagger-jsdoc';

export function createSwaggerSpec(port: number) {
  return swaggerJsdoc({
    apis: ['./src/routes/*.ts'],
    definition: {
      info: {
        description: "API for sending contact form emails from Joel Spinelli's portfolio.",
        title: 'Portfolio email API',
        version: '2.0.0'
      },
      openapi: '3.0.0',
      paths: {
        '/mail': {
          post: {
            responses: { 
              200: { description: 'Server is running' } 
            },
            summary: 'Send contact email'
          }
        }
      },
      servers: [{ url: `http://localhost:${port}` }]
    },
  });
}
