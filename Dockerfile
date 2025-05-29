FROM oven/bun:latest

COPY . /app
WORKDIR /app

RUN bun install --frozen-lockfile
RUN bun prisma migrate deploy

RUN bun run build

EXPOSE 3000

CMD ["bun", "start"]
