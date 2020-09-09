const { Client } = require('pg');
const config = require('./config.js');

const client = new Client({
  user: config.pgUser,
  host: 'localhost',
  database: config.database,
  password: config.pgPass,
  port: 5432,
})
client.connect();

let today = new Date();
today.setMonth(today.getMonth() - 1);
let recentDate = today.toISOString().split('T')[0];

let getRecentReviews = (gameId, cb) => {
  client.query(`SELECT reviews.id, reviews.date, reviews.text, authors.name, reviews.review_type, reviews.hrs_at_review
    FROM reviews
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE reviews.game_id = ${gameId}
    ORDER BY reviews.date DESC
    LIMIT 10`, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
}

let getAwards = (reviewId, cb) => {
  let query = `SELECT reviews_awards.award_id, count(*), awards.name
  FROM reviews_awards
  INNER JOIN awards ON reviews_awards.award_id = awards.id
  WHERE review_id = ${reviewId}
  GROUP BY 1, 3
  ORDER BY 1;`

  client.query(query, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
}

let getHelpfulReviews = (gameId, cb) => {
  let query = `SELECT review_id, count(*), awards.name, reviews.date, reviews.text, authors.name, reviews.review_type, authors.product_count, authors.review_count, authors.hrs_on_record, reviews.hrs_at_review
    FROM reviews_awards
    INNER JOIN reviews ON reviews_awards.review_id = reviews.id
    INNER JOIN authors ON reviews.author_id = authors.id
    INNER JOIN awards ON reviews_awards.award_id = awards.id
    WHERE award_id = 1 AND reviews.game_id = ${gameId} AND reviews.date >= '${recentDate}'
    GROUP BY 1,3,4,5,6,7,8,9,10,11
    ORDER BY 2 DESC
    LIMIT 10`

  client.query(query, (err, res) => {
    if (err) {
      cb(err);
    } else {
      cb(null, res);
    }
  });
}

const getReviewCount = function (gameId) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT count(*)
      FROM reviews
      WHERE game_id = ${gameId}`, function (err, count) {
      if (err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  })
}

const getRecentReviewCount = function (gameId) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT count(*)
      FROM reviews
      WHERE date >= '${recentDate}' and game_id = ${gameId}`, function (err, count) {
      if (err) {
        reject(err);
      } else {
        resolve(count);
      }
    });
  })
}

const getReviewSentiment = function (gameId) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT review_type, count(*) as "count(*)"
      FROM reviews
      WHERE game_id = ${gameId}
      GROUP BY review_type`, function (err, sentiment) {
      if (err) {
        reject(err);
      } else {
        resolve(sentiment);
      }
    });
  })
}

const getRecentReviewSentiment = function (gameId) {
  return new Promise((resolve, reject) => {
    client.query(
      `SELECT review_type, count(*) as "count(*)"
      FROM reviews
      WHERE date >= '${recentDate}' and game_id = ${gameId}
      GROUP BY review_type`, function (err, sentiment) {
      if (err) {
        reject(err);
      } else {
        resolve(sentiment);
      }4532
    });
  })
}

exports.getRecentReviews = getRecentReviews;
exports.getAwards = getAwards;
exports.getHelpfulReviews = getHelpfulReviews
exports.getReviewCount = getReviewCount;
exports.getRecentReviewCount = getRecentReviewCount;
exports.getReviewSentiment = getReviewSentiment;
exports.getRecentReviewSentiment = getRecentReviewSentiment;