DROP TABLE IF EXISTS reviews_awards;
DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS awards;
DROP TABLE IF EXISTS authors_games;
DROP TABLE IF EXISTS authors;
DROP TABLE IF EXISTS reviews;





CREATE TABLE IF NOT EXISTS reviews (
    id            	SERIAL PRIMARY KEY,
    game_id         integer,
    author_id       integer,
    date            date,
    text			varchar(25),
    review_type		integer,
    hrs_at_review	integer,
    purchase_type	integer,
    lang			varchar(20),
    early_access	integer
);

CREATE TABLE IF NOT EXISTS authors (
    id             SERIAL PRIMARY KEY,
    name           varchar(100),
    product_count  integer,
    review_count   integer,
    hrs_on_record  integer
);

CREATE TABLE IF NOT EXISTS authors_games (
    id            SERIAL PRIMARY KEY,
    author_id     integer,
    game_id       integer,
    hours_played  integer
);

CREATE TABLE IF NOT EXISTS awards (
    id            SERIAL PRIMARY KEY,
    name          varchar(100)
);

CREATE TABLE IF NOT EXISTS games (
    id            SERIAL PRIMARY KEY,
    name          varchar(100)
);

CREATE TABLE reviews_awards (
    id            SERIAL PRIMARY KEY,
    review_id     integer,
    award_id      integer,
    author_id     integer
);
