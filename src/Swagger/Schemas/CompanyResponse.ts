export const CompanyResponse = {
  type: 'object',
  required: ['CompanyID', 'Message'],
  properties: {
      CompanyID: {
        type: 'number',
        example: 1
      },
      Message: {
        type: 'string',
        example: 'Successful Operation'
      }
  }
}
  