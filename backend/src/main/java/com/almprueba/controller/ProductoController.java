package com.almprueba.controller;

import com.almprueba.service.ProductoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/productos")
public class ProductoController {

    @Autowired
    private ProductoService service;

    @GetMapping
    public List<Map<String, Object>> buscar(
        @RequestParam(required = false) String clave,
        @RequestParam(required = false) Long tipoId
    ) {
        return service.buscar(clave, tipoId);
    }

    @PostMapping
    public void crearProducto(@RequestBody Map<String, Object> body) {
        service.crearProducto(
            (String) body.get("clave"),
            (String) body.get("nombre"),
            Double.valueOf(body.get("precio").toString()),
            Long.valueOf(body.get("tipoId").toString())
        );
    }

    @PutMapping("/{clave}") 
    public void editarProducto(@PathVariable String clave, @RequestBody Map<String, Object> body) {
        service.editarProducto(
            clave,    //PARA CONVENCION REST, IDENTIFICO EL PRODUCTO DESDE EL URL
            (String) body.get("nombre"),
            Double.valueOf(body.get("precio").toString()),
            Long.valueOf(body.get("tipoId").toString())
        );
    }

    @DeleteMapping("/{clave}") 
    public void eliminarProducto(@PathVariable String clave) {
        service.eliminarProducto(clave);
    }
}

