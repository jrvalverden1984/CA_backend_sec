export class Logger {
  private static isDevelopment = process.env.NODE_ENV === 'development'

  static info(message: string, data?: any) {
    if (this.isDevelopment) {
      console.info(`[INFO] ${new Date().toISOString()}: ${message}`)
      if (data) {
        console.info('Data:', JSON.stringify(data, null, 2))
      }
    }
  }

  static error(message: string, error?: any) {
    if (this.isDevelopment) {
      console.error(`[ERROR] ${new Date().toISOString()}: ${message}`)
      if (error) {
        console.error('Error details:', error)
      }
    }
  }

  static debug(message: string, data?: any) {
    if (this.isDevelopment) {
      console.debug(`[DEBUG] ${new Date().toISOString()}: ${message}`)
      if (data) {
        console.debug('Debug data:', JSON.stringify(data, null, 2))
      }
    }
  }

  static warn(message: string, data?: any) {
    if (this.isDevelopment) {
      console.warn(`[WARN] ${new Date().toISOString()}: ${message}`)
      if (data) {
        console.warn('Warning data:', JSON.stringify(data, null, 2))
      }
    }
  }

  static log(message: string, data?: any) {
    if (this.isDevelopment) {
      console.log(`[LOG] ${new Date().toISOString()}: ${message}`)
      if (data) {
        console.log('Log data:', JSON.stringify(data, null, 2))
      }
    }
  }

} 