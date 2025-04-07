function addAppointment() {
    var $container = $("#appointmentsContainer");
    var $appointmentDiv = $("<div></div>")
        .addClass("appointment-entry p-3 border rounded mb-3")
        .html(`
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
      `);
    $container.append($appointmentDiv);
    updateAppointmentIndexes();
}

function updateAppointmentIndexes() {
    $(".appointment-entry").each(function (index) {
        $(this).find(".appointment-index").text(index + 1);
    });
}

function removeAppointment(button) {
    $(button).closest(".appointment-entry").remove();
    updateAppointmentIndexes();
}

function formatAppointmentDate(dateStr) {
    var months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    var parts = dateStr.split("-");
    if (parts.length !== 3) return dateStr;
    var year = parts[0];
    var monthIndex = parseInt(parts[1], 10) - 1;
    var day = parts[2];
    return day + " " + months[monthIndex] + " " + year;
}

function generateText() {
    var date = $("#date").val();
    var course = $('input[name="course"]:checked').val() || "";
    var paradeType = $("#paradeType").val();
    var sctRns = $("#sctRns").val();
    var sctWlr = $("#sctWlr").val();
    var specRns = $("#specRns").val();
    var specWlr = $("#specWlr").val();
    var reportingSick = $("#reportingSick").val();
    var attendB = $("#attendB").val();
    var attendC = $("#attendC").val();
    var bookOut = $("#bookOut").val();
    var bookIn = $("#bookIn").val();
    var outOfCamp = $("#outOfCamp").val();
    var ooc = $("#ooc").val();
    var lightsOut = $("#lightsOut").val();
    var fallIn = $("#fallIn").val();
    var remarks = $("#remarks").val();

    // Format time fields (remove colon)
    var bookOutFormatted = bookOut ? formatTimeWithoutColon(bookOut) : "";
    var bookInFormatted = bookIn ? formatTimeWithoutColon(bookIn) : "";
    var lightsOutFormatted = lightsOut ? formatTimeWithoutColon(lightsOut) : "";
    var fallInFormatted = fallIn ? formatTimeWithoutColon(fallIn) : "";

    var appointmentsText = "";
    $("#appointmentsContainer .appointment-entry").each(function (index) {
        var inputs = $(this).find("input");
        var rankName = $(inputs[0]).val().trim();
        var location = $(inputs[1]).val().trim();
        var dateInput = $(inputs[2]).val().trim();
        var timeInput = $(inputs[3]).val().trim();
        var formattedDate = dateInput ? formatAppointmentDate(dateInput) : "";
        var formattedTime = timeInput ? formatTimeWithoutColon(timeInput) : "";
        if (rankName || location || formattedDate || formattedTime) {
            appointmentsText += "\n" + rankName +
                "\nLocation: " + location +
                "\nDate: " + formattedDate +
                "\nTime: " + formattedTime;
        }
    });

    var text = `Parade State Update 13th ASCC FATA ${course} 📡 
    
${date} *${paradeType}*

Current Strength: 
RnS
SCT: ${sctRns}/14
SPEC: ${specRns}/1

WLR
SCT: ${sctWlr}/16
SPEC: ${specWlr}/1

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

    $("#output").val(text);
}
