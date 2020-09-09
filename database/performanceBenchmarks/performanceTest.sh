# Postgres Credentials
pg_username="steventrager"
pg_password="dsfds"


# retrieve all data
PGPASSWORD=${pg_password} psql -U ${pg_username} -d reviews -a -f "${PWD}/database/performanceBenchmarks/postgresPerf.sql"

# mongo retrieve all data
