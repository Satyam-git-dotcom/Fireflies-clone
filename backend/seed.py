import datetime
import json
from sqlalchemy.orm import Session
from .database import engine, SessionLocal
from . import models

def seed_db():
    models.Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    
    # Clear existing data for fresh seed
    db.query(models.TranscriptLine).delete()
    db.query(models.MeetingSummary).delete()
    db.query(models.Meeting).delete()
    db.commit()

    meeting1 = models.Meeting(
        title="meeting_280.wav",
        date=datetime.datetime.utcnow() - datetime.timedelta(hours=2),
        duration=344,
        participants="Satyam V, Speaker 1, Speaker 2"
    )
    db.add(meeting1)
    db.commit()
    db.refresh(meeting1)

    t1 = [
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 1", start_time=0.0, end_time=15.0, text="David is prioritizing planning personal leisure activities, specifically selecting movies to watch at cinemas."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 2", start_time=16.0, end_time=35.0, text="There is a focus on identifying current cinema releases, with a specific interest in an intense movie featuring Margot Robbie."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 1", start_time=36.0, end_time=50.0, text="Exploration of science fiction movies as a favored genre, particularly those with realistic or near-future themes like Interstellar and Arrival."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 2", start_time=51.0, end_time=65.0, text="The immediate goal is to finalize movie choices for a relaxing movie weekend."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 1", start_time=182.0, end_time=195.0, text="David is preparing for a short trip to Italy scheduled for early March, aiming to enjoy early spring weather."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 2", start_time=196.0, end_time=210.0, text="Recent travel highlights include a visit to Zimbabwe, focusing on cultural immersion and local cuisine."),
        models.TranscriptLine(meeting_id=meeting1.id, speaker="Speaker 1", start_time=211.0, end_time=230.0, text="Another significant travel experience involved swimming with whales in Tonga, which was a bit scary but memorable."),
    ]
    db.bulk_save_objects(t1)

    s1 = models.MeetingSummary(
        meeting_id=meeting1.id,
        summary_text="",
        action_items=json.dumps([]),
        key_topics=json.dumps([
            {"title": "Planning Upcoming Leisure Activities (00:00)", "details": [
                "David is prioritizing planning personal leisure activities, specifically selecting movies to watch at cinemas.",
                "There is a focus on identifying current cinema releases, with a specific interest in an intense movie featuring Margot Robbie.",
                "Exploration of science fiction movies as a favored genre, particularly those with realistic or near-future themes like Interstellar and Arrival.",
                "The immediate goal is to finalize movie choices for a relaxing movie weekend."
            ]},
            {"title": "Travel Preparations and Experiences (03:02)", "details": [
                "David is preparing for a short trip to Italy scheduled for early March, aiming to enjoy early spring weather.",
                "Recent travel highlights include a visit to Zimbabwe, focusing on cultural immersion and local cuisine.",
                "Another significant travel experience involved swimming with whales in Tonga,"
            ]}
        ])
    )
    db.add(s1)
    db.commit()

    print("Database seeded successfully.")
    db.close()

if __name__ == "__main__":
    seed_db()
