USE crud_db;
GO

IF OBJECT_ID('sp_get_productos', 'P') IS NOT NULL
    DROP PROCEDURE sp_get_productos;
GO

CREATE PROCEDURE sp_get_productos
    @clave NVARCHAR(50) = NULL,
    @tipo_id BIGINT = NULL
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        p.id,
        p.clave,
        p.nombre,
        p.precio,
        p.tipo_producto_id,
        pp.clave_proveedor
    FROM producto p
    INNER JOIN tipo_producto tp      ON tp.id = p.tipo_producto_id
    LEFT JOIN producto_proveedor pp  ON pp.producto_id = p.id
    LEFT JOIN proveedor pv           ON pv.id = pp.proveedor_id
    WHERE
        (@clave   IS NULL OR p.clave            LIKE '%' + @clave + '%')
    AND (@tipo_id IS NULL OR p.tipo_producto_id = @tipo_id)
    ORDER BY 
        p.clave ASC,
        pv.nombre ASC;
END;
GO

IF OBJECT_ID('sp_get_tipos', 'P') IS NOT NULL
    DROP PROCEDURE sp_get_tipos;
GO

CREATE PROCEDURE sp_get_tipos
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        id,
        nombre
    FROM tipo_producto;
END;
GO

IF OBJECT_ID('sp_crear_producto', 'P') IS NOT NULL
    DROP PROCEDURE sp_crear_producto;
GO

CREATE PROCEDURE sp_crear_producto
    @clave NVARCHAR(50),
    @nombre NVARCHAR(100),
    @precio DECIMAL(10,2),
    @tipo_producto_id BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    INSERT INTO producto (clave, nombre, precio, tipo_producto_id)
    VALUES (@clave, @nombre, @precio, @tipo_producto_id);
END;
GO

IF OBJECT_ID('sp_editar_producto', 'P') IS NOT NULL
    DROP PROCEDURE sp_editar_producto;
GO

CREATE PROCEDURE sp_editar_producto
    @clave NVARCHAR(50),
    @nombre NVARCHAR(100),
    @precio DECIMAL(10,2),
    @tipo_producto_id BIGINT
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE producto 
    SET nombre = @nombre,
        precio = @precio,
        tipo_producto_id = @tipo_producto_id
    WHERE clave = @clave;
END;
GO

IF OBJECT_ID('sp_eliminar_producto', 'P') IS NOT NULL
    DROP PROCEDURE sp_eliminar_producto;
GO

CREATE PROCEDURE sp_eliminar_producto
    @clave NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM producto
    WHERE clave = @clave;
END;
GO

IF OBJECT_ID('sp_crear_producto_proveedor', 'P') IS NOT NULL
    DROP PROCEDURE sp_crear_producto_proveedor;
GO 

CREATE PROCEDURE sp_crear_producto_proveedor
    @clave_producto NVARCHAR(50),
    @clave_proveedor NVARCHAR(100),
    @costo DECIMAL(10,2),
    @proveedor_id BIGINT
    
AS
BEGIN
    SET NOCOUNT ON;

    DECLARE @producto_id BIGINT;
    SELECT @producto_id = id FROM producto WHERE clave = @clave_producto;

    IF @producto_id IS NULL
    BEGIN
        RAISERROR('Producto no encontrado', 16, 1);
        RETURN;
    END

    INSERT INTO producto_proveedor (producto_id, proveedor_id, clave_proveedor, costo)
    VALUES (@producto_id, @proveedor_id, @clave_proveedor, @costo);
END;
GO

IF OBJECT_ID('sp_editar_producto_proveedor', 'P') IS NOT NULL
    DROP PROCEDURE sp_editar_producto_proveedor;
GO 

CREATE PROCEDURE sp_editar_producto_proveedor
    @clave_proveedor NVARCHAR(100),
    @costo DECIMAL(10,2)
AS
BEGIN
    SET NOCOUNT ON;
    UPDATE producto_proveedor
    SET costo = @costo
    WHERE clave_proveedor = @clave_proveedor;
END;
GO


IF OBJECT_ID('sp_eliminar_producto_proveedor', 'P') IS NOT NULL
    DROP PROCEDURE sp_eliminar_producto_proveedor;
GO 

CREATE PROCEDURE sp_eliminar_producto_proveedor
    @clave_proveedor NVARCHAR(100)
AS
BEGIN
    SET NOCOUNT ON;
    DELETE FROM producto_proveedor
    WHERE clave_proveedor = @clave_proveedor;
END;
GO


IF OBJECT_ID('sp_get_productos_proveedor', 'P') IS NOT NULL
    DROP PROCEDURE sp_get_productos_proveedor;
GO 

CREATE PROCEDURE sp_get_productos_proveedor
    @clave NVARCHAR(50)
AS
BEGIN
    SET NOCOUNT ON;

    SELECT 
        pp.id,
        pp.clave_proveedor,
        pp.costo,
        pv.id   AS proveedor_id,
        pv.nombre AS proveedor_nombre
    FROM producto_proveedor pp
    INNER JOIN producto p  ON p.id  = pp.producto_id
    INNER JOIN proveedor pv ON pv.id = pp.proveedor_id
    WHERE p.clave = @clave
    ORDER BY pv.nombre ASC;
END;
GO