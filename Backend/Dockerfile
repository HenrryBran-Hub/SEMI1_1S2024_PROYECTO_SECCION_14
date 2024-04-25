# Usa una imagen base de Node.js
FROM node:14

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de la aplicación al contenedor
COPY package.json package-lock.json /app/

# Instala las dependencias
RUN npm install

# Copia el resto de la aplicación
COPY . /app

# Expone el puerto en el que la aplicación va a escuchar
EXPOSE 5000

# Comando para iniciar la aplicación
CMD ["node", "app.js"]