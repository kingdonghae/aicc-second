CREATE DATABASE IF NOT EXISTS zippt COLLATE utf8mb4_general_ci;
USE zippt;

DROP TABLE users;
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    userid VARCHAR(50) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    address VARCHAR(255),
    birthdate DATE,
    agree_privacy TINYINT(1) DEFAULT 0, -- 추가: 개인정보 동의 (0: 미동의, 1: 동의)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

SELECT * FROM users;
