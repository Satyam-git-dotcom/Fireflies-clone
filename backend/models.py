from sqlalchemy import Column, Integer, String, Float, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
import datetime
from database import Base

class Meeting(Base):
    __tablename__ = "meetings"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    date = Column(DateTime, default=datetime.datetime.utcnow)
    duration = Column(Integer) # in seconds
    participants = Column(String) # comma separated

    transcripts = relationship("TranscriptLine", back_populates="meeting", cascade="all, delete-orphan")
    summary = relationship("MeetingSummary", back_populates="meeting", uselist=False, cascade="all, delete-orphan")

class TranscriptLine(Base):
    __tablename__ = "transcript_lines"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"))
    speaker = Column(String)
    start_time = Column(Float) # in seconds
    end_time = Column(Float) # in seconds
    text = Column(Text)

    meeting = relationship("Meeting", back_populates="transcripts")

class MeetingSummary(Base):
    __tablename__ = "meeting_summaries"

    id = Column(Integer, primary_key=True, index=True)
    meeting_id = Column(Integer, ForeignKey("meetings.id"), unique=True)
    summary_text = Column(Text)
    action_items = Column(Text) # comma or newline separated
    key_topics = Column(Text) # comma separated

    meeting = relationship("Meeting", back_populates="summary")
