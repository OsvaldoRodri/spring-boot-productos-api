package dev.osvaldo.productos.exception;

import java.time.LocalDateTime;

/**
 * DTO que estructura la respuesta de error en formato JSON consistente.
 *
 * Ejemplo de respuesta cuando un producto no existe:
 * {
 *   "timestamp": "2026-06-14T10:30:00",
 *   "status": 404,
 *   "error": "Not Found",
 *   "message": "Producto no encontrado con ID: 99"
 * }
 */
public class ErrorResponse {

    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;

    public ErrorResponse(int status, String error, String message) {
        this.timestamp = LocalDateTime.now();
        this.status    = status;
        this.error     = error;
        this.message   = message;
    }

    public LocalDateTime getTimestamp() { return timestamp; }
    public int getStatus()              { return status; }
    public String getError()            { return error; }
    public String getMessage()          { return message; }
}
