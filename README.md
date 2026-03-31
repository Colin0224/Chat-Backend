# Chat Backend

Real-time chat server built with Express and Socket.IO.

## Getting Started

```bash
npm install
npm run dev
```

The server starts on `http://localhost:3000`.

## Tech Stack

| Layer       | Tool              |
| ----------- | ----------------- |
| Runtime     | Node.js + TypeScript |
| HTTP        | Express 5         |
| WebSocket   | Socket.IO 4       |
| Storage     | JSON file (chat.json) |

## API

### REST

| Method | Path | Description         |
| ------ | ---- | ------------------- |
| GET    | `/`  | Serves index.html  |

### Socket.IO Events

| Event        | Payload                                      | Description                        |
| ------------ | -------------------------------------------- | ---------------------------------- |
| `join-room`  | `roomId: string`                             | Join a room and receive message history |
| `leave-room` | `roomName: string`                           | Leave a room                       |
| `message`    | `{ chatID, UserID, msg, userName }`          | Send a message to a room           |
| `message`    | *(emitted to all room members)*              | Broadcast incoming message         |
| `disconnect` | *(automatic)*                                | Client disconnected                |

## Project Structure

```
src/
├── server.ts       # Express + Socket.IO server setup
├── room.ts         # (planned room logic)
├── chat.json       # Persisted message store
├── chatFile.json   # (planned file store)
└── index.html      # Landing page
```
