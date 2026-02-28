import asyncio
from fastapi import APIRouter
from fastapi.responses import StreamingResponse
import re
import json

from backend.app.Schemas.schemas import ChatRequest, VideoResponse
from backend.app.database.storage import (
    gemini_client,
    sf_client,
    groq_client,
    get_youtube_videos,
    save_chat_to_db,
    get_chat_history,
    save_portfolio,
)

router = APIRouter(prefix="/chat", tags=["AI Agents"])

#  SAFE GEMINI TEXT EXTRACTION

def extract_gemini_text(response) -> str:
    try:
        if hasattr(response, "text") and response.text:
            return response.text.strip()

        if hasattr(response, "candidates") and response.candidates:
            parts = response.candidates[0].content.parts
            return "".join(
                [p.text for p in parts if hasattr(p, "text")]
            ).strip()

        return ""

    except Exception:
        return ""


# CO-FOUNDER (Gemini)

@router.post("/cofounder")
async def cofounder_chat(request: ChatRequest):

    async def generate():
        full_response = ""

        asyncio.create_task(
            asyncio.to_thread(
                save_chat_to_db,
                request.user_id,
                "user",
                request.message,
                "cofounder",
            )
        )

        CoFounder_system_prompt = (
            "You are an expert strategic co-founder. "
            "If the user greets without a specific idea, respond warmly. "
            "If they provide a goal, give a clear step-by-step roadmap."
        )

        msg = request.message.lower().strip()
        is_greeting = msg in ["hi", "hello", "hey"]
        words_count = len(msg.split())

        video_task = None
        if not is_greeting and words_count > 2:
            video_task = asyncio.create_task(
                asyncio.to_thread(
                    get_youtube_videos,
                    f"{request.message} business roadmap latest",
                )
            )

        try:
            if gemini_client is None:
                yield "Gemini service not configured."
                return

            response = await asyncio.to_thread(
                gemini_client.models.generate_content,
                model="gemini-3-flash-preview",
                contents=[
                    {"role": "user", "parts": [{"text": CoFounder_system_prompt}]},
                    {"role": "user", "parts": [{"text": request.message}]},
                ],
                config={
                    "temperature": 0.7,
                    "max_output_tokens": 800,
                },
            )

            full_response = extract_gemini_text(response)
            yield full_response

        except Exception as e:
            print(f"Gemini Error: {e}")
            yield "AI service is temporarily unavailable."
            return

        if video_task:
            try:
                videos = await video_task

                has_roadmap = any(
                    x in full_response.lower()
                    for x in ["roadmap", "step", "strategy", "launch"]
                )

                if videos and has_roadmap:
                    video_text = "\n\n### Recommended Tutorials:\n"
                    for v in videos[:3]:
                        video_text += f"- [{v['title']}]({v['link']})\n"

                    yield video_text
                    full_response += video_text

            except Exception as e:
                print(f"YouTube Error: {e}")

        asyncio.create_task(
            asyncio.to_thread(
                save_chat_to_db,
                request.user_id,
                "assistant",
                full_response,
                "Co-founder (Gemini Flash)",
            )
        )

    return StreamingResponse(generate(), media_type="text/plain")


# MENTOR (Groq)

@router.post("/mentor")
async def mentor_chat(request: ChatRequest):

    async def generate():
        full_response = ""

        mentor_system_prompt = (
            "You are a wise and supportive Interview Mentor. "
            "Help the user practice for job interviews. "
            "Ask about their background, skills, and target job. "
            "Give structured feedback. "
            "Keep responses clear, practical, and concise."
        )

        asyncio.create_task(
            asyncio.to_thread(
                save_chat_to_db,
                request.user_id,
                "user",
                request.message,
                "mentor",
            )
        )

        if groq_client is None:
            yield "Mentor service not configured."
            return

        try:
            stream = await groq_client.chat.completions.create(
                model="llama-3.1-8b-instant",
                messages=[
                    {"role": "system", "content": mentor_system_prompt},
                    {"role": "user", "content": request.message},
                ],
                temperature=0.4,
                max_tokens=500,
                stream=True,
            )

            async for chunk in stream:
                if chunk.choices and chunk.choices[0].delta.content:
                    content = chunk.choices[0].delta.content
                    full_response += content
                    yield content

        except Exception as e:
            print(f"Groq Mentor Error: {e}")
            yield "Mentor AI unavailable."
            return

        asyncio.create_task(
            asyncio.to_thread(
                save_chat_to_db,
                request.user_id,
                "assistant",
                full_response,
                "mentor (Groq 8B Instant)",
            )
        )

    return StreamingResponse(generate(), media_type="text/plain")


# SUPPORT (Groq)

@router.post("/support")
async def support_chat(request: ChatRequest):

    support_system_prompt = (
        "You are a helpful and professional Customer Support Assistant. "
        "Provide clear, concise, and accurate information."
    )

    asyncio.create_task(
        asyncio.to_thread(
            save_chat_to_db,
            request.user_id,
            "user",
            request.message,
            "support",
        )
    )

    try:
        if groq_client is None:
            return {"reply": "Support service unavailable."}

        response = await groq_client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": support_system_prompt},
                {"role": "user", "content": request.message},
            ],
            temperature=0.3,
            max_tokens=400,
        )

        reply = response.choices[0].message.content

        asyncio.create_task(
            asyncio.to_thread(
                save_chat_to_db,
                request.user_id,
                "assistant",
                reply,
                "support (Groq 8B)",
            )
        )

        return {"reply": reply}

    except Exception as e:
        print(f"Support Error: {e}")
        return {"error": str(e)}


# ROADMAP (Gemini)

