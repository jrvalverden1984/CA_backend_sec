export const CompanySuccess = {
  type: 'object',
  required: ['CompanyID', 'Ruc', 'Name', 'ConnectionString', 'Message'],
  properties: {
      CompanyID: {
        type: 'number',
        example: 1
      },
      Ruc: {
        type: 'string',
        example: '1234567890001'
      },
      Name: {
        type: 'string',
        example: 'My Company S.A.'
      },
      // ConnectionString: {
      //   type: 'string',
      //   example: 'Server=localhost;Database=MyDatabase;User Id=myuser;Password=mypassword;'
      // },
      Message: {
        type: 'string',
        example: 'Company successfully obtained'
      }
  }
}
  