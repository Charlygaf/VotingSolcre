# VotingSolcre

Voting app

# Estructura

/mi-app

/frontend (Next.js)

/backend (Express)
README.md

# 🗳️ Voting App

Aplicación web para votación online con panel de administración.

## 📁 Estructura del proyecto

---

## 🧰 Requisitos y tips

- Node.js >= 18
- npm
- PostgreSQL (u otro motor de base de datos compatible con Prisma)
- Ambos .env fueron incluidos en el repo para facilitar

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/tu-usuario/mi-app.git
cd mi-app


### Backend
cd backend
cp .env.example .env
# Editar las variables de entorno según tu entorno local (DB, JWT_SECRET, etc.)

npm install
npx prisma migrate dev
npx prisma migrate reset # corre el seed
npm run dev


### Frontend
cd ../frontend
cp .env.local.example .env.local
# Editar las variables de entorno si es necesario 

npm install
npm run build #build next
npm run dev




## Acceso como admin
Email: admin@email.com
Password: 1234
```
