// CHAT WITH NOTIFICATIONS API
// Use this file with the websockets chat app (the previous section.)

const sidebar = document.querySelector("#membersSidebar");
const toggleBtn = document.querySelector("#membersToggle");
const closeBtn = document.querySelector("#closeSidebar");

function getRoomNameFromURL() {
  const urlParts = document.URL.split("/");
  if (urlParts.length < 3) {
    console.error("Invalid URL: Room name not found.");
    return null;
  }
  return urlParts.at(-1);
}

// Helper function to create chat message elements
// This function does too much and should probably be split up!
function createMessageElement(msg) {
  const item = document.createElement("li");
  if (msg.type === "note") {
    const text = document.createElement("i");
    text.textContent = msg.text;
    item.appendChild(text);
  } else if (msg.type === "chat") {
    if (msg.name != username && document.visibilityState !== "visible") {
      showNotification(msg);
    }

    if (msg.name !== username && document.visibilityState !== "visible") {
      showNotification(msg);
    }
    item.innerHTML = `<b>${msg.name}:</b> ${msg.text}`;
  }
  return item;
}

function updateMembersUI(users) {
  const count = users.length;
  document.querySelector("#memberCount").textContent =
    `${count} members online`;
  document.querySelector("#memberCountBtn").textContent = count;
}

function renderMembersList(users) {
  const list = document.querySelector("#membersList");
  list.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user;
    list.appendChild(li);
  });
}

async function showNotification({ name, text }) {
  const permission = await Notification.requestPermission();
  if (permission === "granted") {
    const notification = new Notification(`New chat message from ${name}`, {
      body: text,
    });
    notification.addEventListener("click", () => {
      notification.close();
      window.focus();
    });
  }
}

// Initialize WebSocket connection
function initializeWebSocket(roomName, username) {
  const socket = new WebSocket(
    `${location.protocol === "https:" ? "wss" : "ws"}://${location.host}/chat/${roomName}`,
  );

  socket.onopen = () => {
    console.log("WebSocket Opened");
    socket.send(JSON.stringify({ type: "join", name: username }));
  };

  socket.onmessage = (evt) => {
    const msg = JSON.parse(evt.data);
    if (msg.type === "joke") {
      document.querySelector("#messageInput").value = msg.text;
      input.value = msg.text;
      input.focus();
      return;
    }
    if (msg.type === "members") {
      updateMembersUI(msg.users);
      renderMembersList(msg.users);
      return;
    }

    const messageElement = createMessageElement(msg);
    document.querySelector("#messages").appendChild(messageElement);
  };

  socket.onerror = (evt) => {
    console.error("WebSocket Error", evt);
  };

  socket.onclose = () => {
    console.log("WebSocket Closed");
  };

  return socket;
}

const roomName = getRoomNameFromURL();
const username = prompt("Enter your username (no spaces)");
const socket = initializeWebSocket(roomName, username);

document.querySelector("#msg-form").addEventListener("submit", (evt) => {
  evt.preventDefault();
  const input = document.querySelector("#messageInput");
  socket.send(JSON.stringify({ type: "chat", text: input.value }));
  input.value = "";
});

document.querySelector("#jokeBtn").addEventListener("click", () => {
  jokeBtn.disabled = true;
  socket.send(JSON.stringify({ type: "get-joke" }));
  setTimeout(() => (jokeBtn.disabled = false), 2000);
});
document.querySelector("#roomTitle").textContent = roomName;

toggleBtn.addEventListener("click", () => {
  sidebar.classList.toggle("open");

  socket.send(JSON.stringify({ type: "get-members" }));
});

closeBtn.addEventListener("click", () => {
  sidebar.classList.remove("open");
});
