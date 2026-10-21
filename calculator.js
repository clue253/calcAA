/*
 * Anti-Amyloid Infusion Calculator
 * Calculation Engine
 *
 * PURPOSE:
 * This file performs date calculations using the rules
 * stored in clinical-rules.js.
 *
 * Do NOT place clinical rules directly in this file.
 */

import { CLINICAL_RULES } from "./clinical-rules.js";


/*
 * Add a specified number of days to a date.
 */
export function addDays(date, days) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);

  return result;
}


/*
 * Add a specified number of months to a date.
 *
 * Used for:
 * - CMS registry dates
 * - Amyloid PET dates
 * - ARIA monitoring period
 * - Treatment duration limits
 */
export function addMonths(date, months) {
  const result = new Date(date);
  result.setMonth(result.getMonth() + months);

  return result;
}


/*
 * Calculate the next infusion.
 *
 * IMPORTANT:
 * The next infusion is calculated from the patient's
 * most recent ACTUAL infusion date.
 *
 * This prevents treatment holds or delays from causing
 * incorrect future infusion dates.
 */
export function getNextInfusion(
  drug,
  currentInfusionNumber,
  mostRecentInfusionDate
) {

  const drugRules = CLINICAL_RULES[drug];

  if (!drugRules) {
    throw new Error("Invalid medication selected.");
  }

  const nextInfusionNumber =
    Number(currentInfusionNumber) + 1;

  const nextInfusionDate = addDays(
    mostRecentInfusionDate,
    drugRules.infusionIntervalDays
  );

  return {
    infusionNumber: nextInfusionNumber,
    date: nextInfusionDate
  };
}


/*
 * Determine whether an MRI is required before
 * a particular infusion.
 */
export function requiresMRI(drug, infusionNumber) {

  const drugRules = CLINICAL_RULES[drug];

  if (!drugRules) {
    throw new Error("Invalid medication selected.");
  }

  return drugRules.mriBeforeInfusions.includes(
    Number(infusionNumber)
  );
}
