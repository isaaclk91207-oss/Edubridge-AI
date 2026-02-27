from typing import AsyncGenerator

from fastapi import FastAPI
from sqlalchemy.ext.asyncio import AsyncSession

from backend.app.core.supabase_initialize import async_engine , async_session, Base

async def get_async_session() -> AsyncGenerator[AsyncSession,None]:
    async with async_session() as session:
        yield session

async def database_initialize():
    async with async_engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)

