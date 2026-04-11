IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = 'crud_db')
BEGIN
    CREATE DATABASE crud_db;
END
GO