// Next Timing: Generate Text
function generateNextTimingText() {
    // Get time value (assumed to be in HH:MM format; colon will be removed)
    const time = document.getElementById("time").value.replace(":", "");
    
    // For activity: if "Other" is selected, get custom activity from "otherActivity"
    const activitySelect = document.getElementById("activitySelect").value;
    let activity = activitySelect;
    if (activitySelect === "Other") {
        activity = document.getElementById("otherActivity").value;
    }
    
    // For venue: if "Other" is selected, get custom venue from "otherVenue"
    const venueSelect = document.getElementById("venueSelect").value;
    let venue = venueSelect;
    if (venueSelect === "Other") {
        venue = document.getElementById("otherVenue").value;
    }
    
    // For attire: if "Other" is selected, get custom attire from "otherAttire"
    const attireSelect = document.getElementById("attireSelect").value;
    let attire = attireSelect;
    if (attireSelect === "Other") {
        attire = document.getElementById("otherAttire").value;
    }
    
    const remarks = document.getElementById("remarks").value.trim();
    const safetyStoresChecked = document.getElementById("safetyStores").checked;
    
    // Gather all checked "Things to bring" items, excluding the safetyStores checkbox
    let thingsToBring = [];
    document.querySelectorAll(".form-check-input:checked").forEach((checkbox) => {
        if (checkbox.id !== "safetyStores") {
            thingsToBring.push(checkbox.value);
        }
    });
    
    let textOutput = `NEXT TIMING ⏰\nTime: *${time}*\nActivity: ${activity}\nVenue: ${venue}\nAttire: ${attire}`;
    
    if (thingsToBring.length > 0) {
        textOutput += `\nThings to bring: ${thingsToBring.join(", ")}`;
    }
    
    if (safetyStoresChecked) {
        textOutput += `\n\n*Safety Stores*\n• 1× Caged Trolley\n• 1× Bench\n• 1× Table\n• 2× Drinking Cambro\n• 1× Safety Cambro (12 packets of ziplocks)\n• 2× Jerry Can\n• 2× Packet of Cups\n• 1× Trash Bag`;
    }
    
    if (remarks !== "") {
        textOutput += `\nRemarks: ${remarks}`;
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

function toggleOtherActivity() {
  const activitySelect = document.getElementById("activitySelect");
  const otherActivityDiv = document.getElementById("otherActivityDiv");
  otherActivityDiv.style.display = (activitySelect.value === "Other") ? "block" : "none";
}

function toggleOtherVenue() {
  const venueSelect = document.getElementById("venueSelect");
  const otherVenueDiv = document.getElementById("otherVenueDiv");
  otherVenueDiv.style.display = (venueSelect.value === "Other") ? "block" : "none";
}

function toggleOtherAttire() {
  const attireSelect = document.getElementById("attireSelect");
  const otherAttireDiv = document.getElementById("otherAttireDiv");
  otherAttireDiv.style.display = (attireSelect.value === "Other") ? "block" : "none";
}