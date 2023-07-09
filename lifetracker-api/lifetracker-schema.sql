CREATE TABLE users(
    id SERIAL PRIMARY KEY, 
    username TEXT NOT NULL, 
    password TEXT NOT NULL, 
    first_name TEXT NOT NULL, 
    last_name TEXT NOT NULL, 
    email TEXT NOT NULL UNIQUE CHECK (POSITION('@' IN email)>1), 
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
CREATE TABLE nutrition(
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    category TEXT NOT NULL, 
    calories TEXT NOT NULL, 
    image_url TEXT NOT NULL, 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, 
    quantity TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    timestamp TIMESTAMP DEFAULT NOW()
);
CREATE TABLE exercise(
    id SERIAL PRIMARY KEY, 
    name TEXT NOT NULL, 
    category TEXT NOT NULL, 
    duration TEXT NOT NULL, 
    intensity TEXT NOT NULL, 
    image_url TEXT NOT NULL,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT NOW()
);


CREATE TABLE sleep(
    id SERIAL PRIMARY KEY, 
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL, 
    dateof TEXT NOT NULL, 
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);
