document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  if (document.getElementById("date")) {
    initializeDefaults();
  }
});

// Dark Mode Toggle
const toggleThemeBtn = document.getElementById("toggleTheme");
if (toggleThemeBtn) {
  toggleThemeBtn.addEventListener("click", () => {
    let currentTheme = localStorage.getItem("theme") ||
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    let newTheme = currentTheme === "dark" ? "light" : "dark";
    document.body.classList.remove(currentTheme + "-mode");
    document.body.classList.add(newTheme + "-mode");
    localStorage.setItem("theme", newTheme);
    toggleThemeBtn.innerHTML = newTheme === "dark"
      ? '<i class="fa-solid fa-sun" style="color: orange;"></i>'
      : '<i class="fa-solid fa-moon" style="color: orange;"></i>';
  });
}

function applyTheme() {
  const savedTheme = localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  document.body.classList.add(savedTheme + "-mode");
  if (toggleThemeBtn) {
    toggleThemeBtn.innerHTML = savedTheme === "dark"
      ? '<i class="fa-solid fa-sun" style="color: orange;"></i>'
      : '<i class="fa-solid fa-moon" style="color: orange;"></i>';
  }
}

// Initialize Defaults (e.g., auto-fill date in DDMMYY format)
function initializeDefaults() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const year = now.getFullYear().toString().slice(-2);
  const dateField = document.getElementById("date");
  if (dateField) {
    dateField.value = `${day}${month}${year}`;
  }
}

// Adjust Counter (for -/+ buttons)
function adjustCounter(id, change, max) {
  const input = document.getElementById(id);
  if (!input) return;
  let value = parseInt(input.value) || 0;
  value += change;
  if (typeof max !== 'undefined') {
    value = Math.min(Math.max(value, 0), max);
  } else {
    value = Math.max(value, 0);
  }
  input.value = value;
}

// Next Timing: Toggle "Other" for Activity and Venue
function toggleOtherActivity() {
  const activitySelect = document.getElementById("activitySelect");
  const otherActivityDiv = document.getElementById("otherActivityDiv");
  if (activitySelect && otherActivityDiv) {
    otherActivityDiv.style.display = activitySelect.value === "Other" ? "block" : "none";
  }
}

function toggleOtherVenue() {
  const venueSelect = document.getElementById("venueSelect");
  const otherVenueDiv = document.getElementById("otherVenueDiv");
  if (venueSelect && otherVenueDiv) {
    otherVenueDiv.style.display = venueSelect.value === "Other" ? "block" : "none";
  }
}

// Helper: Remove colon from time string (e.g., "17:30" => "1730")
function formatTimeWithoutColon(timeStr) {
  return timeStr.replace(":", "");
}

// Appointment Handling
let appointmentCount = 0;
function addAppointment() {
  appointmentCount++;
  const container = document.getElementById("appointmentsContainer");
  const div = document.createElement("div");
  div.classList.add("appointment-entry", "mb-3");
  div.innerHTML = `
    <h6>Appointment ${appointmentCount}</h6>
    <label class="form-label">Rank Name:</label>
    <input type="text" class="form-control mt-2" placeholder="Enter rank and name">
    <label class="form-label mt-2">Location:</label>
    <input type="text" class="form-control mt-2" placeholder="Enter location">
    <label class="form-label mt-2">Date:</label>
    <input type="date" class="form-control mt-2" required>
    <label class="form-label mt-2">Time (24hr):</label>
    <input type="time" class="form-control mt-2" required>
    <button class="btn btn-danger btn-sm mt-2" onclick="removeAppointment(this)">Remove</button>
  `;
  container.appendChild(div);
}

function updateAppointmentIndexes() {
    const appointments = document.querySelectorAll(".appointment-entry");
    appointments.forEach((appointment, i) => {
        appointment.querySelector(".appointment-index").innerText = i + 1;
    });
}

function removeAppointment(button) {
    button.closest(".appointment-entry").remove();
    updateAppointmentIndexes();
}

// Helper: Format appointment date from "YYYY-MM-DD" to "DD Month YYYY"
function formatAppointmentDate(dateStr) {
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const parts = dateStr.split("-");
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIndex = parseInt(parts[1], 10) - 1;
  const day = parts[2];
  return `${day} ${months[monthIndex]} ${year}`;
}

