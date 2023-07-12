CREATE DATABASE homegate_reviews;

-- users
CREATE TABLE users(
    user_id SERIAL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

-- reviews
CREATE TABLE reviews(
    review_id SERIAL,
    user_id SERIAL,
    appartment_id INTEGER,
    review_text TEXT NOT NULL,
    date_of_review TIMESTAMP NOT NULL DEFAULT NOW(),
    star_rating INTEGER NOT NULL,
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES users (user_Id)
);