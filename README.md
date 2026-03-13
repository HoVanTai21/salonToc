# SalonToc

Monorepo gồm 3 phần: **Client**, **Admin**, và **Backend**.

## Cấu trúc

```
salonToc/
├── client/          # React + Vite + Tailwind v3 + shadcn (Trang khách hàng)
├── admin/           # React + Vite + Tailwind v3 + shadcn (Trang quản trị)
├── be/              # NestJS + Prisma 7 + PostgreSQL (API Backend)
└── docker-compose.yml  # PostgreSQL database
```

## Yêu cầu

- Node.js >= 20
- Docker & Docker Compose

## Khởi chạy

### 1. Database (PostgreSQL Docker)

```bash
docker compose up -d
```

### 2. Backend

```bash
cd be
npm install
npx prisma migrate dev --name init
npm run start:dev
# → http://localhost:3000
```

### 3. Client

```bash
cd client
npm install
npm run dev
# → http://localhost:5173
```

### 4. Admin

```bash
cd admin
npm install
npm run dev
# → http://localhost:5174
```
