INSERT INTO "public".subscriptions (description, geom, cron, profile_id)
  VALUES ('test test test', ST_GeomFromGeoJSON ('{ "type": "MultiPolygon",
     "coordinates": [
       [[[102.0, 2.0], [103.0, 2.0], [103.0, 3.0], [102.0, 3.0], [102.0, 2.0]]],
       [[[100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0]],
        [[100.2, 0.2], [100.8, 0.2], [100.8, 0.8], [100.2, 0.8], [100.2, 0.2]]]
       ]
     }'), '0 8 * * 0', 'f538230c-1ee0-4d3b-a1d8-53d6fd49a47e');

SELECT
  ST_AsGeoJSON (geom)
FROM
  subscriptions;

