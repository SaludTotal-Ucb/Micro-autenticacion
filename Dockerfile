FROM node:20-slim
WORKDIR /app

# 1. Copiamos los archivos de dependencias
COPY package*.json ./

# 2. Instalamos todo omitiendo scripts conflictivos (y sin apt-get update)
RUN npm install --ignore-scripts

# 3. Copiamos TODO el código (incluyendo la carpeta dist que ya está lista)
COPY . .

EXPOSE 3002

# 4. EL TRUCO: En lugar de generar Prisma ahora y que se cuelgue, 
# le decimos que lo genere rápido SOLO cuando el contenedor se encienda.
CMD npx prisma generate && node dist/server.js