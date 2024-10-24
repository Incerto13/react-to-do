# Use the official PostgreSQL image
FROM postgres:latest

# Copy the seed.sql file into the Docker image
# The default entrypoint script of the Postgres image will handle running the SQL file
COPY docker/postgres/seed.sql /docker-entrypoint-initdb.d/
