const convoList = document.querySelector(".conversations");

async function loadConversations() {
  const res = await fetch("/api/support/conversations");
  const data = await res.json();

  convoList.innerHTML = "";

  data.forEach(convo => {
    const div = document.createElement("div");
    div.textContent = convo.userEmail;
    div.className = "conversation-item";
    convoList.appendChild(div);
  });
}

loadConversations();
