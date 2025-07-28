export class AppError extends Error {
    public readonly status: number
    public readonly details?: string[] | object
  
    constructor(message: string, status = 400, details?: string[] | object) {
      super(message)
      this.status = status
      this.details = details
      Object.setPrototypeOf(this, new.target.prototype)
      Error.captureStackTrace(this)
    }
  }
  