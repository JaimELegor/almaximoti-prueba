USE crud_db;
GO

-- =========================
-- TIPOS DE PRODUCTO
-- =========================
INSERT INTO tipo_producto (nombre, descripcion)
VALUES 
('Bebidas', 'Productos líquidos'),
('Snacks', 'Botanas y alimentos rápidos');
GO

-- =========================
-- PROVEEDORES
-- =========================
INSERT INTO proveedor (nombre, descripcion)
VALUES 
('Abarrotera Universal', 'Proveedor general'),
('Distribuidora Norte', 'Proveedor regional');
GO

-- =========================
-- PRODUCTOS
-- =========================
INSERT INTO producto (clave, nombre, precio, tipo_producto_id)
VALUES 
('PROD-001', 'Coca-Cola', 18.50, 1),
('PROD-002', 'Sabritas', 22.00, 2);
GO

-- =========================
-- RELACIONES PRODUCTO-PROVEEDOR
-- =========================
INSERT INTO producto_proveedor (producto_id, proveedor_id, clave_proveedor, costo)
VALUES 
(1, 1, 'COCA-UNI-001', 12.00),
(1, 2, 'COCA-NOR-777', 13.50),
(2, 1, 'SAB-UNI-002', 15.00);
GO