// const checkStatusBtn = document.getElementById("checkStatusBtn");
// const statusResult = document.getElementById("statusResult");

// checkStatusBtn.addEventListener("click", async () => {
//   const bookingId = document.getElementById("bookingId").value.trim();

//   if (!bookingId) {
//     statusResult.style.color = "red";
//     statusResult.innerText = "Please enter a Booking ID";
//     return;
//   }

//   try {
//     // ✅ ONLY THIS LINE WAS CHANGED
//     const res = await fetch(
//       `https://crypto-pro-2.onrender.com/api/bookings/status/${bookingId}`
//     );

//     const data = await res.json();

//     if (!res.ok || !data.success) {
//       statusResult.style.color = "red";
//       statusResult.innerText = data.message || "Booking not found";
//       return;
//     }

//     statusResult.style.color = "lightgreen";
//     statusResult.innerHTML = `
//       <p><strong>Status:</strong> ${data.status}</p>
//       <p><strong>Package:</strong> ${data.packageName ?? "N/A"}</p>
//       <p><strong>Amount:</strong> ₹${data.amount ?? "N/A"}</p>
//       <p><strong>Created At:</strong> ${
//         data.createdAt
//           ? new Date(data.createdAt).toLocaleString()
//           : "N/A"
//       }</p>
//     `;
//   } catch (error) {
//     statusResult.style.color = "red";
//     statusResult.innerText = "Server error. Try again later.";
//   }
// });

document.addEventListener("DOMContentLoaded", () => {

  /* =====================
     CONFIG
  ===================== */
  const API_BASE = "https://crypto-pro-1.onrender.com";

  /* =====================
     ELEMENTS
  ===================== */
  const checkStatusBtn = document.getElementById("checkStatusBtn");
  const statusResult = document.getElementById("statusResult");
  const bookingIdInput = document.getElementById("bookingId");

  if (!checkStatusBtn || !statusResult || !bookingIdInput) {
    console.error("Status page elements missing");
    return;
  }

  /* =====================
     CHECK STATUS
  ===================== */
  checkStatusBtn.addEventListener("click", async () => {
    const bookingId = bookingIdInput.value.trim();

    if (!bookingId) {
      statusResult.style.color = "red";
      statusResult.innerText = "Please enter a Booking ID";
      return;
    }

    // Loading state
    statusResult.style.color = "#ccc";
    statusResult.innerText = "Checking status...";

    try {
      // ✅ CORRECT API ROUTE
      const res = await fetch(
        `${API_BASE}/api/bookings/${bookingId}`
      );

      const data = await res.json();

      if (!res.ok) {
        statusResult.style.color = "red";
        statusResult.innerText = data.message || "Booking not found";
        return;
      }

      // ✅ SUCCESS
      statusResult.style.color = "lightgreen";
      statusResult.innerHTML = `
        <p><strong>Status:</strong> ${data.status || "Pending"}</p>
        <p><strong>Package:</strong> ${data.packageName || "N/A"}</p>
        <p><strong>Amount:</strong> ₹${data.amount || "N/A"}</p>
        <p><strong>Created At:</strong> ${
          data.createdAt
            ? new Date(data.createdAt).toLocaleString()
            : "N/A"
        }</p>
      `;

    } catch (error) {
      console.error("Status Error:", error);
      statusResult.style.color = "red";
      statusResult.innerText = "Server error. Try again later.";
    }
  });

});
