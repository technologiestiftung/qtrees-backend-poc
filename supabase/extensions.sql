-- Enable PostGIS (as of 3.0 contains just geometry/geography)
CREATE EXTENSION postgis;

-- enable raster support (for 3+)
-- CREATE EXTENSION postgis_raster;
-- Enable Topology
-- CREATE EXTENSION postgis_topology;
-- Enable PostGIS Advanced 3D
-- and other geoprocessing algorithms
-- sfcgal not available with all distributions
-- CREATE EXTENSION postgis_sfcgal;
-- fuzzy matching needed for Tiger
-- CREATE EXTENSION fuzzystrmatch;
-- rule based standardizer
-- CREATE EXTENSION address_standardizer;
-- example rule data set
-- Enable US Tiger Geocoder
-- CREATE EXTENSION postgis_tiger_geocoder;
-- modification time tracking
CREATE EXTENSION moddatetime;

