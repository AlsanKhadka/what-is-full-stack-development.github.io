document.getElementById("appointmentForm").addEventListener("submit", function(e) {
  e.preventDefault();

  let valid = true;

  // Get values
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;

  // Reset errors
  document.querySelectorAll(".error").forEach(el => el.style.display = "none");

  // Name validation: at least 3 characters, only letters/spaces
  const namePattern = /^[A-Za-z\s]{3,}$/;
  if (name === "") {
    document.getElementById("nameError").textContent = "Full name is required";
    document.getElementById("nameError").style.display = "block";
    valid = false;
  } else if (!namePattern.test(name)) {
    document.getElementById("nameError").textContent = "Enter a valid name (min 3 letters)";
    document.getElementById("nameError").style.display = "block";
    valid = false;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (email === "") {
    document.getElementById("emailError").textContent = "Email is required";
    document.getElementById("emailError").style.display = "block";
    valid = false;
  } else if (!emailPattern.test(email)) {
    document.getElementById("emailError").textContent = "Enter a valid email";
    document.getElementById("emailError").style.display = "block";
    valid = false;
  }

  // Phone validation: 7-15 digits only
  const phonePattern = /^[0-9]{7,15}$/;
  if (phone === "") {
    document.getElementById("phoneError").textContent = "Phone number is required";
    document.getElementById("phoneError").style.display = "block";
    valid = false;
  } else if (!phonePattern.test(phone)) {
    document.getElementById("phoneError").textContent = "Enter a valid phone number (7–15 digits)";
    document.getElementById("phoneError").style.display = "block";
    valid = false;
  }

  // Date validation: must be today or future
  const today = new Date().toISOString().split("T")[0];
  if (date === "") {
    document.getElementById("dateError").textContent = "Date is required";
    document.getElementById("dateError").style.display = "block";
    valid = false;
  } else if (date < today) {
    document.getElementById("dateError").textContent = "Date cannot be in the past";
    document.getElementById("dateError").style.display = "block";
    valid = false;
  }

  // Time validation: must be between 09:00 and 17:00
  if (time === "") {
    document.getElementById("timeError").textContent = "Time is required";
    document.getElementById("timeError").style.display = "block";
    valid = false;
  } else {
    const [hours, minutes] = time.split(":").map(Number);
    if (hours < 9 || (hours >= 17 && minutes > 0)) {
      document.getElementById("timeError").textContent = "Appointments allowed only between 09:00–17:00";
      document.getElementById("timeError").style.display = "block";
      valid = false;
    }
  }

  // Success
  if (valid) {
    document.getElementById("successMessage").textContent =
      `✅ Appointment booked successfully for ${name} on ${date} at ${time}`;
    document.getElementById("appointmentForm").reset();
  }
});
