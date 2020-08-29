const faker = require('faker');
const fs = require('fs');
const path = require('path');
var csvWriter = require('csv-write-stream')
var headers = { headers: ['game_id', 'author_id', 'date', 'text', 'review_type', 'hrs_at_review', 'purchase_type', 'lang', 'earlyAccess'] }
var writer = csvWriter(headers);
var moment = require('moment');

writer.pipe(fs.createWriteStream(path.join(__dirname, 'reviewRecords.csv')))
// 10000000
// generate batches of records
// for (var i = 0; i < 10000000; i++) {
//   let game_id = Math.random() * (100 - 1) + 1; // min 1 max 100
//   let author_id = Math.random() * (100 - 1) + 1; // min 1 max 100
//   let date = faker.date.between('2020-01-01', '2020-08-20');
//   let text = faker.lorem.words();
//   let review_type = Math.random() * (1 - 0); // min 0 max 1;
//   let hrs_at_review = Math.random() * (500 - 1) + 1;
//   let purchase_type = Math.random() * (1 - 0); // min 0 max 1;
//   let lang = 'English'
//   let earlyAccess = Math.random() * (1 - 0);
//   writer.write([game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, earlyAccess]);
//   writer.once('drain',write);
// }

function writeTenMillionTimes(writer, encoding, callback) {
  let i = 10000000;
  write();
  function write() {
    let ok = true;
    do {
      if (isNaN(i)) {
        return;
      }
      i--;
      let game_id = Math.floor(Math.random() * 100) + 1;; // min 1 max 100
      let author_id = Math.floor(Math.random() * 100) + 1;; // min 1 max 100
      let date = moment(faker.date.between('2020-01-01', '2020-08-20')).format('YYYY-MM-DD');
      let text = faker.lorem.words();
      let review_type = Math.round(Math.random()); // min 0 max 1;
      let hrs_at_review = Math.floor(Math.random() * 500) + 1;;
      let purchase_type = Math.round(Math.random()); // min 0 max 1;
      let lang = 'English'
      let earlyAccess = Math.round(Math.random());
      let data = [game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, earlyAccess];
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

writeTenMillionTimes(writer,'utf8', (err, res) => {
  if(err) {
    console.log('error');
  } else {
    console.log('completed');
  }
})














