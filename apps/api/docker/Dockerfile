# Etapa 1: Build
FROM node:18-alpine AS builder

# Crear directorio de trabajo
WORKDIR /app

# Copiar archivos de dependencias
COPY ../../yarn.lock ../../package.json ./

# Instalar dependencias
RUN yarn install

# Copiar el resto del proyecto
COPY ../../ .

# Compilar la aplicación
RUN yarn build

# Etapa 2: Producción
FROM node:18-alpine

WORKDIR /app

# Copiar solo lo necesario desde la etapa de build
COPY --from=builder /app/package.json ./
COPY --from=builder /app/yarn.lock ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Puerto por defecto de Nest
EXPOSE 3000

# Comando para iniciar la app
CMD ["node", "dist/main"]
