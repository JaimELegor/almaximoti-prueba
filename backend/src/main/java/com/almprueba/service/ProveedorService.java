package com.almprueba.service;

import com.almprueba.repository.ProveedorRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@Service
public class ProveedorService {

    @Autowired
    private ProveedorRepository repository;

    public List<Map<String, Object>> getProveedores() {
        return repository.getProveedores();
    }

    public void crearProveedor(String nombre, String descripcion) {
        repository.crearProveedor(nombre, descripcion);
    }

    public void editarProveedor(Long id, String nombre, String descripcion) {
        repository.editarProveedor(id, nombre, descripcion);
    }

    public void eliminarProveedor(Long id) {
        repository.eliminarProveedor(id);
    }

}