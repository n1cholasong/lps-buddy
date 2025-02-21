$(document).ready(function () {
    applyTheme();
    if ($("#date").length) {
        initializeDefaults();
    }

    $("#toggleTheme").on("click", function () {
        var currentTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        var newTheme = currentTheme === "dark" ? "light" : "dark";
        $("body").removeClass(currentTheme + "-mode").addClass(newTheme + "-mode");
        localStorage.setItem("theme", newTheme);
        $("#toggleTheme").html(newTheme === "dark"
            ? '<i class="fa-solid fa-sun" style="color: orange;"></i>'
            : '<i class="fa-solid fa-moon" style="color: orange;"></i>');
    });
});

function applyTheme() {
    var savedTheme = localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    $("body").addClass(savedTheme + "-mode");
    $("#toggleTheme").html(savedTheme === "dark"
        ? '<i class="fa-solid fa-sun" style="color: orange;"></i>'
        : '<i class="fa-solid fa-moon" style="color: orange;"></i>');
}

function initializeDefaults() {
    var now = new Date();
    var day = now.getDate().toString().padStart(2, "0");
    var month = (now.getMonth() + 1).toString().padStart(2, "0");
    var year = now.getFullYear().toString().slice(-2);
    $("#date").val(day + month + year);
}

function adjustCounter(currentId, change, max) {
    var current = $("#" + currentId);
    var maxValue = parseInt($("#" + currentId + "Max").val());

    if (!current.length) {
        console.error("Element not found: " + currentId);
        return;
    };

    var value = parseInt(current.val()) || 0;
    value += change;

    maxValue = isNaN(maxValue) ? Infinity : maxValue;
    value = Math.min(Math.max(value, 0), maxValue);

    if (typeof max !== "undefined") {
        value = Math.min(Math.max(value, 0), max);
    } else {
        value = Math.max(value, 0);
    }
    
    current.val(value);
    current.removeClass("is-invalid");

    if (currentId.slice(-3) === "Max") {
        var currentValue = parseInt($("#" + currentId.slice(0, -3)).val())

        if (value == currentValue) {
            $("#" + currentId.slice(0, -3)).removeClass("is-invalid")
        } 
    };
}

function formatTimeWithoutColon(timeStr) {
    return timeStr.replace(":", "");
}

function copyText() {
    var $output = $("#output");
    navigator.clipboard.writeText($output.val())
        .then(function () {
            alert("Copied to clipboard!");
        })
        .catch(function (err) {
            console.error("Copy failed:", err);
        });
}

