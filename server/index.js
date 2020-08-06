const express = require('express');
const  bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 3004;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(bodyParser.json());
// UNCOMMENT FOR REACT
//app.use(express.static(__dirname + '/../react-client/dist'));


app.get('/api/recentReviews', (req, res) => {
  db.getRecentReviews(1)
    .then((reviews) => {
      res.send(reviews);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
})

app.get('/api/helpfulReviews', (req, res) => {
  db.getHelpfulReviews(2)
    .then((reviews) => {
      res.send(reviews);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
})

app.get('/api/awards', (req, res) => {
  db.getAwards(1)
    .then((awards) => {
      res.send(awards);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    });
  });


// app.get('/api/allReviews', (req, res) => {
//   db.getAllReviews(1)
//     .then((reviews) => {
//         reviews.forEach((review) => {
//           review.awards = {};
//           db.getAwards(review.id)
//           .then((awards) => {
//             return awards.forEach((award) => {
//                 review.awards[award.name] = award[`count(*)`];
//               })
//           })
//         })
//         console.log(reviews);
//         return reviews;
//     })
//     .then((reviews) => {
//       res.send(reviews);
//       res.end();
//     })
//     .catch((err) => {
//       res.send(err);
//       res.end();
//     });
//   });

