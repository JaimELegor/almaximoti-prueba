package com.almprueba.controller;

import com.almprueba.service.TipoProductoService;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/tipos")
public class TipoProductoController {

    @Autowired
    private TipoProductoService service;

    @GetMapping
    public List<Map<String, Object>> getAll(
    ) {
        return service.getAll();
    }
}