$(document).ready(function () {
    setCurrentTime();
});

function setCurrentTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const currentTime = `${hours}:${minutes}`;
    $("#time").val(currentTime);
}

function toggleOtherActivity() {
    var activitySelect = $("#activitySelect").val();
    $("#otherActivityDiv").css("display", activitySelect === "Other" ? "block" : "none");
}

function toggleOtherVenue() {
    var venueSelect = $("#venueSelect").val();
    $("#otherVenueDiv").css("display", venueSelect === "Other" ? "block" : "none");
}

function toggleOtherAttire() {
    var attireSelect = $("#attireSelect").val();
    $("#otherAttireDiv").css("display", attireSelect === "Other" ? "block" : "none");
}

function generateNextTimingText() {
    var time = $("#time").val().replace(":", "");

    var activitySelect = $("#activitySelect").val();
    var activity = activitySelect === "Other" ? $("#otherActivity").val() : activitySelect;

    var venueSelect = $("#venueSelect").val();
    var venue = venueSelect === "Other" ? $("#otherVenue").val() : venueSelect;

    var attireSelect = $("#attireSelect").val();
    var attire = attireSelect === "Other" ? $("#otherAttire").val() : attireSelect;

    var remarks = $.trim($("#remarks").val());
    var safetyStoresChecked = $("#safetyStores").prop("checked");

    var thingsToBring = [];
    $(".form-check-input:checked").each(function () {
        if (this.id !== "safetyStores") {
            thingsToBring.push($(this).val());
        }
    });

    var textOutput = "NEXT TIMING ⏰\nTime: *" + time + "*\nActivity: " + activity + "\nVenue: " + venue + "\nAttire: " + attire;

    if (thingsToBring.length > 0) {
        textOutput += "\nThings to bring:\n" + thingsToBring.join(", ");
    }

    if (safetyStoresChecked) {
        textOutput += "\n\n*Safety Stores*\n• 1× Caged Trolley\n• 1× Bench\n• 1× Table\n• 2× Drinking Cambro\n• 1× Safety Cambro (12 packets of ziplocks)\n• 2× Jerry Can\n• 2× Packet of Cups\n• 1× Trash Bag";
    }

    if (remarks !== "") {
        textOutput += `\n\nRemarks: \n${remarks}`;
    }

    document.getElementById("output").value = textOutput;
}