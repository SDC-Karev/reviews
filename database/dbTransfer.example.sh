#!/bin/bash

# Instructions: Make a copy of this file named dbTransfer.sh in the same directory
# 1. run chmod 755 on the file or any other command to make it executable
# 2. update the username and password variables for your mysql

# MySQL Credentials
mysql_username="mysql_username_here"
mysql_password="mysql_password_here"

# Postgres Credentials
pg_username="postgres_username_here"
pg_password="postgres_password_here"

outDir="${PWD}/database/generatedTables"

# Get Old Data from MySQL
mysql -h localhost -u ${mysql_username} -p${mysql_password} -D reviews -e "SELECT * FROM authors;" > "${outDir}/authors.csv"
mysql -h localhost -u ${mysql_username} -p${mysql_password} -D reviews -e "SELECT * FROM authors_games;" > "${outDir}/authors_games.csv"
mysql -h localhost -u ${mysql_username} -p${mysql_password} -D reviews -e "SELECT * FROM awards;" > "${outDir}/awards.csv"
mysql -h localhost -u ${mysql_username} -p${mysql_password} -D reviews -e "SELECT * FROM games;" > "${outDir}/games.csv"
mysql -h localhost -u ${mysql_username} -p${mysql_password} -D reviews -e "SELECT * FROM reviews_awards;" > "${outDir}/reviews_awards.csv"

# Create PostGres Schemas
PGPASSWORD=${pg_password} psql -U ${pg_username} -d reviews -a -f "${PWD}/database/postgresSchema.sql"

# Load PostGres Tables (file paths have to be set in postgresLoader.sql)
PGPASSWORD=${pg_password} psql -U ${pg_username} -d reviews -a -f "${PWD}/database/postgresLoader.sql"


# Load Mongo tables
mongoimport --type csv -d reviews -c reviews --headerline --drop "${outDir}/reviewRecords.csv"
mongoimport --type csv -d reviews -c authors --headerline --drop "${outDir}/authors.csv"
mongoimport --type csv -d reviews -c authors_games --headerline --drop "${outDir}/authors_games.csv"
mongoimport --type csv -d reviews -c awards --headerline --drop "${outDir}/awards.csv"
mongoimport --type csv -d reviews -c games --headerline --drop "${outDir}/games.csv"
mongoimport --type csv -d reviews -c reviews_awards --headerline --drop "${outDir}/reviews_awards.csv"
