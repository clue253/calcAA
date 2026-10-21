/*
 * Anti-Amyloid Infusion Calculator
 * Application Controller
 *
 * PURPOSE:
 * Connects the webpage (index.html) to the
 * calculation engine (calculator.js).
 */

import {
  getNextInfusion,
  requiresMRI
} from "./calculator.js";


// =========================================================
// PAGE ELEMENTS
// =========================================================

const drugSelect = document.getElementById("drug");

const treatmentStatusInputs =
  document.querySelectorAll('input[name="treatmentStatus"]');

const startDateInput =
  document.getElementById("startDate");

const existingPatientFields =
  document.getElementById("existingPatientFields");

const currentInfusionInput =
  document.getElementById("currentInfusion");

const lastInfusionDateInput =
  document.getElementById("lastInfusionDate");

const calculateButton =
  document.getElementById("calculateButton");

const resultsSection =
  document.getElementById("results");

const summary =
  document.getElementById("summary");

const timeline =
  document.getElementById("timeline");


// =========================================================
// TREATMENT STATUS
// =========================================================

treatmentStatusInputs.forEach((input) => {

  input.addEventListener("change", () => {

    const treatmentStatus =
      document.querySelector(
        'input[name="treatmentStatus"]:checked'
      ).value;

    if (treatmentStatus === "existing") {

      existingPatientFields.hidden = false;

    } else {

      existingPatientFields.hidden = true;

    }

  });

});


// =========================================================
// DATE FORMATTING
// =========================================================

function formatDate(date) {

  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric"
  });

}


// =========================================================
// CALCULATE BUTTON
// =========================================================

calculateButton.addEventListener("click", () => {

  const drug = drugSelect.value;

  const treatmentStatus =
    document.querySelector(
      'input[name="treatmentStatus"]:checked'
    ).value;

  const treatmentStartDate =
    startDateInput.value;


  // -------------------------------------------------------
  // VALIDATION
  // -------------------------------------------------------

  if (!drug) {

    alert("Please select Leqembi or Kisunla.");
    return;

  }


  if (!treatmentStartDate) {

    alert("Please enter the treatment start date.");
    return;

  }


  // -------------------------------------------------------
  // STARTING TREATMENT
  // -------------------------------------------------------

  if (treatmentStatus === "new") {

    const firstInfusionDate =
      new Date(treatmentStartDate + "T00:00:00");

    summary.innerHTML = `
      <h3>Starting Treatment</h3>

      <p>
        <strong>Infusion #1:</strong>
        ${formatDate(firstInfusionDate)}
      </p>
    `;

    timeline.innerHTML = "";

    resultsSection.hidden = false;

    return;

  }


  // -------------------------------------------------------
  // EXISTING PATIENT
  // -------------------------------------------------------

  const currentInfusion =
    Number(currentInfusionInput.value);

  const lastInfusionDate =
    lastInfusionDateInput.value;


  if (!currentInfusion || currentInfusion < 1) {

    alert(
      "Please enter the patient's most recent infusion number."
    );

    return;

  }


  if (!lastInfusionDate) {

    alert(
      "Please enter the patient's most recent infusion date."
    );

    return;

  }


  const actualLastInfusionDate =
    new Date(lastInfusionDate + "T00:00:00");


  // -------------------------------------------------------
  // CALCULATE NEXT INFUSION
  // -------------------------------------------------------

  const nextInfusion =
    getNextInfusion(
      drug,
      currentInfusion,
      actualLastInfusionDate
    );


  // -------------------------------------------------------
  // CHECK MRI REQUIREMENT
  // -------------------------------------------------------

  const mriRequired =
    requiresMRI(
      drug,
      nextInfusion.infusionNumber
    );


  // -------------------------------------------------------
  // DISPLAY RESULT
  // -------------------------------------------------------

  summary.innerHTML = `

    <h3>Next Infusion</h3>

    <p>
      <strong>
        Infusion #${nextInfusion.infusionNumber}
      </strong>
    </p>

    <p>
      ${formatDate(nextInfusion.date)}
    </p>

    ${
      mriRequired
        ? `
          <p>
            <strong>
              MRI REQUIRED BEFORE THIS INFUSION
            </strong>
          </p>
        `
        : ""
    }

  `;


  timeline.innerHTML = "";

  resultsSection.hidden = false;

});
