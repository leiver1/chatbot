# Verwende das offizielle Node.js 16-Image als Basisimage
FROM node:latest as build

# Setze das Arbeitsverzeichnis im Container
WORKDIR /app

# Kopiere die Dateien `package.json` und `package-lock.json` in den Container
COPY package.json .
COPY package-lock.json .

# Installiere die Abhängigkeiten
RUN npm install

# Kopiere den Rest des Codes in den Container
COPY . .


# Baue das React-Vite-Projekt
RUN npm run build

# Nginx-Image als Basisimage für das Endprodukt
FROM nginx:alpine

# Kopiere den Build des React-Vite-Projekts in den Nginx-Container
COPY --from=build /app/dist /usr/share/nginx/html

# Standard-Port für den Nginx-Server
EXPOSE 80

# Starte den Nginx-Server
CMD ["nginx", "-g", "daemon off;"]
