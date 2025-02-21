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

Remarks: 
${remarks}`;

  document.getElementById("output").value = text;
}