import swaggerJsdoc from 'swagger-jsdoc';

export function createSwaggerSpec(port: number) {
  return swaggerJsdoc({
    apis: ['./src/routes/*.ts'],
    definition: {
      openapi: '3.0.0',
      info: {
        description: "API for sending contact form emails from Joel Spinelli's portfolio.",
        title: 'Portfolio email API',
        version: '2.0.0'
      },
      servers: [{ url: `http://localhost:${port}` }],
      components: {
        schemas: {
          PostMailRequestDto: {
            type: 'object',
            required: ['email', 'message', 'name'],
            properties: {
              email: { type: 'string', format: 'email', minLength: 7, maxLength: 254 },
              message: { type: 'string', minLength: 10, maxLength: 2000 },
              name: { type: 'string', minLength: 2, maxLength: 80 },
              subject: {
                nullable: true,
                oneOf: [
                  { type: 'string', maxLength: 0 },
                  { type: 'string', minLength: 3, maxLength: 120 }
                ]
              }
            }
          },
          PostMailErrorResponseDto: {
            type: 'object',
            properties: {
              errors: {
                type: 'array',
                items: { type: 'string' }
              }
            }
          }
        }
      },
      paths: {
        '/mail': {
          post: {
            summary: 'Send contact email',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    $ref: '#/components/schemas/PostMailRequestDto'
                  }
                }
              }
            },
            responses: {
              204: {
                description: 'Email sent'
              },
              400: {
                description: 'Invalid request body',
                content: {
                  'application/json': {
                    schema: {
                      $ref: '#/components/schemas/PostMailErrorResponseDto'
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });
}
