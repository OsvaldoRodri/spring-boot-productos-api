package dev.osvaldo.productos.service;

import dev.osvaldo.productos.exception.ProductoNotFoundException;
import dev.osvaldo.productos.model.Categoria;
import dev.osvaldo.productos.model.Producto;
import dev.osvaldo.productos.repository.ProductoRepository;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Capa de servicio: contiene la lógica de negocio.
 *
 * El Controlador no accede al Repositorio directamente — siempre pasa
 * por el Servicio. Esto separa responsabilidades:
 *   Controlador → maneja HTTP (request/response)
 *   Servicio    → maneja lógica de negocio
 *   Repositorio → maneja acceso a datos
 *
 * @Service registra esta clase como bean de Spring (inyectable con @Autowired)
 */
@Service
public class ProductoService {

    private final ProductoRepository repository;

    /** Inyección de dependencias por constructor (práctica recomendada sobre @Autowired en campo) */
    public ProductoService(ProductoRepository repository) {
        this.repository = repository;
    }

    /** Devuelve todos los productos activos */
    public List<Producto> listarActivos() {
        return repository.findByActivoTrue();
    }

    /** Devuelve todos los productos (activos e inactivos) */
    public List<Producto> listarTodos() {
        return repository.findAll();
    }

    /** Busca un producto por ID — lanza 404 si no existe */
    public Producto buscarPorId(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ProductoNotFoundException(id));
    }

    /** Busca productos cuyo nombre contiene el texto (case-insensitive) */
    public List<Producto> buscarPorNombre(String nombre) {
        return repository.findByNombreContainingIgnoreCase(nombre);
    }

    /** Filtra productos por categoría */
    public List<Producto> buscarPorCategoria(Categoria categoria) {
        return repository.findByCategoria(categoria);
    }

    /** Crea un nuevo producto y lo persiste en la BD */
    public Producto crear(Producto producto) {
        return repository.save(producto);
    }

    /** Actualiza todos los campos de un producto existente */
    public Producto actualizar(Long id, Producto datos) {
        Producto existente = buscarPorId(id);
        existente.setNombre(datos.getNombre());
        existente.setDescripcion(datos.getDescripcion());
        existente.setPrecio(datos.getPrecio());
        existente.setStock(datos.getStock());
        existente.setCategoria(datos.getCategoria());
        existente.setActivo(datos.getActivo());
        return repository.save(existente);
    }

    /** Actualiza únicamente el stock de un producto */
    public Producto actualizarStock(Long id, Integer nuevoStock) {
        if (nuevoStock < 0) {
            throw new IllegalArgumentException("El stock no puede ser negativo");
        }
        Producto existente = buscarPorId(id);
        existente.setStock(nuevoStock);
        return repository.save(existente);
    }

    /** Soft delete: marca el producto como inactivo en lugar de eliminarlo físicamente */
    public void eliminar(Long id) {
        Producto existente = buscarPorId(id);
        existente.setActivo(false);
        repository.save(existente);
    }
}
