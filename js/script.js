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

// Helper: Remove colon from time string (e.g., "17:30" => "1730")
function formatTimeWithoutColon(timeStr) {
  return timeStr.replace(":", "");
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

function copyText() {
  const output = document.getElementById("output");
  if (output) {
    output.select();
    navigator.clipboard.writeText(output.value).then(() => alert("Copied!"));
  }
}
