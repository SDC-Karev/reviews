const express = require('express');
const bodyParser = require('body-parser');
const db = require('../database');

const app = express();
const port = 3004;

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});

app.use(bodyParser.json());
// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../client/dist'));


app.get('/api/recentReviews/:id', (req, res) => {
  let gameId = req.params.id;
  db.getRecentReviews(gameId)
    .then((reviews) => {
      res.send(reviews);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
});

app.get('/api/helpfulReviews/:id', (req, res) => {
  let gameId = req.params.id;
  db.getHelpfulReviews(gameId)
    .then((reviews) => {
      res.send(reviews);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
});

app.get('/api/reviewCount/:id', (req, res) => {
  let gameId = req.params.id;
  db.getReviewCount(gameId)
    .then((count) => {
      res.send(count);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
});

app.get('/api/recentReviewCount/:id', (req, res) => {
  let gameId = req.params.id;
  db.getRecentReviewCount(gameId)
    .then((count) => {
      res.send(count);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
});

app.get('/api/reviewSentiment/:id', (req, res) => {
  let gameId = req.params.id;
  db.getReviewSentiment(gameId)
    .then((sentiment) => {
      res.send(sentiment);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
});

app.get('/api/recentReviewSentiment/:id', (req, res) => {
  let gameId = req.params.id;
  db.getRecentReviewSentiment(gameId)
    .then((sentiment) => {
      res.send(sentiment);
      res.end();
    })
    .catch((err) => {
      res.send(err);
      res.end();
    })
});

app.post('/api/awards', (req, res) => {
  let reviewId = req.body.id;
  db.getAwards(reviewId)
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

