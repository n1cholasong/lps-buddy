function initializeRoutineDefaults() {
    var today = new Date();
    var tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    var yyyy = tomorrow.getFullYear();
    var mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
    var dd = String(tomorrow.getDate()).padStart(2, "0");
    $("#routineDate").val(yyyy + "-" + mm + "-" + dd);
}

function addRoutine() {
    var $container = $("#customRoutineContainer");
    if ($container.length === 0) {
        console.error("Container with ID 'customRoutineContainer' not found.");
        return;
    }
    var $row = $(`
      <div class="row g-1 mb-2 align-items-center">
        <div class="col-4">
          <input type="time" class="form-control routine-time">
        </div>
        <div class="col-7">
          <input type="text" class="form-control routine-activity" placeholder="Enter activity">
        </div>
        <div class="col-1 ps-1">
          <button class="btn btn-danger h-100 w-100" onclick="removeRoutine(this)">
            <i class="fa-solid fa-trash"></i>
          </button>
        </div>
      </div>
    `);

    $container.append($row);
}

function removeRoutine(button) {
    $(button).closest(".row").remove();
}

function generateRoutineOrders() {
    var dateInput = $("#routineDate").val();
    var dateObj = new Date(dateInput);
    var dd = String(dateObj.getDate()).padStart(2, "0");
    var mm = String(dateObj.getMonth() + 1).padStart(2, "0");
    var yy = dateObj.getFullYear().toString().slice(-2);
    var formattedDate = dd + mm + yy;

    var outputText = `*RO ${formattedDate}*\n\n`;
    var errorFound = false;

    $("#permanentContainer .permanent-row").each(function () {
        var $row = $(this);
        var $timeInput = $row.find("input[type='time']");
        var $activityInput = $row.find("input.readonly-activity");
        $timeInput.removeClass("is-invalid");
        // Only output if a time is entered.
        if ($timeInput.val()) {
            var timeFormatted = $timeInput.val().replace(":", "");
            outputText += timeFormatted + " - " + $activityInput.val() + "\n";
        }
    });

    $("#customRoutineContainer .row").each(function () {
        var $row = $(this);
        var $timeInput = $row.find(".routine-time");
        var $activityInput = $row.find(".routine-activity");
        $timeInput.removeClass("is-invalid");
        $activityInput.removeClass("is-invalid");

        var timeVal = $.trim($timeInput.val());
        var activityVal = $.trim($activityInput.val());

        // Only process if a time is entered

        // If either field is empty, mark it and flag error.
        if (!timeVal) {
            $timeInput.addClass("is-invalid");
            errorFound = true;
        }
        if (!activityVal) {
            $activityInput.addClass("is-invalid");
            errorFound = true;
        }
        if (!errorFound) {
            var timeFormatted = timeVal.replace(":", "");
            outputText += `${timeFormatted} - ${activityVal}\n`;
        }
    });

    if (errorFound) {
        alert("Please fill in both time and activity!");
        return;
    }

    var remarks = $.trim($("#remarks").val());
    if (remarks !== "") {
        outputText += "\nRemarks: \n" + remarks;
    }

    var remarks = $.trim($("#remarks").val());
    if (remarks !== "") {
        outputText += "\nRemarks: \n" + remarks;
    }

    $("#output").val(outputText);
}

