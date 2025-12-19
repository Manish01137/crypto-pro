console.log("✅ adminDashboard.js loaded");

const API_BASE = "http://localhost:5000";
const token = localStorage.getItem("adminToken");
const table = document.getElementById("bookingTable");

let allBookings = [];

/* =========================
   SKELETON LOADING
========================= */
function showSkeleton() {
  table.innerHTML = `
    <tr>
      <td colspan="7" style="padding:30px; opacity:0.5; text-align:center">
        Loading bookings...
      </td>
    </tr>
  `;
}

/* =========================
   LOAD BOOKINGS (SAFE)
========================= */

// async function loadBookings() {
//   showSkeleton();

//   try {
//     const res = await fetch("http://localhost:5000/api/bookings", {
//       headers: {
//         Authorization: "Bearer " + token
//       }
//     });

//     if (!res.ok) {
//       renderBookings([]);
//       return;
//     }

//     const data = await res.json();

//     // ✅ THIS IS THE FIX
//     allBookings = Array.isArray(data) ? data : data.bookings;

//     const statusFilter = document.getElementById("statusFilter");
//     if (statusFilter) statusFilter.value = "all";

//     renderBookings(allBookings);

//   } catch (err) {
//     renderBookings([]);
//   }
// }



async function loadBookings() {
  console.log("🚀 loadBookings called");
  showSkeleton();

  try {
    const res = await fetch(`${API_BASE}/api/bookings`);
    const data = await res.json();

    console.log("📦 bookings from API:", data);

    allBookings = data;
    renderBookings(allBookings);

  } catch (err) {
    console.error("Load bookings error:", err);
    renderBookings([]);
  }
}



// async function loadBookings() {
//   showSkeleton();

//   try {
//     const res = await fetch("http://localhost:5000/api/bookings", {
//       headers: {
//         Authorization: "Bearer " + token
//       }
//     });

//     // If backend responds but not OK (401, 403, 500)
//     if (!res.ok) {
//       renderBookings([]);
//       return;
//     }

//     allBookings = await res.json();

//     // Reset status filter on reload
//     const statusFilter = document.getElementById("statusFilter");
//     if (statusFilter) statusFilter.value = "all";

//     renderBookings(allBookings);

//   } catch (err) {
//     // Backend down / network issue
//     renderBookings([]);
//   }
// }

/* =========================
   RENDER BOOKINGS
========================= */
function renderBookings(bookings) {
  table.innerHTML = "";

  if (!bookings || bookings.length === 0) {
    table.innerHTML = `
      <tr>
        <td colspan="7" style="padding:30px; opacity:0.5; text-align:center">
          No bookings available
        </td>
      </tr>
    `;
    return;
  }

  bookings.forEach(b => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${b.bookingId}</td>
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${b.phone}</td>
      <td>
        <span class="status ${b.status}">${b.status}</span>
      </td>
      <td>${new Date(b.createdAt).toLocaleDateString()}</td>
      <td>
        <select class="action" onchange="updateStatus('${b._id}', this.value)">
          <option value="pending" ${b.status === "pending" ? "selected" : ""}>
            Pending
          </option>
          <option value="approved" ${b.status === "approved" ? "selected" : ""}>
            Confirmed
          </option>
          <option value="rejected" ${b.status === "rejected" ? "selected" : ""}>
            Cancelled
          </option>
        </select>

      </td>
    `;

    table.appendChild(row);
  });
}

/* =========================
   UPDATE STATUS (OPTIMISTIC)
========================= */

async function updateStatus(id, status) {
  try {
    const res = await fetch(`${API_BASE}/api/bookings/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ status })
    });

    if (!res.ok) {
      console.error("Failed to update status");
      return;
    }

    // Optimistic UI update
    allBookings = allBookings.map(b =>
      b._id === id ? { ...b, status } : b
    );

    applyFilters();

  } catch (err) {
    console.error("Update status error:", err);
  }
}



/* =========================
   FILTERS (SEARCH + STATUS)
========================= */
function applyFilters() {
  const searchInput = document.getElementById("searchInput");
  const statusSelect = document.getElementById("statusFilter");

  const search = searchInput ? searchInput.value.toLowerCase() : "";
  const status = statusSelect ? statusSelect.value : "all";

  let filtered = allBookings.filter(b =>
    b.bookingId.toLowerCase().includes(search) ||
    b.name.toLowerCase().includes(search) ||
    b.email.toLowerCase().includes(search)
  );

  if (status !== "all") {
    filtered = filtered.filter(b => b.status === status);
  }

  renderBookings(filtered);
}

/* =========================
   EXPORT CSV
========================= */
function exportCSV() {
  if (!allBookings.length) return;

  const headers = [
    "Booking ID",
    "Name",
    "Email",
    "Phone",
    "Status",
    "Created"
  ];

  const rows = allBookings.map(b => [
    b.bookingId,
    b.name,
    b.email,
    b.phone,
    b.status,
    new Date(b.createdAt).toLocaleDateString()
  ]);

  let csv = headers.join(",") + "\n";
  rows.forEach(r => {
    csv += r.join(",") + "\n";
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "bookings.csv";
  a.click();

  URL.revokeObjectURL(url);
}

/* =========================
   LOGOUT
========================= */
function logout() {
  localStorage.removeItem("adminToken");
  window.location.href = "index.html";
}

/* =========================
   INIT + AUTO REFRESH
========================= */
loadBookings();
setInterval(loadBookings, 30000); // auto refresh every 30s
