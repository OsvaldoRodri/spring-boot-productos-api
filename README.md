# spring-boot-productos-api

REST API de gestión de inventario con Spring Boot 3 y PostgreSQL, con frontend en React y Tailwind CSS. Monorepo con backend y frontend en carpetas separadas.

El dominio es inventario para una paletería, conectado con [heladuck](https://github.com/OsvaldoRodri/heladuck) donde este backend está pensado como reemplazo del stack Express/Prisma actual.

## Stack

Backend: Java 17, Spring Boot 3.2, Spring Data JPA, Hibernate, Maven, PostgreSQL  
Frontend: React 18, Vite, Tailwind CSS

## Estructura

```
spring-boot-productos-api/
├── backend/
│   ├── pom.xml
│   └── src/main/java/dev/osvaldo/productos/
│       ├── ProductosApplication.java
│       ├── DataLoader.java
│       ├── model/          Producto.java, Categoria.java
│       ├── repository/     ProductoRepository.java
│       ├── service/        ProductoService.java
│       ├── controller/     ProductoController.java
│       └── exception/      GlobalExceptionHandler.java, ErrorResponse.java
└── frontend/
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

## Cómo correr

```bash
# Crear la base de datos
psql -U postgres -c "CREATE DATABASE productos_db;"

# Backend
cd backend
mvn spring-boot:run

# Frontend (otra terminal)
cd frontend
npm install
npm run dev
```

La API queda en `http://localhost:8080` y el frontend en `http://localhost:5173`. Vite redirige `/api/*` a `localhost:8080` sin configuración adicional de CORS.

## Endpoints

```
GET    /api/productos
GET    /api/productos?nombre=paleta
GET    /api/productos?categoria=HELADO
GET    /api/productos/{id}
POST   /api/productos
PUT    /api/productos/{id}
PATCH  /api/productos/{id}/stock?cantidad=50
DELETE /api/productos/{id}
```

## Decisiones de diseño

El delete es soft: marca el producto como `activo = false` en lugar de eliminarlo. En inventario real, borrar un producto rompe el historial de transacciones.

La inyección de dependencias es por constructor porque hace las dependencias explícitas y facilita los tests.

Los finders del repositorio (`findByNombreContainingIgnoreCase`, `findByCategoria`) los genera Spring Data a partir del nombre del método, sin SQL manual.

## Estado

CRUD completo, validaciones con Bean Validation, manejo global de errores con `@ControllerAdvice`, datos de prueba con `CommandLineRunner`. Pendiente: Spring Security con JWT, tests con JUnit 5, Dockerfile.
