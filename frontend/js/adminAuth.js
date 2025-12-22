document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");
  const errorEl = document.getElementById("error");

  if (!form) {
    console.error("❌ loginForm not found");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    errorEl.innerText = "";

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
      const res = await fetch("http://localhost:5000/api/admin/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      });

      // 🔑 IMPORTANT: check status BEFORE parsing
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text);
      }

      const data = await res.json();
      console.log("Login success:", data);

      localStorage.setItem("adminToken", data.token);

      // redirect
      window.location.href = "admin.html";

    } catch (err) {
      console.error("Login error:", err);
      errorEl.innerText = "Server error. Try again.";
    }
  });
});
