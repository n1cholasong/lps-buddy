function generateRationText() {
    var date = $("#date").val();
    var mealType = $("#mealType").val();

    var nm = parseInt($("#nm").val()) || 0;
    var m = parseInt($("#m").val()) || 0;
    var vi = parseInt($("#vi").val()) || 0;
    var vc = parseInt($("#vc").val()) || 0;
    var nmsd = parseInt($("#nmsd").val()) || 0;

    var nmMax = parseInt($("#nmMax").val()) || 0;
    var mMax = parseInt($("#mMax").val()) || 0;
    var viMax = parseInt($("#viMax").val()) || 0;
    var vcMax = parseInt($("#vcMax").val()) || 0;
    var nmsdMax = parseInt($("#nmsdMax").val()) || 0;

    var errorFound = false;

    ["nm", "m", "vi", "vc", "nmsd"].forEach(function (id) {
        var currentVal = parseInt($("#" + id).val()) || 0;
        var maxVal = parseInt($("#" + id + "Max").val()) || 0;
        // Toggle the 'is-invalid' class if current exceeds max
        $("#" + id).toggleClass("is-invalid", currentVal > maxVal);
        if (currentVal > maxVal) errorFound = true;
    });

    if (errorFound) {
        alert("One or more counters exceed their maximum allowed values. Please check highlighted fields.");
        return;
    }

    var remarks = $("#remarks").val();

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
*NM* ${nm}/${nmMax}
*M* ${m}/${mMax}
*VI* ${vi}/${viMax}
*VC* ${vc}/${vcMax}
*NMSD* ${nmsd}/${nmsdMax}

Remarks: 
${remarks}`;

    $("#output").val(text);
}

$(document).on("focus", ".form-control", function () {
    $(this).removeClass("is-invalid");
});