
import { AppError } from './AppError'

export class NotFoundError extends AppError {
  constructor(message = 'Resource not found', details?: string[] | object) {
    super(message, 404, details)
  }
}
