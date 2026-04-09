#!/bin/bash


/opt/mssql/bin/sqlservr &
PID=$!


echo "Esperando a que SQL Server inicie..."
sleep 20


/opt/mssql-tools18/bin/sqlcmd \
  -S localhost \
  -U sa \
  -P "$MSSQL_SA_PASSWORD" \
  -No \
  -i /init-db.sql

echo "Base de datos inicializada."


wait $PID