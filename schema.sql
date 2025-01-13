-- users Table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- teams Table
CREATE TABLE teams (
    team_id SERIAL PRIMARY KEY,
    team_name VARCHAR(255) NOT NULL,
    group_type VARCHAR(50) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- team_members Table
CREATE TABLE team_members (
    team_member_id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    user_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- habits Table
CREATE TABLE habits (
    habit_id SERIAL PRIMARY KEY,
    habit_name VARCHAR(255) NOT NULL,
    description TEXT,
    goal INT NOT NULL,
    point_value INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- team_habits Table
CREATE TABLE team_habits (
    team_habit_id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    habit_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE,
    FOREIGN KEY (habit_id) REFERENCES habits(habit_id) ON DELETE CASCADE
);

-- habits_log Table
CREATE TABLE habits_log (
    log_id SERIAL PRIMARY KEY,
    team_habit_id INT NOT NULL,
    user_id INT NOT NULL,
    log_date DATE NOT NULL,
    status VARCHAR(50) NOT NULL,
    comment TEXT,
    rating VARCHAR(50),
    points_earned INT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_habit_id) REFERENCES team_habits(team_habit_id) ON DELETE CASCADE,
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- leaderboard Table
CREATE TABLE leaderboard (
    leaderboard_id SERIAL PRIMARY KEY,
    team_id INT NOT NULL,
    total_points INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (team_id) REFERENCES teams(team_id) ON DELETE CASCADE
);
