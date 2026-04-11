package com.almprueba.controller;

import com.almprueba.service.ProductoProveedorService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/productos-proveedor")
public class ProductoProveedorController {

    @Autowired
    private ProductoProveedorService service;

    @GetMapping("/{clave}")
    public List<Map<String, Object>> getProductosProveedor(@PathVariable String clave) {
        return service.getProductosProveedor(clave);
    }

    @PostMapping
    public void crearProductoProveedor(@RequestBody Map<String, Object> body) {
        service.crearProductoProveedor(
            (String) body.get("clave_producto"),
            (String) body.get("clave_proveedor"),
            Double.valueOf(body.get("costo").toString()),
            Long.valueOf(body.get("proveedor_id").toString())
        );
    }

    @PutMapping("/{claveProveedor}")
    public void editarProductoProveedor(@PathVariable String claveProveedor, @RequestBody Map<String, Object> body) {
        service.editarProductoProveedor(
            claveProveedor,
            Double.valueOf(body.get("costo").toString())
        );
    }

    @DeleteMapping("/{claveProveedor}") 
    public void eliminarProductoProveedor(@PathVariable String claveProveedor) {
        service.eliminarProductoProveedor(claveProveedor);
    }
}

