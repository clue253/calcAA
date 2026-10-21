/*
 * Anti-Amyloid Infusion Calculator
 * Clinical Rules
 *
 * PURPOSE:
 * This file contains the clinical scheduling rules used by the calculator.
 * It should NOT contain date-calculation or webpage-display code.
 *
 * IMPORTANT:
 * Verify these rules against current FDA prescribing information,
 * CMS requirements, and institutional protocols before clinical use.
 *
 * Last reviewed: October 2026
 */

export const CLINICAL_RULES = {

  // =========================================================
  // LEQEMBI (lecanemab)
  // =========================================================
  leqembi: {
    displayName: "Leqembi (lecanemab)",

    // Initial IV treatment is every 2 weeks.
    infusionIntervalDays: 14,

    // Routine surveillance MRI should be obtained
    // before these infusion numbers.
    mriBeforeInfusions: [3, 5, 7, 14],

    // Used by the calculator to highlight the first
    // 6 months of treatment as the early ARIA monitoring period.
    ariaMonitoringMonths: 6,

    // Leqembi has treatment/maintenance considerations
    // beginning after 18 months.
    maintenanceAfterMonths: 18
  },


  // =========================================================
  // KISUNLA (donanemab)
  // =========================================================
  kisunla: {
    displayName: "Kisunla (donanemab)",

    // IV treatment is every 4 weeks.
    infusionIntervalDays: 28,

    // Routine surveillance MRI should be obtained
    // before these infusion numbers.
    mriBeforeInfusions: [2, 3, 4, 7],

    // Used by the calculator to highlight the first
    // 6 months of treatment as the early ARIA monitoring period.
    ariaMonitoringMonths: 6

    // CLINIC PROTOCOL:
    // Kisunla treatment is stopped at 18 months.
    treatmentMaxMonths: 18
  },


  // =========================================================
  // CMS REGISTRY
  // =========================================================
  cmsRegistry: {

    // Registry assessments based on treatment start date.
    assessmentMonths: [0, 6, 12, 18, 24]
  },


  // =========================================================
  // INSTITUTION / CLINIC PET PROTOCOL
  // =========================================================
  amyloidPET: {

    // Amyloid PET scans based on treatment start date.
    //
    // These are clinic/protocol rules and should remain
    // separate from FDA drug-label requirements.
    assessmentMonths: [12, 18]
  }

};
