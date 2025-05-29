FROM oven/bun:latest

ENV PRISMA_SKIP_POSTINSTALL_GENERATE=true

COPY . /app
WORKDIR /app

RUN bun install --frozen-lockfile
RUN bun run build
RUN bun prisma migrate deploy

EXPOSE 3000

CMD ["bun", "run", "start"]
