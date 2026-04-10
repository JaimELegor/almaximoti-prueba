package com.almprueba.service;

import com.almprueba.repository.ProductoProveedorRepository;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@Service
public class ProductoProveedorService {

    @Autowired
    private ProductoProveedorRepository repository;

    public List<Map<String, Object>> getProductosProveedor(String clave) {
        return repository.getProductosProveedor(clave);
    }

    public void crearProductoProveedor(String claveProducto, String claveProveedor, Double costo, Long proveedorId){
        repository.crearProductoProveedor(claveProducto, claveProveedor, costo, proveedorId);
    }

    public void editarProductoProveedor(String claveProveedor, Double costo) {
        repository.editarProductoProveedor(claveProveedor, costo);
    }

    public void eliminarProductoProveedor(String clave) {
        repository.eliminarProductoProveedor(clave);
    }


}