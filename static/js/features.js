function openPrivacy() {
  document.getElementById("privacyModal").classList.remove("hidden");
}

function closePrivacy() {
  document.getElementById("privacyModal").classList.add("hidden");
}

function openInfo(title, text) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("modalText").textContent = text;
  document.getElementById("infoModal").classList.remove("hidden");
}

function closeInfo() {
  document.getElementById("infoModal").classList.add("hidden");
}

// create room fuctionality
function openCreateRoom() {
  document.getElementById("createRoomModal").classList.remove("hidden");
  document.getElementById("roomInput").focus();
}

function closeCreateRoom() {
  document.getElementById("createRoomModal").classList.add("hidden");
}

function createRoom() {
  const roomName = document.getElementById("roomInput").value.trim();

  if (!roomName) return;

  // Clean URL friendly name 😌🔥
  const formattedRoom = roomName.replace(/\s+/g, "-").toLowerCase();

  window.location.href = "/" + formattedRoom;
}
// Handle Enter key in room input
document.getElementById("roomInput")?.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    createRoom();
  }
});

// Handle Escape key globally
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeCreateRoom();
});

// menu bar
const menuBtn = document.getElementById("menuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuLinks = document.querySelectorAll(".mobile-menu a, .mobile-menu button");

  menuBtn.addEventListener("click", () => {
    mobileMenu.classList.toggle("show");
  });

  /* 🔥 Auto close on click */
  menuLinks.forEach(link => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("show");
    });
  });
  

