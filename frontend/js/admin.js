// ===============================
// ADMIN AUTH GUARD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "/admin-login.html";
    return;
  }

  // Optional: load default admin content
  // loadBookings();
});

// ===============================
// LOAD SUPPORT SECTION
// ===============================
function loadSupport() {
  document.getElementById("mainContent").innerHTML = `
    <section class="support">
      <div class="card conversations">
        <h3>💬 Conversations</h3>
        <div id="conversationList"></div>
      </div>

      <div class="card chat">
        <h3>Select a conversation</h3>
        <div class="chat-empty">
          💬
          <p>Select a conversation to view messages</p>
        </div>
      </div>
    </section>
  `;

  loadConversationsWithAuth();
}
