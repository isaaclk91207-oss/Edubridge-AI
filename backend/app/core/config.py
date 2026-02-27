import secrets
import os
from pydantic_settings import BaseSettings
from dotenv import load_dotenv

load_dotenv()

def _to_async_db_url(url: str | None) -> str | None:
    if not url:
        return url
    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)
    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)
    return url

class Settings(BaseSettings):
    SECRET_KEY: str = os.getenv("SECRET_KEY", secrets.token_urlsafe(32))
    DATABASE_URL: str = os.environ.get("DATABASE_URL")
    SQLALCHEMY_DATABASE_URI: str = _to_async_db_url(
        os.environ.get("SQLALCHEMY_DATABASE_URI") or os.environ.get("DATABASE_URL")
    )
    ACCESS_TOKEN_EXPIRE_MINUTES: int = int(os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 60))
    REFRESH_TOKEN_EXPIRE_DAYS: int = int(os.getenv("REFRESH_TOKEN_EXPIRE_DAYS", 30))
    ALGORITHM: str = os.getenv("ALGORITHM", "HS256")
    COOKIE_SECURE: bool = os.getenv("COOKIE_SECURE", "false").lower() == "true"

settings = Settings()
