const faker = require("faker");
const mysql = require('mysql');
const mysqlConfig = require('./config.js');

const connection = mysql.createConnection(mysqlConfig);

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max) + 1);
}

//slightly biased toward returning a 0
function getRandomTinyInt() {
  return Math.round((Math.random() - .2) * 1);
}

function getRandomHrs(max) {
  return parseFloat(((Math.random() * Math.floor(max)).toFixed(1)));
}
//
var seedReviewsTable = function() {
  let desiredRecords = 20000;
  for (let i = 0; i < desiredRecords; i++) {
    let gameId = getRandomInt(100);
    let authorId = getRandomInt(100);
    let date = faker.date.between('2020-05-01', '2020-08-12').toISOString().split('T')[0];
    let text = faker.lorem.paragraph();
    let reviewType = getRandomTinyInt();
    let hrsAtReview = getRandomHrs(300);
    let purchaseType = getRandomTinyInt();
    let lang = 'English';
    let earlyAccess = getRandomTinyInt();
    connection.query(
      `INSERT INTO reviews (game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, early_access)
      VALUES (${gameId},${authorId},'${date}','${text}',${reviewType},${hrsAtReview},${purchaseType},'${lang}',${earlyAccess})`);
  }
  console.log('done reviews');
}
//
var seedAuthorsTable = function() {
  let desiredRecords = 100;
  for (let i = 0; i < desiredRecords; i++) {
    let name = faker.internet.userName();
    let productCount = getRandomInt(100);
    let reviewCount = getRandomInt(100);
    let hrsOnRecord = getRandomHrs(75);
    connection.query(
      `INSERT INTO authors (name, product_count, review_count, hrs_on_record)
      VALUES ('${name}',${productCount},${reviewCount},${hrsOnRecord})`);
  }
  console.log('authors table done');
}
//
var seedGamesTable = function() {
  let desiredRecords = 100;
  for (let i = 0; i < desiredRecords; i++) {
    var fakeGame = faker.lorem.word() + " " + faker.lorem.word();
    connection.query(`INSERT INTO games (name) VALUES ('${fakeGame}')`);
  }
  console.log('done games');
}
//
var seedAwardsTable = function() {
  let desiredRecords = 8;
  let awards = ["helpful", "unhelpful", "funny","Wow!","I like turtles", "Wassup", "Gold","Woohoo"]
  for (let i = 0; i < desiredRecords; i++) {
    let fakeAward = awards[i];
    connection.query(
      `INSERT INTO awards (name)
      VALUES ('${fakeAward}')`);
  }
  console.log('done awards');
}
//
var seedReviewsAwardsTable = function() {
  let desiredRecords = 100000;
  var count = 0;
  for (let i = 0; i < desiredRecords; i++) {
    let reviewId = getRandomInt(10000);
    let awardId = getRandomInt(3);
    let authorId = getRandomInt(100);
    connection.query(
      `INSERT INTO reviews_awards (review_id, award_id, author_id)
      VALUES (${reviewId},${awardId},${authorId})`);
    count++;
    console.log(count);
  }
  console.log('done reviews_awards')
}
//
var seedAuthorsGamesTable = function() {
  let desiredRecords = 1000;
  for (let i = 0; i < desiredRecords; i++) {
    let authorId = getRandomInt(100);
    let gameId = getRandomInt(100);
    let hoursPlayed = getRandomHrs(100);
    connection.query(
      `INSERT INTO authors_games (author_id, game_id, hours_played)
      VALUES (${authorId},${gameId},${hoursPlayed})`);
  }
  console.log('done authors_games')
}

seedGamesTable();
seedAuthorsTable();
seedReviewsTable();
seedAwardsTable();
seedReviewsAwardsTable();
seedAuthorsGamesTable();
console.log('please wait ~1 minute for seeding of reviews_awards to complete');