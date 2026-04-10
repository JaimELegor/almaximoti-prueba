package com.almprueba.repository;


import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;

@Repository
public class ProductoProveedorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getProductosProveedor(String clave) {
        return jdbcTemplate.queryForList("EXEC sp_get_productos_proveedor @clave = ?", clave);

    }

    public void crearProductoProveedor(String claveProducto, String claveProveedor, Double costo, Long proveedorId) {
        jdbcTemplate.update("EXEC sp_crear_producto_proveedor ?, ?, ?, ?",
            claveProducto, claveProveedor, costo, proveedorId);
    }

    public void editarProductoProveedor(String claveProveedor, Double costo) {
        jdbcTemplate.update("EXEC sp_editar_producto_proveedor ?, ?",
            claveProveedor, costo);
    }

    public void eliminarProductoProveedor(String claveProveedor) {
        jdbcTemplate.update("EXEC sp_eliminar_producto_proveedor ?",
            claveProveedor);
    }
}