from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class TranscriptLineBase(BaseModel):
    speaker: str
    start_time: float
    end_time: float
    text: str

class TranscriptLineCreate(TranscriptLineBase):
    pass

class TranscriptLine(TranscriptLineBase):
    id: int
    meeting_id: int

    class Config:
        orm_mode = True
        from_attributes = True

class MeetingSummaryBase(BaseModel):
    summary_text: str
    action_items: str
    key_topics: str

class MeetingSummaryCreate(MeetingSummaryBase):
    pass

class MeetingSummary(MeetingSummaryBase):
    id: int
    meeting_id: int

    class Config:
        orm_mode = True
        from_attributes = True

class MeetingBase(BaseModel):
    title: str
    date: Optional[datetime] = None
    duration: int
    participants: str

class MeetingCreate(MeetingBase):
    transcripts: Optional[List[TranscriptLineCreate]] = []
    summary: Optional[MeetingSummaryCreate] = None

class Meeting(MeetingBase):
    id: int
    transcripts: List[TranscriptLine] = []
    summary: Optional[MeetingSummary] = None

    class Config:
        orm_mode = True
        from_attributes = True
