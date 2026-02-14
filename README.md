# PulseChat — Anonymous WebSocket Chatrooms

PulseChat is a real-time anonymous chatroom application built using Express and WebSockets (`express-ws`). The platform enables instant topic-based conversations without requiring user accounts or identity storage.

## 📸 Screenshots

<!-- Add your website screenshots here -->
![Homepage](./screenshots/homepage.png)
![Chat Room](./screenshots/chatroom.png)
![Mobile View](./screenshots/mobile.png)

---

## 🌟 Overview

PulseChat provides:

* Real-time messaging via WebSockets
* Dynamic room-based conversations
* Anonymous participation (no authentication layer)
* Live member presence updates
* Optional server-generated joke messages
* Responsive modern UI
* Animated canvas-based background

---

## 🛠️ Tech Stack

### Backend
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=white)
![WebSocket](https://img.shields.io/badge/WebSocket-010101?style=for-the-badge&logo=websocket&logoColor=white)

### Frontend
![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white) 
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

### Tools & Libraries
![Lucide](https://img.shields.io/badge/Lucide_Icons-F56565?style=for-the-badge&logo=lucide&logoColor=white)
![Canvas API](https://img.shields.io/badge/Canvas_API-FF6B6B?style=for-the-badge&logo=html5&logoColor=white)

---

## 📂 Project Structure

```mermaid
graph TD
    A[Root] --> B[server.js]
    A --> C[app.js]
    A --> D[Room.js]
    A --> E[ChatUser.js]
    A --> F[jokes.js]
    A --> G[static/]
    G --> H[css/]
    H --> I[styles.css]
    H --> J[tailwind.css]
    G --> K[js/]
    K --> L[chat.js]
    K --> M[animateBG.js]
    K --> N[features.js]
    G --> O[index.html]
    G --> P[chat.html]
    
    style A fill:#1e3a8a,stroke:#3b82f6,stroke-width:2px,color:#fff
    style G fill:#7c3aed,stroke:#a855f7,stroke-width:2px,color:#fff
    style H fill:#059669,stroke:#10b981,stroke-width:2px,color:#fff
    style K fill:#059669,stroke:#10b981,stroke-width:2px,color:#fff
```

---

## 🏗️ Application Architecture

PulseChat follows a WebSocket-driven event model.

### Backend Event Flow

```mermaid
sequenceDiagram
participant Client
participant WebSocket
participant ChatUser
participant Room
Client->>WebSocket: Establish connection
WebSocket->>ChatUser: Create user instance
Client->>ChatUser: Send JOIN event
ChatUser->>Room: Add member
Room->>All Clients: Broadcast join notification
Client->>ChatUser: Send CHAT event
ChatUser->>Room: Broadcast message
Room->>All Clients: Deliver message
Client->>ChatUser: Disconnect
ChatUser->>Room: Remove member
Room->>All Clients: Broadcast leave notification
```

### Frontend Flow

```mermaid
sequenceDiagram
participant User
participant Browser
participant WebSocket
participant UI
User->>Browser: Open room URL
Browser->>User: Prompt for username
Browser->>WebSocket: Connect to room socket
WebSocket->>UI: Receive events
UI->>UI: Render chat messages
UI->>UI: Update member presence
UI->>UI: Display notifications
```

---

## ⚙️ Core Functionalities

### Room Management
* Dynamic room creation via URL
* In-memory room registry

### Real-Time Messaging
* Instant message broadcasting
* Server-sent events (notes, chat, members)

### Presence Awareness
* Join / Leave detection
* Live member count updates

### Server Utilities
* Joke generation via external API

---

## 🔒 Privacy Model

PulseChat is designed as an anonymous communication platform.

* **No account system**
* **No identity persistence**
* **No message storage**
* **All sessions are temporary**

---

## 🚀 Getting Started

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/pulsechat.git
cd pulsechat
```

2. Install dependencies
```bash
npm install
```

3. Start the server
```bash
npm start
```

4. Open your browser and navigate to
```
http://localhost:3000
```

---

## 📝 Usage

1. **Home Page**: Browse available chatrooms or create a custom room
2. **Join Room**: Click on any room or create your own
3. **Enter Username**: Provide a temporary username (not stored)
4. **Start Chatting**: Send messages in real-time with other users

---

## 🎨 Features

* **Anonymous Chatting**: No registration required
* **Real-time Communication**: Powered by WebSockets
* **Dynamic Rooms**: Create custom rooms on the fly
* **Responsive Design**: Works on desktop, tablet, and mobile
* **Animated Background**: Modern canvas-based animations
* **Live Presence**: See who's online in real-time

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 📧 Contact

* **Email**: 2003abinashdash@gmail.com
* **LinkedIn**: AbiDev2003

---

## 🙏 Acknowledgments

* Built with Express and WebSockets
* Icons by Lucide
* Map integration by OpenStreetMap

---

**© 2026 PulseChat. All rights reserved.**