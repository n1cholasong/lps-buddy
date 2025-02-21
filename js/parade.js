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
  const specRns = doucment.getElementById("specRns").value;
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

  const text = `Parade State Update 13th ASCC FATA 📡 

${date} *${paradeType}*

Current Strength: 
RnS
SCT: ${sctRns}/14
OCT: ${octRns}/1
SPEC: ${specRns}/1

WLR
SCT: ${sctWlr}/16

Reporting sick: *${reportingSick} pax*

Attend B: *${attendB} pax*

Attend C: *${attendC} pax*

Book out time: ${bookOutFormatted}

Book in time: ${bookInFormatted}

Out of camp: ${outOfCamp}/32

Upcoming appointments: 
${appointmentsText || "None"}

OOC: ${ooc}

Lights out timing: ${lightsOutFormatted}

Fall in timing: ${fallInFormatted}

Remarks: 
${remarks}`;

  document.getElementById("output").value = text;
}
