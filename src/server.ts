import app from './app'
import dotenv from 'dotenv'
import { Logger } from './Shared/Utils/Logger'
import { AppDataSource } from './Infrastructure/Database/data-source'

dotenv.config()

const PORT = process.env.PORT || 7000

// Inicializar la conexión a la base de datos antes de arrancar el servidor
AppDataSource.initialize()
  .then(() => {
    Logger.info('📦 TypeORM connected to PostgreSQL successfully')
    
    // Arrancar el servidor solo después de conectar a la base de datos
    app.listen(PORT, () => {
      Logger.info(`🚀 Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    Logger.error('❌ Error connecting to database:', error)
    process.exit(1)
  })
