package com.almprueba.repository;


import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;

@Repository
public class ProveedorRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getProveedores() {
        return jdbcTemplate.queryForList("EXEC sp_get_proveedores");

    }

    public void crearProveedor(String nombre, String descripcion) {
        jdbcTemplate.update(
            "EXEC sp_crear_proveedor @nombre = ?, @descripcion = ?",
            nombre, descripcion
        );
    }

    public void editarProveedor(Long id, String nombre, String descripcion) {
        jdbcTemplate.update(
            "EXEC sp_editar_proveedor @id = ?, @nombre = ?, @descripcion = ?",
            id, nombre, descripcion
        );
    }

    public void eliminarProveedor(Long id) {
        jdbcTemplate.update(
            "EXEC sp_eliminar_proveedor @id = ?",
            id
        );
    }

}