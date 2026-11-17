// Booking form: validation, guest stepper and confirmation summary.
// Set data-endpoint on the form (e.g. a Formspree URL) to send real requests.
(() => {
  const form = document.getElementById("booking-form");
  const status = document.getElementById("booking-status");
  const guests = document.getElementById("guests");
  const date = document.getElementById("date");

  date.min = new Date().toLocaleDateString("en-CA"); // today, local time

  const step = (d) => {
    const next = Math.min(10, Math.max(1, (Number(guests.value) || 1) + d));
    guests.value = next;
  };
  document.getElementById("guests-minus").addEventListener("click", () => step(-1));
  document.getElementById("guests-plus").addEventListener("click", () => step(1));

  function summary(data) {
    const when = new Date(`${data.get("date")}T${data.get("time")}`);
    const day = when.toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "long" });
    const time = when.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    const n = Number(data.get("guests"));
    return `${n} ${n === 1 ? "guest" : "guests"} on ${day} at ${time}`;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "";
    if (!form.checkValidity()) {
      form.reportValidity();
      status.textContent = "Please complete every field.";
      status.className = "error";
      return;
    }
    const data = new FormData(form);
    const endpoint = form.dataset.endpoint;
    if (!endpoint) {
      status.textContent = `Demo booking for ${summary(data)}. Nothing was sent.`;
      return;
    }
    try {
      const res = await fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } });
      if (!res.ok) throw new Error(res.status);
      status.textContent = `Thanks, ${data.get("name")}! We've received your request for ${summary(data)}.`;
      form.reset();
      guests.value = 2;
    } catch {
      status.textContent = "Sorry, something went wrong. Please try again.";
      status.className = "error";
    }
  });
})();
