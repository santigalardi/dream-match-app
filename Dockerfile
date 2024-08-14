# Usa una imagen base de Node.js
FROM node:18

# Crea un directorio de trabajo en el contenedor
WORKDIR /app

# Copia los archivos del proyecto al contenedor
COPY package*.json ./
RUN npm install
COPY . .

# Construye la aplicación
RUN npm run build

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 3000

# Define el comando para iniciar la aplicación
CMD ["npm", "start"]
