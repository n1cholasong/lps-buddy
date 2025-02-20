// Set default date to tomorrow (for routine orders)
function initializeRoutineDefaults() {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const routineDateField = document.getElementById("routineDate");
  if (routineDateField) {
    routineDateField.value = `${yyyy}-${mm}-${dd}`;
  }
}

// Adds a new custom routine row to the customRoutineContainer.
function addRoutine() {
  const container = document.getElementById("customRoutineContainer");
  if (!container) {
    console.error("Container with ID 'customRoutineContainer' not found.");
    return;
  }
  const row = document.createElement("div");
  row.classList.add("row", "g-1", "mb-2", "align-items-center");
  row.innerHTML = `
    <div class="col-4">
      <input type="time" class="form-control routine-time">
    </div>
    <div class="col-7">
      <input type="text" class="form-control routine-activity" placeholder="Enter activity">
    </div>
    <div class="col-1">
      <button class="btn btn-danger btn-sm" onclick="removeRoutine(this)">
        <i class="fa-solid fa-trash"></i>
      </button>
    </div>
  `;
  container.appendChild(row);
}

// Removes a routine row from the custom container.
function removeRoutine(button) {
  button.closest(".row").remove();
}

// Generates the final routine orders text.
// It processes both permanent rows (in #permanentContainer) and custom rows (in #customRoutineContainer).
// For custom rows, if either the time or activity field is empty (when a time is entered), that input gets highlighted in red and generation is aborted.
function generateRoutineOrders() {
  // Format the date from the routineDate input as DDMMYY.
  const dateInput = document.getElementById("routineDate").value;
  const dateObj = new Date(dateInput);
  const dd = String(dateObj.getDate()).padStart(2, '0');
  const mm = String(dateObj.getMonth() + 1).padStart(2, '0');
  const yy = dateObj.getFullYear().toString().slice(-2);
  const formattedDate = `${dd}${mm}${yy}`;
  
  let outputText = `*RO ${formattedDate}*\n\n`;
  let errorFound = false;
  
  // Process Permanent Rows (predefined routine orders)
  const permanentRows = document.querySelectorAll("#permanentContainer .permanent-row");
  permanentRows.forEach(row => {
    const timeInput = row.querySelector("input[type='time']");
    const activityInput = row.querySelector("input.readonly-activity");
    if (timeInput) {
      timeInput.classList.remove("is-invalid");
    }
    // Only print the row if a time is entered.
    if (timeInput && timeInput.value) {
      const timeFormatted = timeInput.value.replace(":", "");
      outputText += `${timeFormatted} - ${activityInput.value}\n`;
    }
  });
  
  // Process Custom (User-Added) Rows
  const customRows = document.querySelectorAll("#customRoutineContainer .row");
  customRows.forEach(row => {
    const timeInput = row.querySelector(".routine-time");
    const activityInput = row.querySelector(".routine-activity");
    timeInput.classList.remove("is-invalid");
    activityInput.classList.remove("is-invalid");
    
    const timeVal = timeInput.value.trim();
    const activityVal = activityInput.value.trim();
    
    // If either field is empty, mark it and flag error.
    if (!timeVal) {
      timeInput.classList.add("is-invalid");
      errorFound = true;
    }
    if (!activityVal) {
      activityInput.classList.add("is-invalid");
      errorFound = true;
    }
    if (!errorFound) {
      const timeFormatted = timeVal.replace(":", "");
      outputText += `${timeFormatted} - ${activityVal}\n`;
    }
  });
  
  if (errorFound) {
    alert("Please fill in both time and activity!");
    return;
  }

  const remarks = document.getElementById("remarks").value.trim();
  if (remarks !== "") {
    outputText += `\nRemarks: \n${remarks}`;
  }
  
  document.getElementById("output").value = outputText;
}

// Copy the generated text to the clipboard using the Clipboard API.
function copyText() {
  const outputField = document.getElementById("output");
  navigator.clipboard.writeText(outputField.value)
    .then(() => alert("Copied to clipboard!"))
    .catch(err => console.error("Copy failed:", err));
}