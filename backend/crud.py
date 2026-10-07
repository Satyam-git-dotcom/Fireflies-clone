from sqlalchemy.orm import Session
import models, schemas
import datetime

def get_meeting(db: Session, meeting_id: int):
    return db.query(models.Meeting).filter(models.Meeting.id == meeting_id).first()

def get_meetings(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Meeting).order_by(models.Meeting.date.desc()).offset(skip).limit(limit).all()

def create_meeting(db: Session, meeting: schemas.MeetingCreate):
    db_meeting = models.Meeting(
        title=meeting.title,
        date=meeting.date or datetime.datetime.utcnow(),
        duration=meeting.duration,
        participants=meeting.participants
    )
    db.add(db_meeting)
    db.commit()
    db.refresh(db_meeting)

    if meeting.transcripts:
        for t in meeting.transcripts:
            db_t = models.TranscriptLine(meeting_id=db_meeting.id, **t.dict())
            db.add(db_t)
    
    if meeting.summary:
        db_summary = models.MeetingSummary(meeting_id=db_meeting.id, **meeting.summary.dict())
        db.add(db_summary)

    db.commit()
    db.refresh(db_meeting)
    return db_meeting

def delete_meeting(db: Session, meeting_id: int):
    db_meeting = get_meeting(db, meeting_id)
    if db_meeting:
        db.delete(db_meeting)
        db.commit()
        return True
    return False

def update_meeting(db: Session, meeting_id: int, meeting_data: schemas.MeetingBase):
    db_meeting = get_meeting(db, meeting_id)
    if db_meeting:
        for key, value in meeting_data.dict().items():
            setattr(db_meeting, key, value)
        db.commit()
        db.refresh(db_meeting)
    return db_meeting

def update_meeting_summary(db: Session, meeting_id: int, summary_data: schemas.MeetingSummaryBase):
    db_summary = db.query(models.MeetingSummary).filter(models.MeetingSummary.meeting_id == meeting_id).first()
    if db_summary:
        for key, value in summary_data.dict().items():
            setattr(db_summary, key, value)
        db.commit()
        db.refresh(db_summary)
        return db_summary
    return None
