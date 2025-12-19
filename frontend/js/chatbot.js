const fab = document.getElementById("chat-fab");
const panel = document.getElementById("chat-panel");
const closeBtn = document.getElementById("chat-close");

const inputBox = document.querySelector(".chat-input input");
const sendBtn = document.querySelector(".chat-input button");
const chatBody = document.querySelector(".chat-content");

let bookingId = "";

fab.onclick = () => panel.style.display = "flex";
closeBtn.onclick = () => panel.style.display = "none";

sendBtn.onclick = sendMessage;
inputBox.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function addMessage(text, type = "user") {
  const msg = document.createElement("div");
  msg.style.margin = "8px 0";
  msg.style.textAlign = type === "user" ? "right" : "left";
  msg.innerHTML = `<span style="
      background:#0f172a;
      padding:8px 12px;
      border-radius:12px;
      display:inline-block;
      color:white;
  ">${text}</span>`;
  chatBody.appendChild(msg);
  chatBody.scrollTop = chatBody.scrollHeight;
}

async function sendMessage() {
  const message = inputBox.value.trim();
  if (!message) return;

  addMessage(message, "user");
  inputBox.value = "";

  if (message.startsWith("CRY-")) bookingId = message;

  const res = await fetch("http://localhost:5000/api/chatbot/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, bookingId })
  });

  const data = await res.json();
  addMessage(data.reply, "bot");
}

