# spring-boot-productos-api 🛒

REST API de gestión de productos construida con **Spring Boot 3**, **PostgreSQL** y **Spring Data JPA**.

Proyecto backend que demuestra arquitectura en capas, CRUD completo, validaciones, manejo de errores y conexión a base de datos real.

El dominio es inventario para una paletería — conectado directamente con el proyecto [HelaDuck](https://github.com/OsvaldoRodri/heladuck), donde este API está pensado como el backend futuro.

---

## Stack

| Tecnología | Versión | Rol |
|-----------|---------|-----|
| Java | 17 | Lenguaje |
| Spring Boot | 3.2.5 | Framework principal |
| Spring Web | incluido | Endpoints REST |
| Spring Data JPA | incluido | Acceso a datos |
| Hibernate | incluido | ORM (mapeo objeto-relacional) |
| PostgreSQL | 18 | Base de datos |
| Maven | 3.x | Gestión de dependencias |
| Bean Validation | incluido | `@Valid`, `@NotBlank`, `@Min` |

---

## Arquitectura en capas

```
ProductoController  ←── recibe HTTP, delega al servicio
       ↓
ProductoService     ←── lógica de negocio
       ↓
ProductoRepository  ←── acceso a datos (JpaRepository)
       ↓
PostgreSQL          ←── persistencia real
```

```
src/main/java/dev/osvaldo/productos/
├── ProductosApplication.java          ← @SpringBootApplication
├── DataLoader.java                    ← datos de prueba al iniciar
│
├── model/
│   ├── Producto.java                  ← @Entity con validaciones
│   └── Categoria.java                 ← enum: PALETA, HELADO, BEBIDA, SNACK, OTRO
│
├── repository/
│   └── ProductoRepository.java        ← JpaRepository + custom finders
│
├── service/
│   └── ProductoService.java           ← lógica de negocio, soft delete
│
├── controller/
│   └── ProductoController.java        ← endpoints REST con @RestController
│
└── exception/
    ├── ProductoNotFoundException.java  ← RuntimeException para 404
    ├── ErrorResponse.java             ← DTO de error estructurado
    └── GlobalExceptionHandler.java    ← @ControllerAdvice para 404, 400, 500
```

---

## Endpoints

| Método | URL | Descripción | Status |
|--------|-----|-------------|--------|
| `GET` | `/api/productos` | Lista todos los productos activos | 200 |
| `GET` | `/api/productos?nombre=paleta` | Busca por nombre (case-insensitive) | 200 |
| `GET` | `/api/productos?categoria=HELADO` | Filtra por categoría | 200 |
| `GET` | `/api/productos/{id}` | Obtiene un producto por ID | 200 / 404 |
| `POST` | `/api/productos` | Crea un nuevo producto | 201 |
| `PUT` | `/api/productos/{id}` | Actualiza todos los campos | 200 / 404 |
| `PATCH` | `/api/productos/{id}/stock?cantidad=50` | Actualiza solo el stock | 200 / 404 |
| `DELETE` | `/api/productos/{id}` | Soft delete (marca como inactivo) | 204 / 404 |

---

## Cómo correr el proyecto

### Requisitos
- Java 17+
- Maven 3.x
- PostgreSQL corriendo localmente

### 1. Clonar el repositorio
```bash
git clone https://github.com/OsvaldoRodri/spring-boot-productos-api.git
cd spring-boot-productos-api
```

### 2. Crear la base de datos
```sql
CREATE DATABASE productos_db;
```

### 3. Configurar credenciales
Edita `src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/productos_db
spring.datasource.username=tu_usuario
spring.datasource.password=tu_contraseña
```

### 4. Correr
```bash
mvn spring-boot:run
```

La API queda disponible en `http://localhost:8080`

Al iniciar, el `DataLoader` inserta automáticamente 10 productos de prueba.

---

## Ejemplos de uso

### Crear un producto
```bash
curl -X POST http://localhost:8080/api/productos \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Paleta de Coco",
    "descripcion": "Paleta artesanal de coco rallado",
    "precio": 20.00,
    "stock": 40,
    "categoria": "PALETA"
  }'
```

### Buscar por nombre
```bash
curl http://localhost:8080/api/productos?nombre=mango
```

### Actualizar stock
```bash
curl -X PATCH "http://localhost:8080/api/productos/1/stock?cantidad=100"
```

### Respuesta de error (404)
```json
{
  "timestamp": "2026-06-14T10:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Producto no encontrado con ID: 99"
}
```

---

## Decisiones técnicas

**¿Por qué soft delete y no DELETE real?**
En inventario real, eliminar un producto de la BD rompe el historial de ventas. Marcarlo como `activo = false` lo oculta de los listados pero preserva la integridad referencial.

**¿Por qué inyección por constructor y no @Autowired en campo?**
La inyección por constructor hace las dependencias explícitas, facilita los tests unitarios (se puede pasar un mock directamente) y es la práctica recomendada por el equipo de Spring desde Spring 4.

**¿Por qué JpaRepository y no JdbcTemplate?**
Para un CRUD estándar, JPA elimina el SQL repetitivo y reduce errores. JdbcTemplate tiene su lugar en consultas complejas o de alto rendimiento — para este proyecto JPA es la elección correcta.

---

## Estado del proyecto

- [x] CRUD completo de productos
- [x] Validaciones con Bean Validation
- [x] Manejo global de errores con @ControllerAdvice
- [x] Soft delete
- [x] Búsqueda por nombre y filtro por categoría
- [x] Datos de prueba automáticos (DataLoader)
- [ ] Spring Security + JWT (próxima versión)
- [ ] Tests unitarios con JUnit 5 + Mockito
- [ ] Dockerización
- [ ] Deployment en Railway/Render

---

## Conexión con el portafolio

Este proyecto es el backend que eventualmente va a servir al frontend de [HelaDuck](https://github.com/OsvaldoRodri/heladuck) — reemplazando Express/Prisma por Spring Boot/JPA para el sistema de punto de venta de la paletería familiar.

---

![Java](https://img.shields.io/badge/Java-17-orange?logo=java)
![Spring Boot](https://img.shields.io/badge/Spring_Boot-3.2-6DB33F?logo=springboot)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-18-4479A1?logo=postgresql)
![Maven](https://img.shields.io/badge/Maven-3.x-C71A36?logo=apachemaven)

*Parte del portafolio de [Osvaldo Rodríguez](https://github.com/OsvaldoRodri)*
