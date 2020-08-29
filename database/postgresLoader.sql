-- Loads the generated csv files into postgres. Update beginning path in FROM statements to current working directory

DELETE FROM reviews;

COPY reviews(game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, early_access)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/reviewRecords.csv'
DELIMITER ','
CSV HEADER;


DELETE FROM authors;

COPY authors(id, name, product_count, review_count, hrs_on_record)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/authors.csv'
DELIMITER E'\t'
CSV HEADER;

DELETE FROM authors_games;

COPY authors_games(id, author_id, game_id, hours_played)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/authors_games.csv'
DELIMITER E'\t'
CSV HEADER;

DELETE FROM awards;

COPY awards(id, name)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/awards.csv'
DELIMITER E'\t'
CSV HEADER;

DELETE FROM games;

COPY games(id, name)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/games.csv'
DELIMITER E'\t'
CSV HEADER;

DELETE FROM reviews_awards;

COPY reviews_awards(id, review_id, award_id, author_id)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/reviews_awards.csv'
DELIMITER E'\t'
CSV HEADER;














