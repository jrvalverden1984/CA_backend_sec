export class ApiResponse {
    static success<T>(data: T, message = 'Success') {
      return {
        data,
        message
      }
    }
  
    static created<T>(data: T, message = 'Created successfully') {
      return {
        data,
        message
      }
    }
  
    static error(message: string, details?: string[] | object) {
      return {
        message,
        details
      }
    }
  }
  