package dev.osvaldo.productos.controller;

import dev.osvaldo.productos.model.Categoria;
import dev.osvaldo.productos.model.Producto;
import dev.osvaldo.productos.service.ProductoService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controlador REST para el recurso Producto.
 *
 * @RestController   = @Controller + @ResponseBody (serializa automáticamente a JSON)
 * @RequestMapping   = prefijo base para todos los endpoints de esta clase
 * @CrossOrigin      = permite peticiones desde cualquier origen (útil para conectar con React)
 */
@RestController
@RequestMapping("/api/productos")
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService service;

    public ProductoController(ProductoService service) {
        this.service = service;
    }

    /**
     * GET /api/productos
     * GET /api/productos?nombre=paleta
     * GET /api/productos?categoria=HELADO
     *
     * Si se pasan parámetros, filtra; si no, devuelve todos los activos.
     */
    @GetMapping
    public ResponseEntity<List<Producto>> listar(
            @RequestParam(required = false) String nombre,
            @RequestParam(required = false) Categoria categoria) {

        if (nombre != null && !nombre.isBlank()) {
            return ResponseEntity.ok(service.buscarPorNombre(nombre));
        }
        if (categoria != null) {
            return ResponseEntity.ok(service.buscarPorCategoria(categoria));
        }
        return ResponseEntity.ok(service.listarActivos());
    }

    /**
     * GET /api/productos/{id}
     * Devuelve 200 con el producto o 404 si no existe.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(service.buscarPorId(id));
    }

    /**
     * POST /api/productos
     * Crea un nuevo producto. Valida el cuerpo con @Valid.
     * Devuelve 201 Created con el producto persistido.
     */
    @PostMapping
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        Producto creado = service.crear(producto);
        return ResponseEntity.status(HttpStatus.CREATED).body(creado);
    }

    /**
     * PUT /api/productos/{id}
     * Actualiza todos los campos del producto.
     * Devuelve 200 con el producto actualizado o 404 si no existe.
     */
    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(
            @PathVariable Long id,
            @Valid @RequestBody Producto producto) {
        return ResponseEntity.ok(service.actualizar(id, producto));
    }

    /**
     * PATCH /api/productos/{id}/stock?cantidad=50
     * Actualiza solo el stock. Útil para operaciones de inventario.
     */
    @PatchMapping("/{id}/stock")
    public ResponseEntity<Producto> actualizarStock(
            @PathVariable Long id,
            @RequestParam Integer cantidad) {
        return ResponseEntity.ok(service.actualizarStock(id, cantidad));
    }

    /**
     * DELETE /api/productos/{id}
     * Soft delete: marca el producto como inactivo (no lo elimina de la BD).
     * Devuelve 204 No Content.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        service.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}
