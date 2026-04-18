const symptomCatalog = [
  { id: "fever", label: "Fever", weight: 7 },
  { id: "stiff-neck", label: "Stiff neck", weight: 18 },
  { id: "fatigue", label: "Fatigue", weight: 4 },
  { id: "chest-discomfort", label: "Chest discomfort", weight: 20 },
  { id: "short-breath", label: "Shortness of breath", weight: 24 },
  { id: "severe-headache", label: "Severe headache", weight: 18 },
  { id: "confusion", label: "Confusion", weight: 22 },
  { id: "dizziness", label: "Dizziness", weight: 10 },
  { id: "vomiting", label: "Vomiting", weight: 9 },
  { id: "abdominal-pain", label: "Abdominal pain", weight: 10 },
  { id: "sore-throat", label: "Sore throat", weight: 3 },
  { id: "cough", label: "Cough", weight: 4 }
];

const hiddenDangerRules = [
  {
    name: "Possible meningitis pattern",
    trigger: ["fever", "stiff-neck"],
    urgencyFloor: 92,
    reason: "Fever + stiff neck can indicate dangerous neurologic infection."
  },
  {
    name: "Possible cardiac complication",
    trigger: ["fatigue", "chest-discomfort"],
    urgencyFloor: 86,
    reason: "Fatigue with chest discomfort may indicate serious heart risk."
  },
  {
    name: "Respiratory emergency risk",
    trigger: ["short-breath", "chest-discomfort"],
    urgencyFloor: 90,
    reason: "Breathing difficulty with chest symptoms can become critical quickly."
  },
  {
    name: "Neurologic red flag",
    trigger: ["severe-headache", "confusion"],
    urgencyFloor: 88,
    reason: "Headache with confusion may indicate stroke or severe neurologic event."
  },
  {
    name: "Dehydration and infection risk",
    trigger: ["vomiting", "fever", "dizziness"],
    urgencyFloor: 75,
    reason: "Combined symptoms suggest dehydration or escalating infection."
  }
];

const clinics = [
  {
    name: "Community First Free Clinic",
    type: "Free Clinic",
    costLevel: "free",
    waitMinutes: 85,
    distanceMiles: 3.1,
    careLevel: "clinic",
    accepts: ["none", "medicaid", "private"],
    transitFriendly: true
  },
  {
    name: "Riverbend Urgent Care",
    type: "Urgent Care",
    costLevel: "sliding-scale",
    waitMinutes: 40,
    distanceMiles: 6.4,
    careLevel: "urgent-care",
    accepts: ["medicaid", "private"],
    transitFriendly: true
  },
  {
    name: "Metro Public Hospital ER",
    type: "Emergency Room",
    costLevel: "higher",
    waitMinutes: 25,
    distanceMiles: 8.5,
    careLevel: "er",
    accepts: ["none", "medicaid", "private"],
    transitFriendly: false
  },
  {
    name: "Northside Family Health Center",
    type: "FQHC",
    costLevel: "sliding-scale",
    waitMinutes: 60,
    distanceMiles: 4.7,
    careLevel: "clinic",
    accepts: ["none", "medicaid", "private"],
    transitFriendly: true
  }
];

const consentCheckbox = document.getElementById("consent-checkbox");
const startButton = document.getElementById("start-btn");
const triageForm = document.getElementById("triage-form");
const symptomsContainer = document.getElementById("symptoms-options");
const waiverScreen = document.getElementById("waiver-screen");
const triageScreen = document.getElementById("triage-screen");
const resultsScreen = document.getElementById("results-screen");
const resultSummary = document.getElementById("result-summary");
const dangerFlags = document.getElementById("danger-flags");
const topOption = document.getElementById("top-option");
const backupOptions = document.getElementById("backup-options");
const startOverButton = document.getElementById("start-over-btn");

renderSymptoms();

consentCheckbox.addEventListener("change", () => {
  startButton.disabled = !consentCheckbox.checked;
});

