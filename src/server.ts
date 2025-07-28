import app from './app'
import dotenv from 'dotenv'
import { Logger } from './Shared/Utils/Logger'

dotenv.config()

const PORT = process.env.PORT || 7000

app.listen(PORT, () => {
  Logger.info(`🚀 Server running on http://localhost:${PORT}`)
})
