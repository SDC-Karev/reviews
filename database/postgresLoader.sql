-- Loads the generated csv files into postgres. Update beginning path in FROM statements to current working directory

COPY reviews_awards(id, review_id, award_id, author_id)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/reviews_awards.tsv'
DELIMITER E'\t'
CSV HEADER;

COPY games(id, name)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/games.csv'
DELIMITER ','
CSV HEADER;

COPY awards(id, name)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/awards.tsv'
DELIMITER E'\t'
CSV HEADER;

COPY authors_games(id, author_id, game_id, hours_played)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/authors_games.tsv'
DELIMITER E'\t'
CSV HEADER;

COPY authors(id, name, product_count, review_count, hrs_on_record)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/authors.tsv'
DELIMITER E'\t'
CSV HEADER;

COPY reviews(id, game_id, author_id, date, text, review_type, hrs_at_review, purchase_type, lang, early_access)
FROM '/Users/steventrager/HackReactor/SDC/reviews/database/generatedTables/reviews.csv'
DELIMITER ','
CSV HEADER;



















