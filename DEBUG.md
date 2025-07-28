# Guía de Depuración del Servicio

## Métodos de Depuración

### 1. Depuración con VS Code (Recomendado)

1. **Configurar breakpoints:**
   - Abre el archivo que quieres depurar (ej: `src/Presentation/Controllers/company.controller.ts`)
   - Haz clic en el margen izquierdo para establecer breakpoints (puntos rojos)

2. **Iniciar depuración:**
   - Presiona `F5` o ve a `Run and Debug` en VS Code
   - Selecciona "Debug Backend" de la lista
   - El servicio se iniciará en modo debug

3. **Usar el debugger:**
   - `F10`: Step Over (siguiente línea)
   - `F11`: Step Into (entrar en función)
   - `F12`: Step Out (salir de función)
   - `F5`: Continue (continuar hasta siguiente breakpoint)

### 2. Depuración con Chrome DevTools

1. **Iniciar servicio en modo debug:**
   ```bash
   npm run debug
   ```

2. **Abrir Chrome DevTools:**
   - Abre Chrome y ve a `chrome://inspect`
   - Haz clic en "Open dedicated DevTools for Node"
   - O abre directamente: `http://localhost:9229`

3. **Establecer breakpoints:**
   - En la pestaña Sources, navega a tu código
   - Haz clic en el margen para establecer breakpoints

### 3. Depuración con breakpoint inicial

Para que el servicio se detenga al inicio:

```bash
npm run debug:break
```

### 4. Logging de Depuración

El servicio incluye logging automático en desarrollo:

```typescript
import { Logger } from '../../Shared/Utils/Logger'

// Logs de información
Logger.info('Mensaje informativo', data)

// Logs de depuración
Logger.debug('Datos de depuración', data)

// Logs de advertencia
Logger.warn('Advertencia', data)

// Logs de error
Logger.error('Error ocurrido', error)
```

### 5. Variables de Entorno para Depuración

Crea un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=development
DEBUG=true
LOG_LEVEL=debug
```

### 6. Depuración de Base de Datos

Para depurar consultas SQL:

1. **Habilitar logging de TypeORM:**
   ```typescript
   // En data-source.ts
   logging: true,
   logger: "advanced-console"
   ```

2. **Ver consultas en consola:**
   - Todas las consultas SQL aparecerán en la consola
   - Útil para identificar problemas de rendimiento

### 7. Depuración de Errores

El middleware de errores ya está configurado para capturar errores:

```typescript
// Los errores se loguean automáticamente
Logger.error('Error en controlador:', error)
```

### 8. Comandos Útiles

```bash
# Desarrollo normal
npm run dev

# Desarrollo con debug
npm run debug

# Desarrollo con breakpoint inicial
npm run debug:break

# Compilar TypeScript
npm run build

# Ejecutar compilado
npm start
```

### 9. Consejos de Depuración

1. **Usa breakpoints estratégicos:**
   - Al inicio de funciones importantes
   - Antes de operaciones de base de datos
   - En puntos de validación

2. **Inspecciona variables:**
   - Usa el panel de variables en VS Code
   - Agrega `console.log()` temporalmente
   - Usa el Logger para datos estructurados

3. **Depuración de API:**
   - Usa Postman o similar para probar endpoints
   - Verifica headers y body de requests
   - Revisa respuestas HTTP

4. **Depuración de Base de Datos:**
   - Verifica conexión a PostgreSQL
   - Revisa logs de TypeORM
   - Usa pgAdmin para inspeccionar datos

### 10. Troubleshooting Común

**Problema:** No se conectan los breakpoints
- **Solución:** Verifica que `sourceMap: true` esté en `tsconfig.json`

**Problema:** No aparecen logs
- **Solución:** Asegúrate de que `NODE_ENV=development`

**Problema:** Error de puerto ocupado
- **Solución:** Cambia el puerto en la configuración de debug o mata procesos existentes 