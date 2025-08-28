# 📱 Gym Routine Manager

Aplicación **Fullstack** para la gestión de rutinas de entrenamiento.  
Incluye un **backend en Node.js/Express con Prisma y SQLite**, una **aplicación web en React**, y una **aplicación móvil con Expo/React Native**.

---

## 🚀 Características

- Registro e inicio de sesión con JWT.  
- CRUD de rutinas de entrenamiento (crear, editar, eliminar, listar).  
- Autenticación con middleware y contraseñas encriptadas con bcrypt.  
- Aplicación web y móvil sincronizadas con el mismo backend.  
- Base de datos SQLite lista para desarrollo rápido.  

---

## 🛠️ Tecnologías utilizadas

### **Backend**
- Node.js + Express  
- Prisma ORM con SQLite  
- Autenticación con JWT  
- Bcrypt para hashing de contraseñas  
- Express Validator para validaciones  
- CORS habilitado para consumir desde web y móvil  

### **Frontend Web**
- React (Vite)  
- TypeScript  

### **Mobile**
- Expo  
- React Native  
- AsyncStorage para manejo de sesión  

---

## 📦 Requisitos previos

- Node.js >= 18  
- Git instalado  
- Expo Go (para probar la app móvil en el celular)  

---

## ⚙️ Instalación

### Clonar repositorio

```bash
git clone https://github.com/zackmero/gym-routine-manager.git
cd gym-routine-manager

---

1. **Instalar dependencias**
# Backend
cd /backend
npm install

# Web
cd /web
npm install

# Mobile
cd /mobile
npm install

---

2. **Configuración de variables de entorno**
# Prisma con SQLite
DATABASE_URL="file:./dev.db"

# JWT Secret
JWT_SECRET="your_secret_key"

# Puerto del servidor
PORT=4000

---

3. **Ejecucion**
#Backend
-cd backend
-npx prisma migrate dev --name init
-npm run dev

#Web
-cd web
-npm run dev
-Disponible en: http://localhost:3000

#Mobile
-cd mobile
-npx expo start
-Escanear QR con Expo Go (iOS/Android).

---

4. **Usuario de prueba(seed)
Email: demo@example.com
Password: 12345678

---













