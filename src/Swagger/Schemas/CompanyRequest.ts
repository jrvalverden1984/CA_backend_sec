export const CompanyRequest = {
  type: 'object',
  required: ['Ruc', 'Name'],
  properties: {
      Ruc: {
        type: 'string',
        example: '1234567890001'
      },
      Name: {
        type: 'string',
        example: 'My Company S.A.'
      }
  }
}
  