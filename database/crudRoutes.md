# Local Endpoint: http://localhost:3004
# /api/recentReviews/:id

## GET: takes a game id and returns an array of objects. Each object has an id, date, text, name, review_type and hrs_at_review

Query:  SELECT reviews.id, reviews.date, reviews.text, authors.name, reviews.review_type, reviews.hrs_at_review
    FROM reviews
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE reviews.game_id = ${gameId}
    ORDER BY reviews.date DESC
    LIMIT 10

## POST: Add a new review

Query: INSERT INTO reviews (game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, early_access)
        VALUES (${gameId},${authorId},'${date}','${text}',${reviewType},${hrsAtReview},${purchaseType},'${lang}',${earlyAccess})

JSON: {
	"authorId": 5,
	"date": '2019-01-01',
	"text": 'New Test Review from Postman',
	"reviewType": 0,
	"hrsAtReview": 47,
	"purchaseType": 1,
	"lang": 'English',
	"earlyAccess": 0
}


## PUT: takes a review id and updates the review

Query: UPDATE reviews
SET
    game_id = ${game_id},
    author_id = ${author_id},
    date = ${date},
    text = ${text},
    review_type = ${review_type},
    hrs_at_review = ${hrs_at_review},
    purchase_type = ${purchase_type},
    lang = ${lang},
    early_access = ${early_access},
WHERE
    id = ${review_id};

JSON: {
	"id": 20001,
	"authorId": 5,
	"date": "2019-01-01",
	"text": "New Test Review from Postman",
	"reviewType": 0,
	"hrsAtReview": 47,
	"purchaseType": 1,
	"lang": "English",
	"earlyAccess": 0
}


## DELETE: deletes a review

Query:

JSON: {“id”: 20001}
