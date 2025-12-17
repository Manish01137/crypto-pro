let selectedPackage = "";
let amount = 0;

const cards = document.querySelectorAll(".card");
const step1 = document.getElementById("step1");
const step2 = document.getElementById("step2");

cards.forEach(card => {
  card.addEventListener("click", () => {
    cards.forEach(c => c.classList.remove("selected"));
    card.classList.add("selected");

    selectedPackage = card.dataset.package;
    amount = card.dataset.amount;
  });
});

document.getElementById("toStep2").onclick = () => {
  if (!selectedPackage) return alert("Select a package first");
  step1.classList.remove("active");
  step2.classList.add("active");
};

document.getElementById("bookingForm").addEventListener("submit", async e => {
  e.preventDefault();

  const name = name.value;
  const email = email.value;
  const phone = phone.value;

  const res = await fetch("http://localhost:5001/api/bookings", {
    method:"POST",
    headers:{ "Content-Type":"application/json" },
    body:JSON.stringify({
      name,email,phone,
      packageName:selectedPackage,
      amount
    })
  });

  const data = await res.json();
  document.getElementById("responseMessage").innerText =
    data.success ? `✅ Booking ID: ${data.bookingId}` : "❌ Error";
});
