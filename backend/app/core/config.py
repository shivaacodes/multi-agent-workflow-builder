# JWT Settings

# SQLAlchemy → your existing ORM models (User).

# Passlib → for hashing passwords.

# PyJWT → for issuing/validating tokens.

# Dependencies → get_current_user to protect routes.

import os

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretpassword")

ALGORITHM = "HS256"

ACCESS_TOKEN_EXPIRE_MINUTES=60 # 1hr