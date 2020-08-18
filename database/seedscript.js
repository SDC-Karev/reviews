const faker = require("faker");
const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

//slightly biased toward returning a 0
function getRandomTinyInt() {
  return Math.round((Math.random() - 0.2) * 1);
}

function getRandomHrs(max) {
  return parseFloat(((Math.random() * Math.floor(max)).toFixed(1)));
}
//
const seedDB = () => {
  console.log('starting seed process');
  const records = [...Array(20000)].map(() => {
    const gameId = getRandomInt(100);
    const authorId = getRandomInt(100);
    const date = faker.date.between('2020-05-01', '2020-08-12').toISOString().split('T')[0];
    const text = faker.lorem.paragraph();
    //0 good review, 1 bad review
    const reviewType = getRandomTinyInt();
    const hrsAtReview = getRandomHrs(300);
    const purchaseType = getRandomTinyInt();
    const lang = 'English';
    const earlyAccess = getRandomTinyInt();
    return new Promise((resolve, reject) => {
      connection.query(
        `INSERT INTO reviews (game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, early_access)
        VALUES (${gameId},${authorId},'${date}','${text}',${reviewType},${hrsAtReview},${purchaseType},'${lang}',${earlyAccess})`, (err, reviews) => {
          if (err) {
            reject(err);
          } else {
            resolve(reviews);
          }
        }
      );
    });
  });
  return Promise.all(records)
    .then(() => {
      console.log('reviews seeded, moving to authors');
      const authors = [...Array(100)].map(() => {
        const name = faker.internet.userName();
        const productCount = getRandomInt(100);
        const reviewCount = getRandomInt(100);
        const hrsOnRecord = getRandomHrs(75);
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO authors (name, product_count, review_count, hrs_on_record)
            VALUES ('${name}',${productCount},${reviewCount},${hrsOnRecord})`, (err, author) => {
              if (err) {
                reject(err);
              } else {
                resolve(author);
              }
            }
          );
        });
      });
      return Promise.all(authors);
    })
    .then(() => {
      console.log('authors seeded, moving to games');
      const games = [...Array(100)].map(() => {
        const fakeGame = faker.lorem.word() + " " + faker.lorem.word();
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO games (name) VALUES ('${fakeGame}')`, (err, game) => {
              if (err) {
                reject(err);
              } else {
                resolve(game);
              }
            }
          );
        });
      });
      return Promise.all(games);
    })
    .then(() => {
      console.log('games seeded, moving to awards');
      const awards = ['helpful', 'unhelpful', 'funny', 'Wow!', 'I like turtles', 'Wassup', 'Gold', 'Woohoo'].map((award) => {
        const awardToInsert = award;
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO awards (name)
            VALUES ('${awardToInsert}')`, (err, newAward) => {
              if (err) {
                reject(err);
              } else {
                resolve(newAward);
              }
            }
          );
        });
      });
      return Promise.all(awards);
    })
    .then(() => {
      console.log('awards seeded, moving to reviews_awards');
      const reviewsAwards = [...Array(100000)].map(() => {
        const reviewId = getRandomInt(10000);
        const awardId = getRandomInt(3);
        const authorId = getRandomInt(100);
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO reviews_awards (review_id, award_id, author_id)
            VALUES (${reviewId},${awardId},${authorId})`, (err, reviewAward) => {
              if (err) {
                reject(err);
              } else {
                resolve(reviewAward);
              }
            }
          );
        });
      });
      return Promise.all(reviewsAwards);
    })
    .then(() => {
      console.log('reviews_awards seeded, moving to authors_games');
      const authorsGames = [...Array(1000)].map(() => {
        const authorId = getRandomInt(100);
        const gameId = getRandomInt(100);
        const hoursPlayed = getRandomHrs(100);
        return new Promise((resolve, reject) => {
          connection.query(
            `INSERT INTO authors_games (author_id, game_id, hours_played)
            VALUES (${authorId},${gameId},${hoursPlayed})`, (err, authGame) => {
              if (err) {
                reject(err);
              } else {
                resolve(authGame);
              }
            }
          );
        });
      });
      return Promise.all(authorsGames);
    })
    .catch((err) => console.log(err))
    .then(() => {
      console.log('all tables seeded');
      process.exit(0);
    });
};
seedDB();
// const seedReviewsTable = () => {
//   const desiredRecords = 20000;
//   for (let i = 0; i < desiredRecords; i++) {
//     let gameId = getRandomInt(100);
//     let authorId = getRandomInt(100);
//     let date = faker.date.between('2020-05-01', '2020-08-12').toISOString().split('T')[0];
//     let text = faker.lorem.paragraph();
//     //0 good review, 1 bad review
//     let reviewType = getRandomTinyInt();
//     let hrsAtReview = getRandomHrs(300);
//     let purchaseType = getRandomTinyInt();
//     let lang = 'English';
//     let earlyAccess = getRandomTinyInt();
//     connection.query(
//       `INSERT INTO reviews (game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, early_access)
//       VALUES (${gameId},${authorId},'${date}','${text}',${reviewType},${hrsAtReview},${purchaseType},'${lang}',${earlyAccess})`);
//   }
//   console.log('done reviews');
// }
//
// var seedAuthorsTable = function() {
//   let desiredRecords = 100;
//   for (let i = 0; i < desiredRecords; i++) {
//     let name = faker.internet.userName();
//     let productCount = getRandomInt(100);
//     let reviewCount = getRandomInt(100);
//     let hrsOnRecord = getRandomHrs(75);
//   connection.query(
//     `INSERT INTO authors (name, product_count, review_count, hrs_on_record)
//     VALUES ('${name}',${productCount},${reviewCount},${hrsOnRecord})`);
// }
//   console.log('authors table done');
// }
// //
// var seedGamesTable = function() {
//   let desiredRecords = 100;
//   for (let i = 0; i < desiredRecords; i++) {
//     var fakeGame = faker.lorem.word() + " " + faker.lorem.word();
//     connection.query(`INSERT INTO games (name) VALUES ('${fakeGame}')`);
//   }
//   console.log('done games');
// }
// //
// var seedAwardsTable = function() {
//   let desiredRecords = 8;
//   let awards = ["helpful", "unhelpful", "funny","Wow!","I like turtles", "Wassup", "Gold","Woohoo"]
//   for (let i = 0; i < desiredRecords; i++) {
//     let fakeAward = awards[i];
//     connection.query(
//       `INSERT INTO awards (name)
//       VALUES ('${fakeAward}')`);
//   }
//   console.log('done awards');
// }
// //
// var seedReviewsAwardsTable = function() {
//   let desiredRecords = 100000;
//   var count = 0;
//   for (let i = 0; i < desiredRecords; i++) {
//     let reviewId = getRandomInt(10000);
//     let awardId = getRandomInt(3);
//     let authorId = getRandomInt(100);
//     connection.query(
//       `INSERT INTO reviews_awards (review_id, award_id, author_id)
//       VALUES (${reviewId},${awardId},${authorId})`);
//   }
//   console.log('done reviews_awards')
// }
// //
// var seedAuthorsGamesTable = function() {
//   let desiredRecords = 1000;
//   for (let i = 0; i < desiredRecords; i++) {
//     let authorId = getRandomInt(100);
//     let gameId = getRandomInt(100);
//     let hoursPlayed = getRandomHrs(100);
//     connection.query(
//       `INSERT INTO authors_games (author_id, game_id, hours_played)
//       VALUES (${authorId},${gameId},${hoursPlayed})`);
//   }
//   console.log('done authors_games')
// }

// seedGamesTable();
// seedAuthorsTable();
// seedReviewsTable();
// seedAwardsTable();
// seedReviewsAwardsTable();
// seedAuthorsGamesTable();
// console.log('please wait ~1 minute for seeding of reviews_awards to complete');