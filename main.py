from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from datetime import date, datetime
import sqlite3
import os

app = FastAPI()

# Enable CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

# Database setup
DB_NAME = "analytics.db"

def init_db():
    if not os.path.exists(DB_NAME):
        conn = sqlite3.connect(DB_NAME)
        c = conn.cursor()
        c.execute('''CREATE TABLE users
                     (user_id INTEGER PRIMARY KEY,
                      registration_date DATE,
                      traffic_source TEXT)''')
        c.execute('''CREATE TABLE events
                     (event_id INTEGER PRIMARY KEY,
                      user_id INTEGER,
                      event_type TEXT,
                      event_time TIMESTAMP,
                      FOREIGN KEY(user_id) REFERENCES users(user_id))''')
        conn.commit()
        conn.close()

init_db()

# Pydantic models
class User(BaseModel):
    registration_date: date
    traffic_source: str

class Event(BaseModel):
    user_id: int
    event_type: str
    event_time: datetime

# API endpoints
@app.get("/api/users")
def get_users():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT * FROM users")
    users = [{"user_id": row[0], "registration_date": row[1], "traffic_source": row[2]} for row in c.fetchall()]
    conn.close()
    return users

@app.post("/api/users")
def add_user(user: User):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("INSERT INTO users (registration_date, traffic_source) VALUES (?, ?)",
              (user.registration_date, user.traffic_source))
    conn.commit()
    user_id = c.lastrowid
    conn.close()
    return {"user_id": user_id, "message": "User added successfully"}

@app.get("/api/events")
def get_events():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT * FROM events")
    events = [{"event_id": row[0], "user_id": row[1], "event_type": row[2], "event_time": row[3]} for row in c.fetchall()]
    conn.close()
    return events

@app.post("/api/events")
def add_event(event: Event):
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("INSERT INTO events (user_id, event_type, event_time) VALUES (?, ?, ?)",
              (event.user_id, event.event_type, event.event_time))
    conn.commit()
    event_id = c.lastrowid
    conn.close()
    return {"event_id": event_id, "message": "Event added successfully"}

@app.get("/api/metrics/conversion")
def get_conversion_rate():
    conn = sqlite3.connect(DB_NAME)
    c = conn.cursor()
    c.execute("SELECT COUNT(DISTINCT user_id) FROM users")
    total_users = c.fetchone()[0]
    c.execute("SELECT COUNT(DISTINCT user_id) FROM events WHERE event_type = 'purchase'")
    users_with_purchase = c.fetchone()[0]
    conn.close()
    
    if total_users == 0:
        return {"conversion_rate": 0}
    
    conversion_rate = users_with_purchase / total_users
    return {"conversion_rate": conversion_rate}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

