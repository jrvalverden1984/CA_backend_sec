
import { AppError } from './AppError'

export class BadRequestError extends AppError {
  constructor(message = 'Bad Request', details?: string[] | object) {
    super(message, 400, details)
  }
}
