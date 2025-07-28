// src/shared/middleware/error.middleware.ts

import { Request, Response, NextFunction } from 'express'
import { ApiResponse } from '../Utils/ApiResponse'

export function errorMiddleware(
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err)

  const status = err.status || 500
  const message = err.message || 'Internal server error'
  const details = err.details || undefined

  res.status(status).json(ApiResponse.error(message, details))
}
