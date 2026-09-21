use("airbnb");

db.reviews.createIndex({ listing_id: 1 });
db.listings.createIndex({ id: 1 }, { unique: true });
db.listings.createIndex({ neighbourhood: 1, room_type: 1, price: 1 });
db.listings.createIndex({ host_id: 1 });

db.reviews.explain("executionStats").aggregate([
  { $match: { listing_id: 12345 } },
  { $sort: { date: -1 } }
]);

