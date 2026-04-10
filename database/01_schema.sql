
USE crud_db;
GO

-- =========================
-- TABLA: TipoProducto
-- =========================
CREATE TABLE tipo_producto (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(100) NOT NULL,
    descripcion NVARCHAR(255),

    CONSTRAINT uq_tipo_nombre UNIQUE (nombre)
);
GO

-- =========================
-- TABLA: Proveedor
-- =========================
CREATE TABLE proveedor (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    nombre NVARCHAR(150) NOT NULL,
    descripcion NVARCHAR(255),

    CONSTRAINT uq_proveedor_nombre UNIQUE (nombre)
);
GO

-- =========================
-- TABLA: Producto
-- =========================
CREATE TABLE producto (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    clave NVARCHAR(50) NOT NULL,
    nombre NVARCHAR(150) NOT NULL,
    precio DECIMAL(10,2) NOT NULL,
    tipo_producto_id BIGINT NOT NULL,

    CONSTRAINT uq_producto_clave UNIQUE (clave),

    CONSTRAINT fk_producto_tipo
        FOREIGN KEY (tipo_producto_id)
        REFERENCES tipo_producto(id)
        ON DELETE NO ACTION
        ON UPDATE NO ACTION
);
GO

-- =========================
-- TABLA: ProductoProveedor
-- =========================
CREATE TABLE producto_proveedor (
    id BIGINT IDENTITY(1,1) PRIMARY KEY,
    producto_id BIGINT NOT NULL,
    proveedor_id BIGINT NOT NULL,
    clave_proveedor NVARCHAR(100) NOT NULL,
    costo DECIMAL(10,2) NOT NULL,

    CONSTRAINT fk_pp_producto
        FOREIGN KEY (producto_id)
        REFERENCES producto(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_pp_proveedor
        FOREIGN KEY (proveedor_id)
        REFERENCES proveedor(id)
        ON DELETE NO ACTION,

    CONSTRAINT uq_producto_proveedor UNIQUE (producto_id, proveedor_id)
);
GO

-- =========================
-- ÍNDICES
-- =========================
CREATE INDEX idx_producto_tipo
    ON producto(tipo_producto_id);
GO

CREATE INDEX idx_pp_producto
    ON producto_proveedor(producto_id);
GO

CREATE INDEX idx_pp_proveedor
    ON producto_proveedor(proveedor_id);
GO