# Fireflies.ai Clone

A functional clone of the Fireflies.ai meeting-assistant web application.

## Tech Stack
- **Frontend**: Next.js (React), TypeScript, vanilla CSS
- **Backend**: Python with FastAPI
- **Database**: SQLite with SQLAlchemy (ORM)
- **Icons**: Lucide React

## Architecture Overview
The application follows a standard client-server architecture:
1. **Frontend (Next.js)**: A single-page-like application handling the user interface. It communicates with the backend via REST APIs. CSS variables are used extensively for theming (including a working Dark Mode toggle).
2. **Backend (FastAPI)**: A lightweight Python backend providing RESTful endpoints for CRUD operations on meetings, transcripts, and summaries.
3. **Database (SQLite)**: A local file-based database (`fireflies.db`) storing the relational data.

## Database Schema
The SQLite database consists of three main tables:
- **`meetings`**: Stores meeting metadata (title, date, duration, participants).
- **`transcript_lines`**: Stores individual transcript utterances linked to a meeting (speaker, start time, end time, text).
- **`meeting_summaries`**: Stores AI-generated notes, action items, and key topics for a meeting.

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python (3.10+)

### 1. Backend Setup
1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create and activate a virtual environment:
   ```bash
   python3 -m venv venv
   source venv/bin/activate
   ```
3. Install dependencies:
   ```bash
   pip install fastapi uvicorn sqlalchemy pydantic python-multipart
   ```
4. Seed the database (this will create `fireflies.db` with sample data):
   ```bash
   export PYTHONPATH=.
   python3 -m backend.seed
   ```
5. Start the FastAPI server:
   ```bash
   uvicorn backend.main:app --reload --port 8000
   ```

### 2. Frontend Setup
1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Next.js development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:3000`.

## Assumptions & Mocks
- **Media Player**: Real audio transcription and media playback are out of scope. The media player is mocked and uses a timer to simulate playback, driving the active transcript highlights. Clicking on a transcript line seeks the mock player to that timestamp.
- **AI Summary**: Summaries are pre-seeded in the database rather than generated via a live LLM call.
- **User Authentication**: Assumed a default logged-in user experience without implementing a real auth system.

