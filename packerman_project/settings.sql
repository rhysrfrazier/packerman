DROP DATABASE packerman;
DROP USER packeruser;
CREATE DATABASE packerman;
CREATE USER packeruser WITH PASSWORD 'user';
GRANT ALL PRIVILEGES ON DATABASE packerman TO packeruser;