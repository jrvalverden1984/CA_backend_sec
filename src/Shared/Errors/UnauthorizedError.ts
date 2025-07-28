
import { AppError } from './AppError'

export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized', details?: string[] | object) {
    super(message, 401, details)
  }
}
