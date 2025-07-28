import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import { Express } from 'express'
import { ErrorResponse } from './Schemas/ErrorResponse'
import { CompanyRequest } from './Schemas/CompanyRequest'
import { CompanyResponse } from './Schemas/CompanyResponse'
import { CompanySuccess } from './Schemas/CompanySuccess'
import { UserRequest } from './Schemas/UserRequest'
import { UserResponse } from './Schemas/UserResponse'
import { UserSuccess } from './Schemas/UserSuccess'
import path from 'path'

const swaggerDefinition  = {
    openapi: '3.0.0',
    info: {
      title: 'Security API',
      version: '1.0.0',
      description: 'Documentation automatically generated with Swagger',
    },
    components: {
      schemas: {
        ErrorResponse,
        CompanyRequest,
        CompanyResponse,
        CompanySuccess,
        UserRequest,
        UserResponse,
        UserSuccess
      }
      // securitySchemes: {
      //   bearerAuth: {
      //     type: 'http',
      //     scheme: 'bearer',
      //     bearerFormat: 'JWT'
      //   }
      // }
    }
 }

const options = {
  swaggerDefinition,
  apis: [path.resolve(__dirname, '../Presentation/**/*.routes.ts')],
};

const swaggerSpec = swaggerJsDoc(options)

export function setupSwagger(app: Express) {
  if (process.env.NODE_ENV !== 'production') {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
  }
}

// apis: [
//   path.resolve(__dirname, '../Presentation/**/*.routes.ts'), 
//   path.resolve(__dirname, '../Presentation/**/*.controller.ts'),
//   path.resolve(__dirname, '../Presentation/**/*.schema.ts')
// ],