const faker = require('faker');
const fs = require('fs');
const path = require('path');
var csvWriter = require('csv-write-stream');
var moment = require('moment');

const { uniqueNamesGenerator, adjectives, colors, animals, names, countries } = require('unique-names-generator');

// Specify number of rows to generate
var rowsToMake = 10000000;

// Reviews Stream
var reviewHeaders = { headers: ['id', 'game_id', 'author_id', 'date', 'text', 'review_type', 'hrs_at_review', 'purchase_type', 'lang', 'earlyAccess'] }
var reviewWriter = csvWriter(reviewHeaders);
reviewWriter.pipe(fs.createWriteStream(path.join(__dirname + '/generatedTables', 'reviews.csv')))


// Games Stream
var gameHeaders = { headers: ['id', 'name']}
var gameWriter = csvWriter(gameHeaders);
gameWriter.pipe(fs.createWriteStream(path.join(__dirname + '/generatedTables', 'games.csv')))


function WriteGames(writer, encoding, callback) {
  // Generate 10M games
  let i = rowsToMake + 1;
  write();
  function write() {
    let ok = true;
    do {
      if (isNaN(i)) {
        return;
      }
      i--;

      if (i % 500000 === 0) {
        console.log(`need to make ${i} more games.`);
      }

      let gameName = uniqueNamesGenerator({
        dictionaries: [adjectives, countries, animals, colors, names],
        length: 5,
        style: 'capital',
        separator: ' '
      });

      let data = [i, gameName];
      if (i === 0) {
        // Last time!
        writer.write(data, encoding, callback);
      } else {
        // See if we should continue, or wait.
        // Don't pass the callback, because we're not done yet.
        ok = writer.write(data, encoding);
      }
    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}

function writeReviews(writer, encoding, callback) {
  // For Each game, make 1-3 reviews
  let i = rowsToMake + 1;
  let id = 0;
  write();
  function write() {
    let ok = true;
    do {
      if (isNaN(i)) {
        return;
      }
      i--;

      if (i % 500000 === 0) {
        console.log(`Need to make ${i} more reviews.`);
      }

      // for each game, make 1 - 3 reviews
      let reviewsToMake = Math.floor(Math.random() * 3) + 1;

      for (let r = 0; r < reviewsToMake; r++) {
        let game_id = i;
        let author_id = Math.floor(Math.random() * 100) + 1;; // min 1 max 100
        let date = moment(faker.date.between('2020-01-01', '2020-08-20')).format('YYYY-MM-DD');
        let text = faker.lorem.words();
        let review_type = Math.round(Math.random()); // min 0 max 1;
        let hrs_at_review = Math.floor(Math.random() * 500) + 1;;
        let purchase_type = Math.round(Math.random()); // min 0 max 1;
        let lang = 'English';
        let earlyAccess = Math.round(Math.random());
        let data = [id, game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, earlyAccess];
        if (i === 1) {
          // Last time!
          writer.write(data, encoding, callback);
          id++;
        } else {
          // See if we should continue, or wait.
          // Don't pass the callback, because we're not done yet.
          ok = writer.write(data, encoding);
          id++
        }
      }

    } while (i > 0 && ok);
    if (i > 0) {
      // Had to stop early!
      // Write some more once it drains.
      writer.once('drain', write);
    }
  }
}



// Create Games and then Make Reviews
WriteGames(gameWriter,'utf8', (err, res) => {
  if(err) {
    console.log('error making games');
  } else {
    console.log('games generated');
    writeReviews(reviewWriter, 'utf8', (err, res) => {
      if (err) {
        console.log('error making reviews');
      } else {
        console.log('reviews generated')
      }
    });
  }
});