startButton.addEventListener("click", () => {
  waiverScreen.classList.add("hidden");
  triageScreen.classList.remove("hidden");
});

triageForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = collectFormData();
  const triage = calculateTriage(formData);
  const rankedOptions = rankCareOptions(triage.recommendedLevel, formData);
  renderResults(triage, rankedOptions);
});

startOverButton.addEventListener("click", () => {
  triageForm.reset();
  resultsScreen.classList.add("hidden");
  triageScreen.classList.remove("hidden");
  consentCheckbox.checked = false;
  startButton.disabled = true;
  waiverScreen.classList.remove("hidden");
  triageScreen.classList.add("hidden");
});

function renderSymptoms() {
  symptomsContainer.innerHTML = "";
  for (const symptom of symptomCatalog) {
    const symptomLabel = document.createElement("label");
    symptomLabel.className = "checkbox-row";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.name = "symptoms";
    checkbox.value = symptom.id;

    const text = document.createElement("span");
    text.textContent = symptom.label;

    symptomLabel.appendChild(checkbox);
    symptomLabel.appendChild(text);
    symptomsContainer.appendChild(symptomLabel);
  }
}

function collectFormData() {
  const selectedSymptoms = Array.from(
    document.querySelectorAll("input[name='symptoms']:checked")
  ).map((el) => el.value);

  return {
    age: Number(document.getElementById("age").value),
    sex: document.getElementById("sex").value,
    zipCode: document.getElementById("zipCode").value,
    incomeBracket: document.getElementById("incomeBracket").value,
    insuranceStatus: document.getElementById("insuranceStatus").value,
    transportAccess: document.getElementById("transportAccess").value,
    duration: document.getElementById("duration").value,
    severity: Number(document.getElementById("severity").value),
    symptomNotes: document.getElementById("symptomNotes").value,
    symptoms: selectedSymptoms
  };
}

function calculateTriage(input) {
  let score = 0;
  let confidence = 35;
  const reasons = [];
  const triggeredDanger = [];

  for (const symptomId of input.symptoms) {
    const symptom = symptomCatalog.find((s) => s.id === symptomId);
    if (symptom) {
      score += symptom.weight;
      confidence += 2;
      reasons.push(`${symptom.label} contributes to risk profile.`);
    }
  }

  score += input.severity * 3;
  reasons.push(`Severity level (${input.severity}/10) increases urgency.`);

  if (input.age < 5 || input.age > 65) {
    score += 8;
    reasons.push("Age group increases complication risk.");
  }

  if (input.duration === "hours") {
    score += 8;
    reasons.push("Rapid symptom onset can indicate acute issue.");
  } else if (input.duration === "over-a-week") {
    score += 5;
    reasons.push("Long symptom duration suggests unresolved condition.");
  }

  for (const rule of hiddenDangerRules) {
    const isTriggered = rule.trigger.every((token) =>
      input.symptoms.includes(token)
    );
    if (isTriggered) {
      triggeredDanger.push(rule);
      if (score < rule.urgencyFloor) {
        score = rule.urgencyFloor;
      }
      confidence += 8;
      reasons.push(rule.reason);
    }
  }

  score = Math.max(0, Math.min(100, score));
  confidence = Math.max(0, Math.min(99, confidence));

  const urgency = getUrgencyBand(score);

  return {
    score,
    confidence,
    urgencyLabel: urgency.label,
    recommendedLevel: urgency.level,
    reasons: reasons.slice(0, 5),
    dangerFlags: triggeredDanger
  };
}

function getUrgencyBand(score) {
  if (score >= 80) {
    return { label: "Emergency: Go to ER now", level: "er", badge: "danger" };
  }
  if (score >= 60) {
    return {
      label: "Urgent: Seek urgent care today",
      level: "urgent-care",
      badge: "warning"
    };
  }
  if (score >= 30) {
    return {
      label: "Moderate: Clinic visit within 24-72 hours",
      level: "clinic",
      badge: "warning"
    };
  }
  return {
    label: "Low: Self-care + monitor symptoms",
    level: "self-care",
    badge: "safe"
  };
}

