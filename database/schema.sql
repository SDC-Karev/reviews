-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'Reviews'
--
-- ---
DROP DATABASE IF EXISTS reviews;

CREATE DATABASE reviews;

USE reviews;

CREATE TABLE reviews (
  id int NOT NULL AUTO_INCREMENT,
  game_id int,
  author_id int,
  date date,
  text varchar(1000),
  review_type tinyint,
  hrs_at_review decimal(10, 2),
  purchase_type tinyint,
  lang varchar(20),
  early_access tinyint,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Authors'
--
-- ---

CREATE TABLE authors (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  product_count INT,
  review_count INT,
  hrs_on_record INT,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Games'
--
-- ---

CREATE TABLE games (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Reviews_Awards'
--
-- ---

CREATE TABLE reviews_awards (
  id int NOT NULL AUTO_INCREMENT,
  review_id INT NOT NULL,
  award_id INT NOT NULL,
  author_id INT NOT NULL,
  PRIMARY KEY (id)
);

-- ---
-- Table 'Awards'
--
-- ---

CREATE TABLE awards (
  id INT AUTO_INCREMENT,
  name VARCHAR(100),
  PRIMARY KEY (id)
);

-- ---
-- Table 'Authors_Games'
--
-- ---

CREATE TABLE authors_games (
  id int NOT NULL AUTO_INCREMENT,
  author_id INT,
  game_id INT,
  hours_played DECIMAL,
  PRIMARY KEY (id)
);

-- ---
-- Foreign Keys
-- ---

ALTER TABLE reviews ADD FOREIGN KEY (game_id) REFERENCES games (id);
ALTER TABLE reviews ADD FOREIGN KEY (author_id) REFERENCES authors (id);
ALTER TABLE reviews_awards ADD FOREIGN KEY (award_id) REFERENCES awards (id);
ALTER TABLE reviews_awards ADD FOREIGN KEY (author_id) REFERENCES authors (id);
ALTER TABLE authors_games ADD FOREIGN KEY (author_id) REFERENCES authors (id);
ALTER TABLE authors_games ADD FOREIGN KEY (game_id) REFERENCES games (id);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE Reviews ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Authors ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Games ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Reviews_Awards ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Awards ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE Authors_Games ENGINE=InnoDB  CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO awards (id, name) VALUES (1, 'helpful');
-- INSERT INTO awards (id, name) VALUES
-- (2,'unhelpful');
-- INSERT INTO awards (id, name) VALUES
-- (3,'funny');
-- --

-- INSERT INTO games (id,name) VALUES
-- (1,'Halo');
-- INSERT INTO games (id,name) VALUES
-- (2,'Red Dead Redemption');
-- INSERT INTO games (id,name) VALUES
-- (3,'EverQuest');
-- INSERT INTO games (id,name) VALUES
-- (4,'EverQuest 2');
-- INSERT INTO games (id,name) VALUES
-- (5,'Fornite');
-- INSERT INTO games (id,name) VALUES
-- (6,'Call of Duty: Fridge Ops 2');
-- INSERT INTO games (id,name) VALUES
-- (7,'Farmville');
-- INSERT INTO games (id,name) VALUES
-- (8,'Jetman');
-- INSERT INTO games (id,name) VALUES
-- (9,'World of Warcraft');
-- INSERT INTO games (id,name) VALUES
-- (10,'Warcraft III');



-- --

-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (1,'Mike Shertz',8,3,25.3);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (2,'Tristan Smith',10,5,23.5);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (3,'Tyler Jones',5,2,30);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (4,'Stephanye Blakely',1,3,25.3);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (5,'Matthew McConaughey',25,13,100.1);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (6,'Turtle Boy',3, 1,12);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (7,'Rory',1,1,15);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (8,'Ultra Gamer',30,25,5000);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (9,'Vegeta',10,5,9001);
-- INSERT INTO authors (id,name,product_count,review_count,hrs_on_record) VALUES
-- (10,'Marshawn Lynch','8','3',25.3);

-- --
-- INSERT INTO reviews (id,game_id,author_id,date,text,review_type,hrs_at_review,purchase_type,lang,early_access) VALUES
-- (1,1,1,'2020-01-01 10:10:10','Loved the game, Master Chef represent',1,30,1,'English',0);
-- INSERT INTO reviews (id,game_id,author_id,date,text,review_type,hrs_at_review,purchase_type,lang,early_access) VALUES
-- (2,1,2,'2020-02-01 10:10:10','I like turtles',1,30,1,'English',0);
-- INSERT INTO reviews (id,game_id,author_id,date,text,review_type,hrs_at_review,purchase_type,lang,early_access) VALUES
-- (3,1,3,'2020-03-01 10:10:10','I hope Tesla makes a Warthog SUV',1,25,1,'English',0);
-- INSERT INTO reviews (id,game_id,author_id,date,text,review_type,hrs_at_review,purchase_type,lang,early_access) VALUES
-- (4,1,4,'2020-04-01 10:10:10','Master Chief is a bum',0,15,1,'English',0);
-- --


-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (1,1,1,1);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (2,1,1,2);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (3,1,1,3);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (4,1,1,4);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (5,1,2,5);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (6,2,3,6);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (7,2,3,7);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (8,2,3,8);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (9,3,1,6);
-- INSERT INTO reviews_awards (id,review_id,award_id,author_id) VALUES
-- (10,3,1,7);


-- --

-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (1,1,1,10);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (2,1,2,5);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (3,1,3,11.5);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (4,2,4,7);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (5,2,5,100.5);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (6,2,6,83.5);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (7,3,7,7);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (9,3,8,26);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (10,3,9,26);
-- INSERT INTO authors_games (id,author_id,game_id,hours_played) VALUES
-- (11,4,10,26);
