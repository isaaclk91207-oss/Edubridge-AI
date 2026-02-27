import sys
from pathlib import Path

import uvicorn

# Allow `uv run main.py` from inside `backend/` by exposing repo root.
ROOT_DIR = Path(__file__).resolve().parent.parent
if str(ROOT_DIR) not in sys.path:
    sys.path.insert(0, str(ROOT_DIR))

if __name__ == "__main__":
    uvicorn.run("backend.app.app:app", host="0.0.0.0", port=8000, reload=True)
