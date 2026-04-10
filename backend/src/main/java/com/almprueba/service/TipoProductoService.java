package com.almprueba.service;

import com.almprueba.repository.TipoProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@Service
public class TipoProductoService {

    @Autowired
    private TipoProductoRepository repository;

    public List<Map<String, Object>> getAll() {
        return repository.getTipos();
    }
}