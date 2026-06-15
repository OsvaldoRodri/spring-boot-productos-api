# spring-boot-productos-api 🛒🍦

Aplicación fullstack de gestión de inventario con **Spring Boot 3** (backend) y **React + Tailwind CSS** (frontend).

Proyecto organizado como **monorepo** con carpetas separadas por capa — estructura estándar en proyectos profesionales.

---

## Stack

| Capa | Tecnología |
|------|-----------|
| Backend | Java 17, Spring Boot 3.2, Spring Data JPA, Hibernate |
| Base de datos | PostgreSQL |
| Build | Maven |
| Frontend | React 18, Vite, Tailwind CSS |
| Comunicación | REST API (JSON) |

---

## Estructura del proyecto

```
spring-boot-productos-api/
├── backend/                        ← Spring Boot
│   ├── pom.xml
│   └── src/main/java/dev/osvaldo/productos/
│       ├── ProductosApplication.java
│       ├── DataLoader.java
│       ├── model/          Producto.java, Categoria.java
│       ├── repository/     ProductoRepository.java
│       ├── service/        ProductoService.java
│       ├── controller/     ProductoController.java
│       └── exception/      GlobalExceptionHandler, ErrorResponse, NotFoundException
│
└── frontend/                       ← React + Tailwind
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx
        ├── api/productos.js
        └── components/
            ├── ProductoCard.jsx
            ├── ProductoForm.jsx
            └── CategoriaBadge.jsx
```

---

## Cómo correr el proyecto

### Backend (Spring Boot)

```bash
cd backend
mvn spring-boot:run
# API en http://localhost:8080
# DataLoader inserta 10 productos de prueba al iniciar
```

### Frontend (React + Tailwind)

```bash
cd frontend
npm install
npm run dev
# App en http://localhost:5173
```

Vite redirige `/api/*` a `localhost:8080` automáticamente — sin configuración de CORS.

---

## Endpoints

| Método | URL | Descripción |
|--------|-----|-------------|
| GET | `/api/productos` | Lista productos activos |
| GET | `/api/productos?nombre=paleta` | Busca por nombre |
| GET | `/api/productos?categoria=HELADO` | Filtra por categoría |
| GET | `/api/productos/{id}` | Obtiene por ID |
| POST | `/api/productos` | Crea producto |
| PUT | `/api/productos/{id}` | Actualiza completo |
| PATCH | `/api/productos/{id}/stock?cantidad=50` | Actualiza stock |
| DELETE | `/api/productos/{id}` | Soft delete |

---

## Funcionalidades del frontend

- Grid responsivo de productos
- Búsqueda en tiempo real con debounce
- Filtro por categoría
- Stats: total productos, valor de inventario, sin stock
- CRUD completo desde la UI (crear, editar, eliminar)
- Indicador visual de stock (verde / amarillo / rojo)
- Modal de formulario con validación en cliente

---

## Conexión con el portafolio

Backend pensado para reemplazar Express/Prisma en [HelaDuck](https://github.com/OsvaldoRodri/heladuck), migrando a un stack Java profesional.

---

![Java](https://img.shields.io/badge/Java-17-orange?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?logo=springboot)
![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4479A1?logo=postgresql)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss)

*Portafolio de [Osvaldo Rodríguez](https://github.com/OsvaldoRodri)*
