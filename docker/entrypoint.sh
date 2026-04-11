#!/bin/bash

/opt/mssql/bin/sqlservr &
PID=$!

echo "Esperando a que SQL Server inicie..."

# Espera a que se cree el server
for i in {1..30}; do
  /opt/mssql-tools18/bin/sqlcmd \
    -S localhost -U sa -P "$MSSQL_SA_PASSWORD" \
    -No -Q "SELECT 1" > /dev/null 2>&1
  if [ $? -eq 0 ]; then
    echo "SQL Server listo."
    break
  fi
  echo "Intento $i/30 — esperando 2 segundos..."
  sleep 2
done

# Ejecutar init_db.sql primero (crea la base de datos)
echo "Ejecutando init-db.sql..."
/opt/mssql-tools18/bin/sqlcmd \
  -S localhost -U sa -P "$MSSQL_SA_PASSWORD" \
  -No -i /init-db.sql
echo "Base de datos creada."

# Ejecutar scripts en orden
for script in /docker-entrypoint-initdb.d/01_schema.sql \
              /docker-entrypoint-initdb.d/02_procedures.sql \
              /docker-entrypoint-initdb.d/03_seed.sql; do
  if [ -f "$script" ]; then
    echo "Ejecutando $script..."
    /opt/mssql-tools18/bin/sqlcmd \
      -S localhost -U sa -P "$MSSQL_SA_PASSWORD" \
      -d crud_db \
      -No -i "$script"
    if [ $? -ne 0 ]; then
      echo "ERROR: Falló la ejecución de $script"
      exit 1
    fi
    echo "$script ejecutado correctamente."
  else
    echo "ADVERTENCIA: No se encontró $script"
  fi
done

echo "Inicialización completa."
wait $PID