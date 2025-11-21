# Stage de développement avec hot reload
FROM node:20-alpine as development

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]

# Stage de production
FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:20-alpine as production

RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/dist ./

RUN adduser -D -u 1001 appuser
USER appuser

EXPOSE 3000

CMD ["serve", "-s", "-l", "3000", "."]
