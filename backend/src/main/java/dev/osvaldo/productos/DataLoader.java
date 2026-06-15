package dev.osvaldo.productos;

import dev.osvaldo.productos.model.Categoria;
import dev.osvaldo.productos.model.Producto;
import dev.osvaldo.productos.repository.ProductoRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.util.List;

/**
 * Carga datos de prueba al iniciar la aplicación.
 *
 * CommandLineRunner se ejecuta automáticamente después de que
 * Spring Boot termina de inicializar el contexto.
 *
 * Solo inserta datos si la tabla está vacía (evita duplicados
 * cuando se usa ddl-auto=update en lugar de create-drop).
 */
@Component
public class DataLoader implements CommandLineRunner {

    private final ProductoRepository repository;

    public DataLoader(ProductoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... args) {
        if (repository.count() > 0) return;

        List<Producto> productos = List.of(
            new Producto("Paleta de Fresa",       "Paleta artesanal de fresa natural",      new BigDecimal("18.00"), 50,  Categoria.PALETA),
            new Producto("Paleta de Mango",        "Paleta de mango con chile",               new BigDecimal("18.00"), 45,  Categoria.PALETA),
            new Producto("Paleta de Chocolate",    "Paleta bañada en chocolate oscuro",       new BigDecimal("22.00"), 30,  Categoria.PALETA),
            new Producto("Helado de Vainilla",     "Bola de helado de vainilla artesanal",   new BigDecimal("25.00"), 20,  Categoria.HELADO),
            new Producto("Helado de Pistache",     "Helado artesanal de pistache",            new BigDecimal("28.00"), 15,  Categoria.HELADO),
            new Producto("Agua de Jamaica",        "Agua fresca de jamaica natural 500ml",    new BigDecimal("15.00"), 40,  Categoria.BEBIDA),
            new Producto("Agua de Horchata",       "Agua fresca de horchata 500ml",           new BigDecimal("15.00"), 35,  Categoria.BEBIDA),
            new Producto("Paleta de Tamarindo",    "Paleta de tamarindo con chile y limón",  new BigDecimal("20.00"), 60,  Categoria.PALETA),
            new Producto("Nieve de Limón",         "Nieve artesanal de limón real",           new BigDecimal("20.00"), 25,  Categoria.HELADO),
            new Producto("Cacahuates Japoneses",   "Cacahuates japoneses 100g",               new BigDecimal("12.00"), 80,  Categoria.SNACK)
        );

        repository.saveAll(productos);
        System.out.println("\n✅ DataLoader: " + productos.size() + " productos de prueba cargados en productos_db\n");
    }
}
