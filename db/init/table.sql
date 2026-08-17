CREATE TABLE destination (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    subtitle TEXT,
    photo_url TEXT,
    transport TEXT NOT NULL,
    body_description TEXT NOT NULL
);

CREATE TABLE date_option (
    id SERIAL PRIMARY KEY,
    destination_id INTEGER NOT NULL REFERENCES destination(id),
    date_range TEXT NOT NULL,
    budget INTEGER NOT NULL
);

CREATE TABLE hashtag (
    id SERIAL PRIMARY KEY,  
    name TEXT NOT NULL
);

CREATE TABLE destination_hashtag (
    destination_id INTEGER NOT NULL REFERENCES destination(id),
    hashtag_id INTEGER NOT NULL REFERENCES hashtag(id),
    PRIMARY KEY (destination_id, hashtag_id)
);
