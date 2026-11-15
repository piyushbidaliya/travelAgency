from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

CORS_ALLOW_ALL_ORIGINS = True

# Fallback to SQLite if MySQL is not available or USE_SQLITE is True
try:
    import pymysql
    # Test connection attempt or fallback
except Exception:
    pass
