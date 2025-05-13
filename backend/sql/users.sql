CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE,
    password VARCHAR(255),  -- local 가입자만 사용 (소셜 가입자는 NULL)
    provider VARCHAR(50) NOT NULL DEFAULT 'local',  -- 'local', 'kakao', 'google' 등
    provider_id VARCHAR(255),  -- 소셜 서비스의 유저 고유 ID (local 가입자는 NULL)
    phone_number VARCHAR(20),
    address VARCHAR(255),
    detail_address VARCHAR(255),
    birthdate DATE,
    agree_privacy BOOLEAN DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY unique_provider (provider, provider_id)
);
