const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

const getRecentReviews = function(gameId) {
  return new Promise((resolve, reject) => {
    connection.query(
    `SELECT reviews.id, reviews.date, reviews.text, authors.name, reviews.review_type, reviews.hrs_at_review
    FROM reviews
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE reviews.game_id = ${gameId}
    ORDER BY reviews.date DESC
    LIMIT 10`, function (err, reviews) {
      if (err) {
        reject(err);
      } else {
        resolve(reviews);
      }
    });
  })
};

const getHelpfulReviews = function(gameId) {
  return new Promise((resolve, reject) => {
    connection.query(
    `SELECT review_id, count(*), awards.name, reviews.date, reviews.text, authors.name, reviews.review_type, authors.product_count, authors.review_count, authors.hrs_on_record, reviews.hrs_at_review
    FROM reviews_awards
    INNER JOIN reviews ON reviews_awards.review_id = reviews.id
    INNER JOIN authors ON reviews.author_id = authors.id
    INNER JOIN awards ON reviews_awards.award_id = awards.id
    WHERE award_id = 1 AND reviews.game_id = ${gameId}
    GROUP BY review_id
    ORDER BY count(*) DESC
    LIMIT 10`, function (err, reviews) {
      if (err) {
        reject(err);
      } else {
        resolve(reviews);
      }
    });
  })
};

const getAllReviews = function(gameId) {
  return new Promise((resolve, reject) => {
    connection.query(
    `SELECT reviews.id, reviews.date, reviews.text, authors.name, reviews.review_type, authors.product_count, authors.review_count, authors.hrs_on_record, reviews.hrs_at_review
    FROM reviews
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE reviews.game_id = ${gameId}`, function (err, reviews) {
      if (err) {
        reject(err);
      } else {
        resolve(reviews);
      }
    });
  })
};

const getAwards = function(reviewId) {
  return new Promise((resolve, reject) => {
    connection.query(
    `SELECT reviews_awards.award_id,count(*), awards.name
    FROM reviews_awards
    INNER JOIN awards ON reviews_awards.award_id = awards.id
    WHERE review_id = ${reviewId}
    GROUP BY award_id
    ORDER BY awards.id`, function (err, awards) {
      if (err) {
        reject(err);
      } else {
        resolve(awards);
      }
    });
  });
}


// const getAwards = function(reviewId, callback) {
//   connection.query(`select reviews_awards.award_id,count(*), awards.name from reviews_awards inner join awards on reviews_awards.award_id = awards.id where review_id = ${reviewId} group by award_id`, function (err, awards) {
//     if (err) {
//       callback(err, null);
//     } else {
//       callback(null, awards);
//     }
//   });
// }

// select reviews.id, reviews.review_date, reviews.review_text, authors.name from reviews inner join authors on reviews.author_id = authors.id;

module.exports = {
  getRecentReviews,
  getHelpfulReviews,
  getAllReviews,
  getAwards
}