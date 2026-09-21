use("airbnb");

db.listings.find(
  { city: /madrid/i, price: { $gt: 0 } },
  { name: 1, neighbourhood: 1, room_type: 1, price: 1 }
).sort({ price: -1 }).limit(20);

db.listings.aggregate([
  { $match: { price: { $gt: 0 } } },
  { $group: { _id: "$room_type", listings: { $sum: 1 }, average_price: { $avg: "$price" } } },
  { $sort: { listings: -1 } }
]);

db.listings.aggregate([
  { $match: { price: { $gt: 0 } } },
  { $group: { _id: "$neighbourhood", listings: { $sum: 1 }, median_candidates: { $push: "$price" }, average_price: { $avg: "$price" } } },
  { $sort: { average_price: -1 } },
  { $limit: 20 }
]);

db.listings.aggregate([
  { $group: { _id: { id: "$host_id", name: "$host_name" }, listings: { $sum: 1 }, mean_price: { $avg: "$price" } } },
  { $sort: { listings: -1 } },
  { $limit: 20 }
]);

db.listings.aggregate([
  { $match: { review_scores_rating: { $ne: null } } },
  { $group: { _id: "$neighbourhood", mean_rating: { $avg: "$review_scores_rating" }, rated_listings: { $sum: 1 } } },
  { $match: { rated_listings: { $gte: 30 } } },
  { $sort: { mean_rating: -1 } }
]);

db.reviews.aggregate([
  { $group: { _id: "$listing_id", review_count: { $sum: 1 }, latest_review: { $max: "$date" } } },
  { $sort: { review_count: -1 } },
  { $limit: 20 },
  { $lookup: { from: "listings", localField: "_id", foreignField: "id", as: "listing" } },
  { $unwind: "$listing" },
  { $project: { _id: 0, listing_id: "$_id", name: "$listing.name", neighbourhood: "$listing.neighbourhood", review_count: 1, latest_review: 1 } }
]);

db.reviews.aggregate([
  { $addFields: { review_date: { $convert: { input: "$date", to: "date", onError: null, onNull: null } } } },
  { $match: { review_date: { $ne: null } } },
  { $group: { _id: { year: { $year: "$review_date" }, month: { $month: "$review_date" } }, reviews: { $sum: 1 } } },
  { $sort: { "_id.year": 1, "_id.month": 1 } }
]);

