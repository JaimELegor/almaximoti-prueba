package com.almprueba.repository;

import org.springframework.stereotype.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import java.util.List;
import java.util.Map;


@Repository
public class TipoProductoRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Map<String, Object>> getTipos() {
        return jdbcTemplate.queryForList("EXEC sp_get_tipos");

    }
}