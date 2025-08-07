import express from 'express'
import cors from 'cors'
import { setupSwagger } from './Swagger/swagger'
import { errorMiddleware } from './Shared/Middleware/error.middleware'
import companyRoutes from './Presentation/Routes/company.routes'
import userRoutes from './Presentation/Routes/user.routes'
import authRoutes from './Presentation/Routes/auth.routes'

const app = express()

// Configuración de CORS
app.use(cors({
  origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}))

app.use(express.json())
app.use('/company', companyRoutes)  
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use(errorMiddleware)

setupSwagger(app)

export default app
