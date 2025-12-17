// Check if admin is logged in
const token = localStorage.getItem("adminToken");

if (!token) {
  // Not logged in → redirect to login
  window.location.href = "index.html";
}
fetch("http://localhost:5000/api/admin/dashboard", {
  headers: {
    Authorization: "Bearer " + token
  }
})
  .then(res => {
    if (!res.ok) {
      localStorage.removeItem("adminToken");
      window.location.href = "index.html";
    }
  })
  .catch(() => {
    localStorage.removeItem("adminToken");
    window.location.href = "index.html";
  });