@router.post("/roadmap")
async def generate_roadmap(request: ChatRequest):

    roadmap_system_prompt = (
        "You are an expert career and business roadmap generator. "
        "Create a detailed, step-by-step roadmap for the user's goal. "
        "Include: 1. A clear title, 2. Brief overview, 3. 3-4 phases with titles and descriptions, "
        "4. Duration for each phase, 5. Key tasks, 6. Helpful tips. "
        "Be specific, actionable, and encouraging. Use current best practices for current year."
    )

    asyncio.create_task(
        asyncio.to_thread(
            save_chat_to_db,
            request.user_id,
            "user",
            request.message,
            "roadmap",
        )
    )

    roadmap_content = None

    try:
        if gemini_client:

            response = await asyncio.to_thread(
                gemini_client.models.generate_content,
                model="gemini-3-flash-preview",
                contents=[
                    {"role": "user", "parts": [{"text": roadmap_system_prompt}]},
                    {"role": "user", "parts": [{"text": request.message}]},
                ],
                config={
                    "temperature": 0.6,
                    "max_output_tokens": 800,
                },
            )

            roadmap_content = extract_gemini_text(response)

    except Exception as e:
        print(f"Roadmap Error: {e}")

    if not roadmap_content:
        return {"error": "AI service unavailable", "roadmap": "", "videos": []}

    videos = []
    try:
        videos = await asyncio.to_thread(
            get_youtube_videos,
            f"{request.message} roadmap tutorial latest",
        )
        videos = videos[:3]
    except Exception:
        pass

    asyncio.create_task(
        asyncio.to_thread(
            save_chat_to_db,
            request.user_id,
            "assistant",
            roadmap_content,
            "roadmap (Gemini Flash)",
        )
    )

    return {"roadmap": roadmap_content, "videos": videos}


# PORTFOLIO ANALYSIS (Gemini)
@router.post("/portfolio-analysis")
async def analyze_portfolio(request: ChatRequest):
    """Portfolio Analysis: Fetch chat history, analyze with AI, and save to student_portfolios"""
    
    # 1. Fetch all messages from chat_history for this user
    chat_logs = await asyncio.to_thread(get_chat_history, request.user_id, limit=50)
    
    if not chat_logs:
        return {
            "error": "No chat history found",
            "message": "Start chatting with AI agents to build your portfolio analysis."
        }
    
    # Format chat logs for AI analysis
    formatted_logs = "\n".join([
        f"[{log.get('agent_type', 'unknown')}] {log.get('role', 'user')}: {log.get('message', '')}"
        for log in chat_logs
    ])
    
    # 2. AI Analysis prompt
    portfolio_system_prompt = (
        "You are a career analyst AI. Based on the user's learning logs, analyze their career trajectory. "
        "Provide a JSON response with:\n"
        "1. career_role: The most suitable career role for this student (e.g., Full Stack Developer, Data Scientist, Product Manager)\n"
        "2. skills: A comma-separated list of their top 5 skills (e.g., Python, React, Machine Learning, Communication, Leadership)\n"
        "3. summary: A 3-line professional summary for a CV (line1: expertise, line2: achievements, line3: career goal)\n\n"
        f"Learning Logs:\n{formatted_logs}\n\n"
        "Respond ONLY in JSON format like: "
        "{\"career_role\": \"...\", \"skills\": \"..., ..., ...\", \"summary\": \"... ... ...\"}"
    )
    
    analysis_result = None
    used_model = "Gemini (gemini-3-flash-preview)"
    
    # 3. Send to Gemini
    try:
        if gemini_client is None:
            return {
                "error": "AI service not configured",
                "message": "Gemini client is not initialized."
            }

        response = await asyncio.to_thread(
            gemini_client.models.generate_content,
            model="gemini-3-flash-preview",
            contents=[
                {"role": "user", "parts": [{"text": portfolio_system_prompt}]},
                {"role": "user", "parts": [{"text": "Analyze my learning logs and provide career insights."}]}
            ],
            config={
                "temperature": 0.4,              
                "max_output_tokens": 500         
            }
        )

        # safer extraction (minimal change)
        if hasattr(response, "text") and response.text:
            analysis_result = response.text
        else:
            print("Empty Gemini response:", response)

    except Exception as e:
        print(f"Gemini Portfolio Analysis Error: {e}")
    
    if not analysis_result:
        return {
            "error": "AI analysis failed",
            "message": "Gemini is currently unavailable. Please try again later."
        }
    
    
    try:
        json_match = re.search(r'\{[\s\S]*\}', analysis_result)
        if json_match:
            portfolio_data = json.loads(json_match.group())
        else:
            portfolio_data = {
                "career_role": "Professional Learner",
                "skills": "Learning, Communication, Problem Solving, Adaptability, Growth",
                "summary": analysis_result[:200]
            }
    except Exception as parse_error:
        print(f"JSON Parse Error: {parse_error}")
        portfolio_data = {
            "career_role": "Professional Learner",
            "skills": "Learning, Communication, Problem Solving",
            "summary": analysis_result[:200] if analysis_result else "Unable to generate summary."
        }
    
    career_role = portfolio_data.get("career_role", "Professional Learner")
    skills = portfolio_data.get("skills", "Learning, Communication")
    summary = portfolio_data.get("summary", "Unable to generate summary.")
    
    # 5. Save to student_portfolios table
    save_success = await asyncio.to_thread(
        save_portfolio,
        request.user_id,
        career_role,
        skills,
        summary
    )
    
    if save_success:
        return {
            "success": True,
            "career_role": career_role,
            "skills": skills,
            "summary": summary,
            "message": "Portfolio analysis saved to Employee Dashboard!"
        }
    else:
        return {
            "success": True,
            "career_role": career_role,
            "skills": skills,
            "summary": summary,
            "message": "Analysis complete but could not save to database."
        }
