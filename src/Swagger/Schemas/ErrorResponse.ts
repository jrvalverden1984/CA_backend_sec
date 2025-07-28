export const ErrorResponse = {
    type: 'object',
    properties: {
      message: {
        type: 'string',
        example: 'Error creating the resource'
      },
      details: {
        type: 'array',
        items: {
          type: 'string',
          example: 'The "name" field is required'
        }
      }
    }
  }
  