package dev.osvaldo.productos.model;

/**
 * Categorías válidas para un producto.
 * Usamos enum para garantizar que solo se acepten valores definidos.
 * En la BD se almacena como String (ORDINAL es frágil ante cambios de orden).
 */
public enum Categoria {
    PALETA,
    HELADO,
    BEBIDA,
    SNACK,
    OTRO
}
