import express from 'express'
import { setupSwagger } from './Swagger/swagger'
import { errorMiddleware } from './Shared/Middleware/error.middleware'
import companyRoutes from './Presentation/Routes/company.routes'
import userRoutes from './Presentation/Routes/user.routes'
import authRoutes from './Presentation/Routes/auth.routes'

const app = express()

app.use(express.json())
app.use('/company', companyRoutes)  
app.use('/user', userRoutes)
app.use('/auth', authRoutes)
app.use(errorMiddleware)

setupSwagger(app)

export default app
