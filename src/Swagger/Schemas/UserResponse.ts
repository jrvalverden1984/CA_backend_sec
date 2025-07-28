export const UserResponse = {
  type: 'object',
  required: ['UserID', 'Message'],
  properties: {
    UserID: {
      type: 'number',
      example: 1
    },
    Message: {
        type: 'string',
        example: 'Successful Operation'
    }
}
} 