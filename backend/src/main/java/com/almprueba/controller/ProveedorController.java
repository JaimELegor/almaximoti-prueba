package com.almprueba.controller;

import com.almprueba.service.ProveedorService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/proveedores")
public class ProveedorController {

    @Autowired
    private ProveedorService service;

    @GetMapping
    public List<Map<String, Object>> getProveedores(
    ) {
        return service.getProveedores();
    }

    @PostMapping
    public void crearProveedor(@RequestBody Map<String, Object> body) {
        service.crearProveedor(
            (String) body.get("nombre"),
            (String) body.get("descripcion")
        );
    }

    @PutMapping("/{id}")
    public void editarProveedor(@PathVariable Long id, @RequestBody Map<String, Object> body) {
        service.editarProveedor(
            id,
            (String) body.get("nombre"),
            (String) body.get("descripcion")
        );
    }

    @DeleteMapping("/{id}")
    public void eliminarProveedor(@PathVariable Long id) {
        service.eliminarProveedor(id);
    }

}