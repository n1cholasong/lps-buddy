document.addEventListener("DOMContentLoaded", () => {
  applyTheme();
  setCurrentTime();
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
function addAppointment() {
    const container = document.getElementById("appointmentsContainer");

    const appointmentDiv = document.createElement("div");
    appointmentDiv.classList.add("appointment-entry", "p-3", "border", "rounded", "mb-3");
    appointmentDiv.innerHTML = `
        <div class="d-flex justify-content-between align-items-center">
            <h6 class="mb-2">Appointment <span class="appointment-index"></span></h6>
            <button class="btn btn-danger btn-sm" onclick="removeAppointment(this)">✖</button>
        </div>
        <label class="form-label">Rank Name:</label>
        <input type="text" class="form-control mb-2" placeholder="Enter name">

        <label class="form-label">Location:</label>
        <input type="text" class="form-control mb-2" placeholder="Enter location">

        <label class="form-label">Date:</label>
        <input type="date" class="form-control mb-2">

        <label class="form-label">Time:</label>
        <input type="time" class="form-control">
    `;

    container.appendChild(appointmentDiv);
    updateAppointmentIndexes(); // Fix index numbering
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
    greeting = "morning";
  } 
  if (mealType === "LUNCH") {
    greeting = "afternoon";
  } 
  if (mealType === "DINNER") {
    greeting = "evening";
  }

  const text = `Good ${greeting} trainers, this is the ration report for 13th ASCC FATA

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
function generateNextTimingText() {
    const time = document.getElementById("time").value;
    const activity = document.getElementById("activitySelect").value;
    const venue = document.getElementById("venueSelect").value;
    const attire = document.getElementById("attireSelect").value;
    const remarks = document.getElementById("remarks").value.trim();
    const safetyStoresChecked = document.getElementById("safetyStores").checked;

    let thingsToBring = [];
    document.querySelectorAll(".form-check-input:checked").forEach((checkbox) => {
        if (checkbox.id !== "safetyStores") { // Exclude safety store checkbox
            thingsToBring.push(checkbox.value);
        }
    });

    let textOutput = `NEXT TIMING\nTime: *${time}*\nActivity: ${activity}\nVenue: ${venue}\nAttire: ${attire}`;

    if (thingsToBring.length > 0) {
        textOutput += `\nThings to bring: ${thingsToBring.join(", ")}`;
    }

    if (safetyStoresChecked) {
        textOutput += `\n\n*Safety Stores*\n• 1× Caged Trolley\n• 1× Bench\n• 1× Table\n• 2× Drinking Cambro\n• 1× Safety Cambro (12 packets of ziplocks)\n• 2× Jerry Can\n• 2× Packet of Cups\n• 1× Trash Bag`;
    }

    if (remarks !== "") {
        textOutput += `\n\nRemarks: ${remarks}`;
    }

    document.getElementById("output").value = textOutput;
}

function setCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`; // Format: HHMM (without colon)

    const timeInput = document.getElementById("time"); // Update with your actual time field ID
    if (timeInput) {
        timeInput.value = currentTime;
    }
}

function copyText() {
  const output = document.getElementById("output");
  if (output) {
    output.select();
    navigator.clipboard.writeText(output.value).then(() => alert("Copied!"));
  }
}
