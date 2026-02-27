from fastapi import APIRouter, Depends, Request

from backend.app.Schemas.schemas import ForgotPasswordRequest, UserLogin, UserRegister
from backend.app.core.db_utility import get_async_session
from backend.app.services.authentication_service import (
    forgot_password,
    login_user as login_user_service,
    logout_user as logout_user_service,
    register_user as register_user_service,
)

router = APIRouter(prefix="/authentication", tags=["authentication"])


@router.post("/register")
async def register(user: UserRegister, session=Depends(get_async_session)):
    return await register_user_service(user, session)


@router.post("/login")
async def login(user: UserLogin, session = Depends(get_async_session)):
    return await login_user_service(user, session)


@router.post("/forgot-password")
async def reset_password(payload: ForgotPasswordRequest, session=Depends(get_async_session)):
    return await forgot_password(payload.email, session, payload.new_password)


@router.post("/logout")
async def logout(request: Request):
    return await logout_user_service(request)
