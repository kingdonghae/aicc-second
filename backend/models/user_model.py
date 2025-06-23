
def create_user():
    return """
        INSERT INTO users (
            username, password, email, phone_number, 
            address, detail_address, birthdate, agree_privacy, provider
        )
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, 'local')
    """

def create_google_user():
    return """
        INSERT INTO users (username, email, provider, provider_id, agree_privacy)
        VALUES (%s, %s, 'google', %s, %s)
    """

def create_social_user():
    return """
        INSERT INTO users (
            username, email, provider, provider_id, agree_privacy, agree_marketing
        )
        VALUES (%s, %s, 'kakao', %s, 1, 0)
    """

def get_user_by_email():
    return "SELECT * FROM users WHERE email = %s AND provider = 'local'"

def get_user_by_provider(): 
    return """
        SELECT * FROM users 
        WHERE provider = %s AND provider_id = %s
    """

def get_user_by_id():
    return """
        SELECT id, username, email, phone_number, address, detail_address, birthdate 
        FROM users 
        WHERE id = %s
    """

def update_user():
    return """
        UPDATE users
        SET password = %s,
            phone_number = %s,
            address = %s,
            detail_address = %s
        WHERE id = %s
    """

def update_add_info_user():
    return """
        UPDATE users
        SET phone_number = %s,
            address = %s,
            detail_address = %s,
            birthdate = %s,
            agree_privacy = %s
        WHERE id = %s
    """