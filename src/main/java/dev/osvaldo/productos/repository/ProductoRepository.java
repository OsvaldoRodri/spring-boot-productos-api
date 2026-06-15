package dev.osvaldo.productos.repository;

import dev.osvaldo.productos.model.Categoria;
import dev.osvaldo.productos.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * Repositorio JPA para Producto.
 *
 * Al extender JpaRepository<Producto, Long> obtenemos GRATIS:
 *   save(), findById(), findAll(), deleteById(), count(), existsById()...
 *
 * Los métodos adicionales los define Spring Data por convención de nombre:
 *   findBy{Campo}  →  Spring genera el SQL automáticamente
 */
@Repository
public interface ProductoRepository extends JpaRepository<Producto, Long> {

    /** SELECT * FROM productos WHERE LOWER(nombre) LIKE LOWER('%nombre%') */
    List<Producto> findByNombreContainingIgnoreCase(String nombre);

    /** SELECT * FROM productos WHERE categoria = ? */
    List<Producto> findByCategoria(Categoria categoria);

    /** SELECT * FROM productos WHERE activo = true */
    List<Producto> findByActivoTrue();
}
