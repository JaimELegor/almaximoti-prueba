package com.almprueba.repository;


import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;

@Repository
public class ProductoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getProductos(String clave, Long tipoId) {
        return jdbcTemplate.queryForList("EXEC sp_get_productos @clave = ?, @tipo_id = ?", clave, tipoId);

    }

    public void crearProducto(String clave, String nombre, Double precio, Long tipoId) {
        jdbcTemplate.update("EXEC sp_crear_producto ?, ?, ?, ?",
            clave, nombre, precio, tipoId);
    }

    public void editarProducto(String clave, String nombre, Double precio, Long tipoId) {
        jdbcTemplate.update("EXEC sp_editar_producto ?, ?, ?, ?",
            clave, nombre, precio, tipoId);
    }

    public void eliminarProducto(String clave) {
        jdbcTemplate.update("EXEC sp_eliminar_producto ?",
            clave);
    }
}