# 사용자 생성 (일반 가입)
def create_user():
    return """
        INSERT INTO users (
            username, password, email, phone_number, 
            address, detail_address, birthdate, agree_privacy, provider
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'local')
    """

# 사용자 생성 (구글 소셜)
def create_google_user():
    return """
        INSERT INTO users (username, email, provider, provider_id)
        VALUES (%s, %s, 'google', %s)
        """

# 사용자 생성 (기타 소셜)
def create_social_user():
    return """
        INSERT INTO users (
            username, email, provider, provider_id, agree_privacy, agree_marketing
        )
        VALUES (%s, %s, 'kakao', %s, 1, 0)
    """

# 이메일로 사용자 조회 (local 가입자만)
def get_user_by_email():
    return "SELECT * FROM users WHERE email = %s AND provider = 'local'"

# 소셜 정보로 사용자 조회
def get_user_by_provider(): 
    return """
        SELECT * FROM users 
        WHERE provider = %s AND provider_id = %s
    """

# 사용자 ID로 조회하는 쿼리 반환 함수
def get_user_by_id():
    return """
        SELECT id, username, email, phone_number, address, detail_address, birthdate 
        FROM users 
        WHERE id = %s
    """

# 사용자 정보 수정
def update_user():
    return """
        UPDATE users
        SET password = %s,
            phone_number = %s,
            address = %s,
            detail_address = %s,
            birthdate = %s
        WHERE id = %s
    """