// Parade State Update: Generate Text
function generateText() {
  const date = document.getElementById("date").value;
  const paradeType = document.getElementById("paradeType").value;
  const sctRns = document.getElementById("sctRns").value;
  const octRns = document.getElementById("octRns").value;
  const sctWlr = document.getElementById("sctWlr").value;
  const reportingSick = document.getElementById("reportingSick").value;
  const attendB = document.getElementById("attendB").value;
  const attendC = document.getElementById("attendC").value;
  const bookOut = document.getElementById("bookOut").value;
  const bookIn = document.getElementById("bookIn").value;
  const outOfCamp = document.getElementById("outOfCamp").value;
  const ooc = document.getElementById("ooc").value;
  const lightsOut = document.getElementById("lightsOut").value;
  const fallIn = document.getElementById("fallIn").value;
  const remarks = document.getElementById("remarks").value;

  // Format time fields (remove colon)
  const bookOutFormatted = bookOut ? formatTimeWithoutColon(bookOut) : "";
  const bookInFormatted = bookIn ? formatTimeWithoutColon(bookIn) : "";
  const lightsOutFormatted = lightsOut ? formatTimeWithoutColon(lightsOut) : "";
  const fallInFormatted = fallIn ? formatTimeWithoutColon(fallIn) : "";

  let appointmentsText = "";
  document.querySelectorAll("#appointmentsContainer .appointment-entry").forEach((entry, index) => {
    const inputs = entry.querySelectorAll("input");
    const rankName = inputs[0].value.trim();
    const location = inputs[1].value.trim();
    const dateInput = inputs[2].value.trim();
    const timeInput = inputs[3].value.trim();
    const formattedDate = dateInput ? formatAppointmentDate(dateInput) : "";
    const formattedTime = timeInput ? formatTimeWithoutColon(timeInput) : "";
    if (rankName || location || formattedDate || formattedTime) {
      appointmentsText += `\n${rankName}\nLocation: ${location}\nDate: ${formattedDate}\nTime: ${formattedTime}`;
    }
  });

  const text = `Parade State Update 13th ASCC FATA 

${date} *${paradeType}*

Current Strength: 
RnS
SCT: ${sctRns}/14
OCT: ${octRns}/1

WLR
SCT: ${sctWlr}/16

Reporting sick: *${reportingSick} pax*

Attend B: *${attendB} pax*

Attend C: *${attendC} pax*

Book out time: ${bookOutFormatted}

Book in time: ${bookInFormatted}

Out of camp: ${outOfCamp}/30

Upcoming appointments: 
${appointmentsText || "None"}

OOC: ${ooc}

Lights out timing: ${lightsOutFormatted}

Fall in timing: ${fallInFormatted}

Remarks: ${remarks}`;

  document.getElementById("output").value = text;
}

// Ration Report: Generate Text
function generateRationText() {
  const date = document.getElementById("date").value;
  const mealType = document.getElementById("mealType").value;
  const nm = document.getElementById("nm").value;
  const m = document.getElementById("m").value;
  const vi = document.getElementById("vi").value;
  const vc = document.getElementById("vc").value;
  const nmsd = document.getElementById("nmsd").value;
  const remarks = document.getElementById("remarks").value;

  let greeting = "";
  if (mealType === "BREAKFAST") {
    greeting = "Good morning trainers";
  } else if (mealType === "LUNCH") {
    greeting = "Good afternoon trainers";
  } else if (mealType === "DINNER") {
    greeting = "Good evening trainers";
  } else {
    greeting = "Good trainers";
  }

  const text = `${greeting}, this is the ration report for 13th ASCC FATA

*Daily Ration Reporting*
${date} *${mealType}*

ES/IS
*NM* ${nm}/27
*M* ${m}/2
*VI* ${vi}/1
*VC* ${vc}/0
*NMSD* ${nmsd}/1

REMARKS: ${remarks}`;

  document.getElementById("output").value = text;
}

// Next Timing: Generate Text
function generateNextTiming() {
  const timeInput = document.getElementById("time").value;
  const formattedTime = timeInput ? formatTimeWithoutColon(timeInput) : "";

  const activitySelect = document.getElementById("activitySelect");
  let activity = activitySelect ? activitySelect.value : "";
  if (activity === "Other") {
    activity = document.getElementById("otherActivity").value;
  }

  const venueSelect = document.getElementById("venueSelect");
  let venue = venueSelect ? venueSelect.value : "";
  if (venue === "Other") {
    venue = document.getElementById("otherVenue").value;
  }

  const attire = document.getElementById("attire") ? document.getElementById("attire").value : "";

  const things = [];
  if (document.getElementById("bringEp") && document.getElementById("bringEp").checked) things.push("E-PACK");
  if (document.getElementById("bringWater") && document.getElementById("bringWater").checked) things.push("Water Bottle");
  if (document.getElementById("bringThermo") && document.getElementById("bringThermo").checked) things.push("Thermometer");
  if (document.getElementById("bring11B") && document.getElementById("bring11B").checked) things.push("11B");
  if (document.getElementById("bringWatch") && document.getElementById("bringWatch").checked) things.push("Polar Watch");

  const thingsText = things.join(", ");

  const outputText = `NEXT TIMING
Time: *${formattedTime}*
Activity: ${activity}
Venue: ${venue}
Attire: ${attire}

Things to bring:
${thingsText}`;

  document.getElementById("output").value = outputText;
}

function copyText() {
  const output = document.getElementById("output");
  if (output) {
    output.select();
    navigator.clipboard.writeText(output.value).then(() => alert("Copied!"));
  }
}