function rankCareOptions(recommendedLevel, input) {
  const incomeCostWeight = {
    "very-low": 25,
    low: 18,
    moderate: 10,
    higher: 4
  };

  return clinics
    .map((clinic) => {
      let score = 100;

      if (recommendedLevel !== "self-care") {
        if (clinic.careLevel === recommendedLevel) {
          score += 25;
        } else if (
          recommendedLevel === "urgent-care" &&
          clinic.careLevel === "er"
        ) {
          score += 10;
        } else if (recommendedLevel === "er" && clinic.careLevel !== "er") {
          score -= 25;
        } else {
          score -= 8;
        }
      }

      if (
        (input.incomeBracket === "very-low" || input.incomeBracket === "low") &&
        clinic.costLevel === "free"
      ) {
        score += incomeCostWeight[input.incomeBracket];
      } else if (clinic.costLevel === "sliding-scale") {
        score += 12;
      } else if (clinic.costLevel === "higher") {
        score -= 12;
      }

      score -= clinic.waitMinutes / 10;
      score -= clinic.distanceMiles * 1.5;

      if (!clinic.accepts.includes(input.insuranceStatus)) {
        score -= 30;
      }

      if (input.transportAccess !== "yes" && !clinic.transitFriendly) {
        score -= 15;
      }

      return { ...clinic, rankingScore: Number(score.toFixed(1)) };
    })
    .sort((a, b) => b.rankingScore - a.rankingScore);
}

function renderResults(triage, options) {
  triageScreen.classList.add("hidden");
  resultsScreen.classList.remove("hidden");

  const badgeClass =
    triage.score >= 80
      ? "badge badge-danger"
      : triage.score >= 30
      ? "badge badge-warning"
      : "badge badge-safe";

  resultSummary.innerHTML = `
    <div class="result-card">
      <h3>Urgency Score: ${triage.score}/100</h3>
      <p><span class="${badgeClass}">${triage.urgencyLabel}</span></p>
      <p><strong>Confidence:</strong> ${triage.confidence}%</p>
      <p><strong>Why:</strong></p>
      <ul>${triage.reasons.map((r) => `<li>${r}</li>`).join("")}</ul>
    </div>
  `;

  if (triage.dangerFlags.length > 0) {
    dangerFlags.innerHTML = `
      <div class="result-card">
        <h3>Hidden Danger Alerts</h3>
        <ul>
          ${triage.dangerFlags
            .map((flag) => `<li><strong>${flag.name}:</strong> ${flag.reason}</li>`)
            .join("")}
        </ul>
      </div>
    `;
  } else {
    dangerFlags.innerHTML = `
      <div class="result-card">
        <h3>Hidden Danger Alerts</h3>
        <p>No critical symptom combination detected from selected inputs.</p>
      </div>
    `;
  }

  const [best, ...rest] = options;

  topOption.innerHTML = `
    <div class="result-card">
      <h3>Best Option Right Now</h3>
      <p><strong>${best.name}</strong> (${best.type})</p>
      <p>
        Chosen for care-fit, affordability, and speed.
        Wait ~${best.waitMinutes} min, ${best.distanceMiles} miles away.
      </p>
      <p>
        Cost model: ${best.costLevel}. Ranking score: ${best.rankingScore}
      </p>
      <p class="emergency-note">
        If symptoms worsen suddenly, go to the nearest ER immediately.
      </p>
    </div>
  `;

  backupOptions.innerHTML = `
    <div class="result-card">
      <h3>Backup Options</h3>
      <ul>
        ${rest
          .slice(0, 2)
          .map(
            (opt) =>
              `<li>${opt.name} - ${opt.type}, wait ~${opt.waitMinutes} min, score ${opt.rankingScore}</li>`
          )
          .join("")}
      </ul>
    </div>
  `;
}
