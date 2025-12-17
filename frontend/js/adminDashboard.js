const token = localStorage.getItem("adminToken");

async function loadBookings() {
  const res = await fetch("http://localhost:5000/api/bookings", {
    headers: {
      Authorization: "Bearer " + token
    }
  });

  const bookings = await res.json();

  const tableBody = document.querySelector("#bookingTable tbody");
  tableBody.innerHTML = "";

  bookings.forEach(b => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${b.name}</td>
      <td>${b.email}</td>
      <td>${new Date(b.date).toLocaleDateString()}</td>
      <td class="${b.status === "approved" ? "status-approved" : "status-pending"}">
        ${b.status}
      </td>
      <td>
        <button class="action approve" onclick="updateStatus('${b._id}', 'approved')">Approve</button>
        <button class="action reject" onclick="updateStatus('${b._id}', 'rejected')">Reject</button>
      </td>
    `;

    tableBody.appendChild(row);
  });
}

async function updateStatus(id, status) {
  await fetch(`http://localhost:5000/api/bookings/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token
    },
    body: JSON.stringify({ status })
  });

  loadBookings(); // refresh
}

function logout() {
  localStorage.removeItem("adminToken");
  window.location.href = "index.html";
}

loadBookings();
