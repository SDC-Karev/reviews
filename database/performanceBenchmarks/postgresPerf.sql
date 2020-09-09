
explain analyze
SELECT reviews.id, reviews.date, reviews.text, authors.name, reviews.review_type, reviews.hrs_at_review
    FROM reviews
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE reviews.game_id = 100000
    ORDER BY reviews.date DESC
    LIMIT 10;


explain analyze
SELECT review_id, count(*), awards.name award_name, reviews.date, reviews.text, authors.name author_name, reviews.review_type, authors.product_count, authors.review_count, authors.hrs_on_record, reviews.hrs_at_review
    FROM reviews_awards
    INNER JOIN reviews ON reviews_awards.review_id = reviews.id
    INNER JOIN authors ON reviews.author_id = authors.id
    INNER JOIN awards ON reviews_awards.award_id = awards.id
    WHERE award_id = 1
    AND reviews.game_id = 9995670 AND reviews.date >= '2020-01-01'
    GROUP BY 1, 3, 4, 5, 6, 7, 8, 9, 10,11
    ORDER BY 2 DESC
    LIMIT 10;


explain analyze
SELECT reviews.id, reviews.date, reviews.text, authors.name, reviews.review_type, authors.product_count, authors.review_count, authors.hrs_on_record, reviews.hrs_at_review
    FROM reviews
    INNER JOIN authors ON reviews.author_id = authors.id
    WHERE reviews.game_id = 1000000;


explain analyze
SELECT count(*)
      FROM reviews
      WHERE game_id = 1000000;


explain analyze
SELECT review_type, count(*)
      FROM reviews
      WHERE game_id = 1000000
      GROUP BY review_type;


explain analyze
SELECT reviews_awards.award_id,count(*), awards.name
    FROM reviews_awards
    INNER JOIN awards ON reviews_awards.award_id = awards.id
    WHERE review_id = 1000000
    GROUP BY 1, 3
    ORDER BY reviews_awards.award_id;





