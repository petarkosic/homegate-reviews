CREATE DATABASE homegate_reviews;

CREATE TABLE users(
    user_id SERIAL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    registered_at TIMESTAMP NOT NULL DEFAULT NOW(),
    PRIMARY KEY (user_id)
);

CREATE TABLE apartments(
    apartment_id BIGSERIAL,
    cost_of_rent DECIMAL,
    number_of_rooms INTEGER,
    living_space_sqm DECIMAL,
    address VARCHAR(255),
    availability VARCHAR(20),
    description TEXT,
    features_and_furnishings TEXT[],
    PRIMARY KEY (apartment_id)
);

CREATE TABLE reviews(
    review_id SERIAL,
    user_id SERIAL, 
    apartment_id BIGSERIAL,
    review_text TEXT NOT NULL,
    date_of_review TIMESTAMP NOT NULL DEFAULT NOW(),
    star_rating INTEGER NOT NULL CHECK (star_rating BETWEEN 1 AND 5),
    PRIMARY KEY (review_id),
    FOREIGN KEY (user_id) REFERENCES users (user_id),
    FOREIGN KEY (apartment_id) REFERENCES apartments (apartment_id)
);
