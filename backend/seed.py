import datetime
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from . import models

def seed_db():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    if db.query(models.Meeting).first():
        print("Database already seeded.")
        db.close()
        return

    meeting1 = models.Meeting(
        title="Weekly Sync",
        date=datetime.datetime.utcnow() - datetime.timedelta(days=2),
        duration=1800,
        participants="Alice, Bob, Charlie"
    )
    db.add(meeting1)
    db.commit()
    db.refresh(meeting1)

    t1 = [
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Alice", start_time=0.0, end_time=5.0, text="Hi everyone, let's get started with the weekly sync."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Bob", start_time=6.0, end_time=15.0, text="Sure, I can start. I worked on the frontend dashboard last week. It's almost done, just need to finalize the CSS."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Charlie", start_time=16.0, end_time=22.0, text="Great. I have been working on the backend APIs. The CRUD operations for meetings are complete.")
    ]
    db.bulk_save_objects(t1)

    s1 = models.MeetingSummary(
        meeting_id=meeting1.id,
        summary_text="The team discussed the progress of the weekly tasks. Bob is finishing the frontend dashboard while Charlie completed the backend APIs.",
        action_items='["Bob to finalize CSS for dashboard", "Charlie to review backend API PRs"]',
        key_topics='["Frontend Dashboard", "Backend APIs"]'
    )
    db.add(s1)
    db.commit()

    meeting2 = models.Meeting(
        title="Design Review",
        date=datetime.datetime.utcnow() - datetime.timedelta(days=1),
        duration=3600,
        participants="Alice, Dave"
    )
    db.add(meeting2)
    db.commit()
    db.refresh(meeting2)

    t2 = [
        models.TranscriptLine(meeting_id=meeting2.id, speaker="Alice", start_time=0.0, end_time=8.0, text="Hey Dave, did you get a chance to look at the new mockups for the meeting details page?"),
        models.TranscriptLine(meeting_id=meeting2.id, speaker="Dave", start_time=9.0, end_time=20.0, text="Yes, I did. I think the transcript view is much cleaner now. However, I think we should add a dark mode toggle."),
        models.TranscriptLine(meeting_id=meeting2.id, speaker="Alice", start_time=21.0, end_time=30.0, text="That's a good idea. I'll add a dark mode toggle to the top navigation bar.")
    ]
    db.bulk_save_objects(t2)

    s2 = models.MeetingSummary(
        meeting_id=meeting2.id,
        summary_text="Alice and Dave reviewed the new mockups. Dave suggested adding a dark mode toggle, which Alice agreed to implement.",
        action_items='["Alice to add dark mode toggle to navbar"]',
        key_topics='["Mockup Review", "Dark Mode"]'
    )
    db.add(s2)
    db.commit()

    print("Database seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed_db()
