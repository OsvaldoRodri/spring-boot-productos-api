package dev.osvaldo.productos.exception;

/**
 * Se lanza cuando se busca un Producto por ID y no existe en la BD.
 * El GlobalExceptionHandler la captura y devuelve HTTP 404.
 */
public class ProductoNotFoundException extends RuntimeException {

    public ProductoNotFoundException(Long id) {
        super("Producto no encontrado con ID: " + id);
    }
}
