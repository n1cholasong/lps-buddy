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

function copyText() {
  const output = document.getElementById("output");
  if (output) {
    output.select();
    navigator.clipboard.writeText(output.value).then(() => alert("Copied!"));
  }
}
