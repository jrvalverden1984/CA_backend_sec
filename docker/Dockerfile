# Etapa 1: Build
FROM node:20-slim AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios
COPY package*.json ./
COPY tsconfig.json ./

# Instala dependencias necesarias para build
RUN apt-get update && apt-get install -y \
  python3 \
  build-essential \
  && rm -rf /var/lib/apt/lists/*

# Instala dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila el proyecto TypeScript a JavaScript
RUN npm run build

---

# Etapa 2: Producción
FROM node:20-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo los artefactos construidos desde el builder
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

# Instala solo dependencias de producción
RUN npm install --only=production

# Expone el puerto que usa tu aplicación
EXPOSE 7000

# Comando por defecto para correr la app
CMD ["node", "dist/server.js"]
