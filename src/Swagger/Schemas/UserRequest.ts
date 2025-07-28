export const UserRequest = {
  type: 'object',
  required: ['CompanyID', 'Login', 'FirstName', 'LastName', 'Password'],
  properties: {
    CompanyID: {
      type: 'number',
      example: 1
    },
    Login: {
      type: 'string',
      example: 'john.doe'
    },
    FirstName: {
      type: 'string',
      example: 'John'
    },
    LastName: {
      type: 'string',
      example: 'Doe'
    },
    Password: {
      type: 'string',
      example: 'password123'
    },
    ExpirationDate: {
      type: 'string',
      format: 'date-time',
      example: '2024-12-31T23:59:59.000Z'
    },
    Metadata: {
      type: 'object',
      example: {
        department: 'IT',
        role: 'Developer'
      }
    }
  }
} 