const API = "http://localhost:10000";

/* ================= ELEMENTS ================= */
const fab = document.getElementById("chat-fab");
const panel = document.getElementById("chat-panel");
const closeBtn = document.getElementById("chat-close");

const bookingInput = document.querySelector(".chat-content input");
const inputBox = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".chat-input button");
const chatBody = document.querySelector(".chat-content");

/* ================= TOGGLE ================= */
fab.onclick = () => panel.style.display = "flex";
closeBtn.onclick = () => panel.style.display = "none";

sendBtn.onclick = sendMessage;
inputBox.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

/* ================= UI ================= */
function addMessage(text, sender = "user") {
  const msg = document.createElement("div");
  msg.style.margin = "8px 0";
  msg.style.textAlign = sender === "user" ? "right" : "left";

  msg.innerHTML = `
    <span style="
      background:${sender === "user" ? "#0f172a" : "#111827"};
      padding:8px 12px;
      border-radius:12px;
      display:inline-block;
      color:white;
      max-width:80%;
    ">
      ${text}
    </span>
  `;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

/* ================= SEND MESSAGE ================= */
async function sendMessage() {
  const text = inputBox.value.trim();
  const bookingId = bookingInput.value.trim();

  if (!bookingId) {
    alert("Please enter Booking ID first");
    return;
  }

  if (!text) return;

  addMessage(text, "user");
  inputBox.value = "";

  await fetch(`${API}/api/support/send`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ bookingId, text })
  });
}

/* ================= FETCH ADMIN REPLIES ================= */
async function loadMessages() {
  const bookingId = bookingInput.value.trim();
  if (!bookingId) return;

  const res = await fetch(`${API}/api/support/${bookingId}`);
  const data = await res.json();

  chatBody.innerHTML = "";
  data.messages.forEach(m => {
    addMessage(m.text, m.sender);
  });
}

/* AUTO REFRESH */
setInterval(loadMessages, 3000);
