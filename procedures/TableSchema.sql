-- Create the `movie` table
CREATE TABLE movie (
    id VARCHAR(255) NOT NULL PRIMARY KEY,  -- Set `id` as NOT NULL and PRIMARY KEY
    title TEXT,
    release_date DATE,
    revenue BIGINT,
    runtime INT,
    backdrop_path VARCHAR(255),
    budget BIGINT,
    original_language VARCHAR(2),
    overview TEXT,
    tagline TEXT,
    poster_path VARCHAR(255),
    genres TEXT,
    production_companies TEXT,
    production_countries TEXT,
    keywords TEXT
);

-- Alter the `keywords` column to support utf8mb4
ALTER TABLE movie
MODIFY COLUMN keywords TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Alter the `tagline` column to support utf8mb4
ALTER TABLE movie
MODIFY COLUMN tagline TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Alter the `production_companies` column to support utf8mb4
ALTER TABLE movie
MODIFY COLUMN production_companies TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Alter the `production_countries` column to support utf8mb4
ALTER TABLE movie
MODIFY COLUMN production_countries TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Alter the `overview` column to support utf8mb4
ALTER TABLE movie
MODIFY COLUMN overview TEXT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Create the `user` table
CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique ID for each user
    name VARCHAR(255) NOT NULL,                -- User's full name
    username VARCHAR(255) NOT NULL UNIQUE,     -- Unique username for each user
    password VARCHAR(255) NOT NULL,            -- User's password (hashed, ideally)
    dob DATE NOT NULL,                         -- User's date of birth
    gender ENUM('Male', 'Female', 'Other') NOT NULL,  -- User's gender
    profile_picture VARCHAR(255),              -- Optional URL for the profile picture
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP  -- Timestamp when the user was created
);

-- Create the `review` table with matching data types for foreign keys
CREATE TABLE review (
    id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique ID for each review
    user_id INT NOT NULL,                      -- ID of the user who wrote the review (foreign key)
    movie_id VARCHAR(255) NOT NULL,             -- ID of the movie being reviewed (foreign key, should match movie.id data type)
    rating DECIMAL(2, 1) NOT NULL,             -- Rating given by the user (e.g., 4.5)
    review_text TEXT,                          -- Text content of the review
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the review was created
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,  -- Foreign key to user table
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE  -- Foreign key to movie table
);

DROP TABLE IF EXISTS favourite;
CREATE TABLE favourite (
    favourite_id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique ID for each review
    user_id INT NOT NULL,                      -- ID of the user who wrote the review (foreign key)
    movie_id VARCHAR(255) NOT NULL,             -- ID of the movie being reviewed (foreign key, should match movie.id data type)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the review was created
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,  -- Foreign key to user table
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE  -- Foreign key to movie table
);
DROP TABLE IF EXISTS watchlist;
CREATE TABLE watchlist (
    watchlist_id INT AUTO_INCREMENT PRIMARY KEY,         -- Unique ID for each review
    user_id INT NOT NULL,                      -- ID of the user who wrote the review (foreign key)
    movie_id VARCHAR(255) NOT NULL,             -- ID of the movie being reviewed (foreign key, should match movie.id data type)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- Timestamp when the review was created
    FOREIGN KEY (user_id) REFERENCES user(id) ON DELETE CASCADE,  -- Foreign key to user table
    FOREIGN KEY (movie_id) REFERENCES movie(id) ON DELETE CASCADE  -- Foreign key to movie table
);

