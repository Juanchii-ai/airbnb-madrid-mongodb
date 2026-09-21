# Airbnb Madrid — MongoDB Analytics

NoSQL analytics project built around Madrid Airbnb listings and reviews.

## Dataset

- Approximately **25,000 listings**.
- **1,275,992 reviews**.
- Collections: `listings` and `reviews`.

## What it demonstrates

- Filtering, projection, sorting and updates.
- Aggregation pipelines by neighbourhood, room type and host.
- Cross-collection analysis with `$lookup`.
- Query optimisation with indexes and pre-aggregation.

## Run

Import the two collections, select the `airbnb` database, then run the scripts in order:

```bash
mongosh "mongodb://localhost:27017/airbnb" queries/01_analysis.js
mongosh "mongodb://localhost:27017/airbnb" queries/02_indexes.js
```

## Technologies

MongoDB · Aggregation Framework · NoSQLBooster · Query optimisation

