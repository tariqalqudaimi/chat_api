const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Chat App API Documentation',
      version: '1.0.0',
      description: 'توثيق كامل لتطبيق الدردشة الفورية',
      contact: {
        name: 'طارق',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'سيرفر التطوير المحلي',
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'connect.sid', 
        },
      },
    },
  },
  
  apis: ['./src/routes/*.js'], 
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;