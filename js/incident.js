function generateIncidentReport() {
    var incidentSelect = $("#incidentSelect").val() || "Training/Non-Training Related";
    var incident = incidentSelect === "Other" ? $("#otherIncident").val() : incidentSelect;

    function maskNric(val) {
        var n = String(val || "").trim().toUpperCase();
        var validNric = /^[STFG]\d{7}[A-Z]$/; // Singapore NRIC/FIN pattern
        if (!validNric.test(n)) {
            return null; // invalid
        }

        var first = n.charAt(0); // preserve first letter
        var tail = n.slice(-4); // last 4 characters
        return `${first}XXXX${tail}`;
    }

    var rawNric = $("#nric").val() || "";
    var name = $("#name").val() || "";
    var maskedNric = maskNric(rawNric);

    // NRIC validation & form invalidation
    if (!maskedNric && rawNric.trim() !== "") {
        $("#nric").addClass("is-invalid");
        alert("NRIC format invalid. Use S/T/F/G + 7 digits + letter.");
        return;
    } else {
        $("#nric").removeClass("is-invalid");
    }

    var personnelInvolved = rawNric || name
        ? `${maskedNric || "TXXXX123A"}${name ? " " + name : ""}`.trim()
        : "MASKED NRIC RANK & NAME";

    var incidentDateTime = $("#date").val(); // datetime-local input
    var location = $("#location").val() || "";
    var description = $("#description").val();
    var currentStatus = $("#status").val() || "";
    var actions = $("#actions").val() || "";

    var nokInformed = $('input[name="nokInformed"]:checked').val() || ""
    var gsocVerbalReport = $('input[name="gsocVerbalReport"]:checked').val() || ""
    var gsocWrittenReport = $('input[name="gsocWrittenReport"]:checked').val() || ""
    var cdsoInformed = $('input[name="cdsoInformed"]:checked').val() || ""
    var esisInformed = $('input[name="esisInformed"]:checked').val() || ""
    var reportedBy = $("#reportedBy").val() || "RANK & NAME";


    var formattedDateTime = "";
    if (incidentDateTime) {
        var dateObj = new Date(incidentDateTime);
        if (!isNaN(dateObj.getTime())) {
            var dd = String(dateObj.getDate()).padStart(2, '0');
            var mm = String(dateObj.getMonth() + 1).padStart(2, '0');
            var yy = dateObj.getFullYear().toString().slice(-2);
            var hh = String(dateObj.getHours()).padStart(2, '0');
            var min = String(dateObj.getMinutes()).padStart(2, '0');
            formattedDateTime = dd + mm + yy + ' ' + hh + min + 'hrs';
        }
    }
  
    var text = `14th ASCC (FATA) AUTC / AI
    
    1. Nature and Type of Activity: 
    ${incident}
    
    2. Personnel Involved:
    ${personnelInvolved}
    
    3. Date and Time of Incident:
    ${formattedDateTime}
    
    4. Location of Incident:
    ${location}
    
    5. Brief Description of Incident:
    ${description}
    
    6. Current Status:
    ${currentStatus}
    
    7. Follow up actions: \n${actions}
    
    8. NOK Informed: ${nokInformed}

    9. GSOC Verbal Report: ${gsocVerbalReport}

    10. GSOC Written Report: ${gsocWrittenReport}

    11. CDSO Informed: ${cdsoInformed}

    12. ESIS Informed: ${esisInformed}
    
    13. Reported By: ${reportedBy}`;

    $("#output").val(text);
}

function toggleOtherIncident() {
    var incidentSelect = $("#incidentSelect").val();
    $("#otherIncidentDiv").css("display", incidentSelect === "Other" ? "block" : "none");
}
