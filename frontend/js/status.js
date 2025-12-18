const checkStatusBtn = document.getElementById("checkStatusBtn");
const statusResult = document.getElementById("statusResult");

checkStatusBtn.addEventListener("click", async () => {
  const bookingId = document.getElementById("bookingId").value.trim();

  if (!bookingId) {
    statusResult.style.color = "red";
    statusResult.innerText = "Please enter a Booking ID";
    return;
  }

  try {
    // ✅ ONLY THIS LINE WAS CHANGED
    const res = await fetch(
      `https://crypto-pro-2.onrender.com/api/bookings/status/${bookingId}`
    );

    const data = await res.json();

    if (!res.ok || !data.success) {
      statusResult.style.color = "red";
      statusResult.innerText = data.message || "Booking not found";
      return;
    }

    statusResult.style.color = "lightgreen";
    statusResult.innerHTML = `
      <p><strong>Status:</strong> ${data.status}</p>
      <p><strong>Package:</strong> ${data.packageName ?? "N/A"}</p>
      <p><strong>Amount:</strong> ₹${data.amount ?? "N/A"}</p>
      <p><strong>Created At:</strong> ${
        data.createdAt
          ? new Date(data.createdAt).toLocaleString()
          : "N/A"
      }</p>
    `;
  } catch (error) {
    statusResult.style.color = "red";
    statusResult.innerText = "Server error. Try again later.";
  }
});
