FROM node:20-alpine as builder

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

RUN npm run build 

FROM node:20-alpine

RUN npm install -g serve

WORKDIR /app

COPY --from=builder /app/dist ./

RUN adduser -D -u 1001 appuser
USER appuser

EXPOSE 3000

CMD ["serve", "-s", "-l", "3000", "."]