# Live Polling System

A full-stack **real-time polling web application** built using **React**, **TypeScript**, **Node.js**, **Socket.IO**, and **MongoDB**.

This system allows a **Teacher/Admin** to create and manage live polls, while **Students** can join, vote once, and see results update instantly — without any page refresh.

Built as part of an **SDE Intern Assignment**, with focus on:
- Real-time systems
- Backend correctness
- Database persistence
- Clean UI inspired by Figma

---

## Features

### Teacher / Admin
- Create live polls with multiple options
- View live voting results in real time
- End polls manually
- Prevent voting after poll ends
- View history of completed polls

### 🎓 Student
- Join poll by entering name
- Waiting screen until poll starts
- Vote exactly once per poll
- Live vote count updates
- Automatic poll disable after end

### ⚙️ System
- Real-time communication using Socket.IO
- Persistent storage using MongoDB
- One-vote-per-student enforcement (backend)
- Clean, centered UI inspired by Figma
- No page refresh required

---

## Tech Stack

### Frontend
- React (Vite)
- TypeScript
- React Router
- Socket.IO Client
- Custom CSS (Figma-inspired)

### Backend
- Node.js
- Express
- TypeScript
- Socket.IO
- MongoDB (Mongoose)

---

## Complete Project Folder Structure

```
live-polling-system/
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   └── pollController.ts
│   │   │
│   │   ├── models/
│   │   │   ├── Poll.ts
│   │   │   └── Vote.ts
│   │   │
│   │   ├── routes/
│   │   │   └── pollRoutes.ts
│   │   │
│   │   ├── sockets/
│   │   │   └── pollSocket.ts
│   │   │
│   │   ├── utils/
│   │   │   └── db.ts
│   │   │
│   │   ├── app.ts
│   │   └── server.ts
│   │
│   ├── .env
│   ├── package.json
│   ├── tsconfig.json
│   └── nodemon.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── RoleSelect.tsx
│   │   │   ├── Poll.tsx
│   │   │   ├── student/
│   │   │   │   ├── JoinPoll.tsx
│   │   │   │   └── Waiting.tsx
│   │   │   └── admin/
│   │   │       ├── CreatePoll.tsx
│   │   │       ├── LiveResults.tsx
│   │   │       └── PollHistory.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── socket.ts
│   │   │   └── socketEvents.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── ui.css
│   │   │   ├── poll.css
│   │   │   └── adminLive.css
│   │   │
│   │   ├── App.tsx
│   │   └── main.tsx
│   │
│   ├── index.html
│   ├── package.json
│   └── vite.config.ts
│
├── README.md
└── .gitignore
```

---

## Socket Events

| Event | Direction | Purpose |
|-----|----------|--------|
| poll:create | Admin → Server | Create poll |
| GET_ACTIVE_POLL | Client → Server | Fetch active poll |
| POLL_STARTED | Server → Clients | Broadcast poll start |
| vote:cast | Student → Server | Cast vote |
| POLL_UPDATED | Server → Clients | Update votes |
| poll:end | Admin → Server | End poll |
| POLL_ENDED | Server → Clients | Notify poll end |
| VOTE_REJECTED | Server → Student | Prevent double vote |

---

## Database Schema (MongoDB)

### Poll
- question: string
- options: [{ text, votes }]
- voters: [socketId]
- isActive: boolean
- timestamps

### Vote Protection
- One vote per socket ID
- Enforced on backend
- Cannot bypass via refresh

---

## Run Project Locally

### Prerequisites
- Node.js (v18+)
- MongoDB (Local / Compass)
- npm

---

### Backend Setup

```
cd backend
npm install
```

Create `.env`:
```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/live_polling
```

Run backend:
```
npm run dev
```

---

### Frontend Setup

```
cd frontend
npm install
npm run dev
```

Open:
```
http://localhost:5173
```

---

## End-to-End Testing

1. Teacher creates poll
2. Student joins poll
3. Vote once → live update
4. Second vote blocked
5. Admin ends poll
6. Poll ends for all users
7. Poll history persists
8. Server restart does not lose data

---

## Highlights

- Fully real-time
- MongoDB persistence
- Defensive backend logic
- Clean Figma-inspired UI
- Interview-ready architecture

---

## Notes

- Timer feature optional (not required)
- Focus on correctness and real-time flow
- UI optimized for clarity

---

## Author

Aditya Khamait  
Live Polling System

---

## Status

✔ Completed  
✔ Tested  
✔ Ready for Submission
