package com.almprueba.service;

import com.almprueba.repository.ProductoRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@Service
public class ProductoService {

    @Autowired
    private ProductoRepository repository;

    public List<Map<String, Object>> buscar(String clave, Long tipoId) {
        return repository.getProductos(clave, tipoId);
    }

    public void crearProducto(String clave, String nombre, Double precio, Long tipoId){
        repository.crearProducto(clave, nombre, precio, tipoId);
    }

    public void editarProducto(String clave, String nombre, Double precio, Long tipoId) {
        repository.editarProducto(clave, nombre, precio, tipoId);
    }

    public void eliminarProducto(String clave) {
        repository.eliminarProducto(clave);
    }


}