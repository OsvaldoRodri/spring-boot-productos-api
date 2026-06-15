package dev.osvaldo.productos.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

/**
 * Entidad JPA que representa un producto en el inventario.
 *
 * Anotaciones clave:
 *   @Entity       — le dice a Hibernate que esta clase mapea a una tabla
 *   @Table        — nombre explícito de la tabla en PostgreSQL
 *   @Id           — clave primaria
 *   @GeneratedValue — el ID lo genera la BD automáticamente (IDENTITY = SERIAL en Postgres)
 *   @Column       — configuración de columna (nullable, length, etc.)
 *   @Enumerated   — almacena el enum como String, no como número
 */
@Entity
@Table(name = "productos")
public class Producto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank(message = "El nombre no puede estar vacío")
    @Size(max = 100, message = "El nombre no puede superar 100 caracteres")
    @Column(nullable = false, length = 100)
    private String nombre;

    @Size(max = 255, message = "La descripción no puede superar 255 caracteres")
    @Column(length = 255)
    private String descripcion;

    @NotNull(message = "El precio es obligatorio")
    @DecimalMin(value = "0.01", message = "El precio debe ser mayor a 0")
    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal precio;

    @NotNull(message = "El stock es obligatorio")
    @Min(value = 0, message = "El stock no puede ser negativo")
    @Column(nullable = false)
    private Integer stock;

    @NotNull(message = "La categoría es obligatoria")
    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 20)
    private Categoria categoria;

    @Column(nullable = false)
    private Boolean activo = true;

    @Column(name = "creado_en", updatable = false)
    private LocalDateTime creadoEn;

    @Column(name = "actualizado_en")
    private LocalDateTime actualizadoEn;

    @PrePersist
    protected void onCreate() {
        creadoEn     = LocalDateTime.now();
        actualizadoEn = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        actualizadoEn = LocalDateTime.now();
    }

    // ── Constructores ────────────────────────────────────────────────────────
    public Producto() {}

    public Producto(String nombre, String descripcion, BigDecimal precio,
                    Integer stock, Categoria categoria) {
        this.nombre      = nombre;
        this.descripcion = descripcion;
        this.precio      = precio;
        this.stock       = stock;
        this.categoria   = categoria;
    }

    // ── Getters y Setters ────────────────────────────────────────────────────
    public Long getId()                    { return id; }
    public String getNombre()              { return nombre; }
    public void setNombre(String nombre)   { this.nombre = nombre; }
    public String getDescripcion()         { return descripcion; }
    public void setDescripcion(String d)   { this.descripcion = d; }
    public BigDecimal getPrecio()          { return precio; }
    public void setPrecio(BigDecimal p)    { this.precio = p; }
    public Integer getStock()              { return stock; }
    public void setStock(Integer stock)    { this.stock = stock; }
    public Categoria getCategoria()        { return categoria; }
    public void setCategoria(Categoria c)  { this.categoria = c; }
    public Boolean getActivo()             { return activo; }
    public void setActivo(Boolean activo)  { this.activo = activo; }
    public LocalDateTime getCreadoEn()     { return creadoEn; }
    public LocalDateTime getActualizadoEn(){ return actualizadoEn; }
}
