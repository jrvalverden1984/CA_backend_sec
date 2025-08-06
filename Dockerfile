# Etapa 1: build (compila el proyecto)
FROM node:20-slim AS builder

# Establece el directorio de trabajo
WORKDIR /app

# Copia los archivos necesarios para instalar dependencias y compilar
COPY package*.json tsconfig.json ./
COPY src ./src

# Instala las dependencias
RUN npm install

# Compila el proyecto TypeScript
RUN npm run build

# Etapa 2: producción (solo lo necesario para ejecutar)
FROM node:20-slim

# Establece el directorio de trabajo
WORKDIR /app

# Copia solo lo necesario desde la etapa de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Expone el puerto de tu API
EXPOSE 7000

# Comando para iniciar la app
CMD ["node", "dist/server.js"]
