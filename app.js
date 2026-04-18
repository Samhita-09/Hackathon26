const fallbackSymptomCatalog = [
  { id: "fever", label: "Fever", weight: 7 },
  { id: "stiff-neck", label: "Stiff neck", weight: 18 },
  { id: "fatigue", label: "Fatigue", weight: 4 },
  { id: "chest-discomfort", label: "Chest discomfort", weight: 20 },
  { id: "shortness-of-breath", label: "Shortness of breath", weight: 24 },
  { id: "severe-headache", label: "Severe headache", weight: 18 },
  { id: "confusion", label: "Confusion", weight: 22 },
  { id: "dizziness", label: "Dizziness", weight: 10 },
  { id: "vomiting", label: "Vomiting", weight: 9 },
  { id: "abdominal-pain", label: "Abdominal pain", weight: 10 },
  { id: "sore-throat", label: "Sore throat", weight: 3 },
  { id: "cough", label: "Cough", weight: 4 }
];

const dangerRuleTemplates = [
  {
    name: "Possible meningitis pattern",
    triggerLabels: ["fever", "stiff neck"],
    urgencyFloor: 92,
    reason: "Fever + stiff neck can indicate dangerous neurologic infection."
  },
  {
    name: "Possible cardiac complication",
    triggerLabels: ["fatigue", "chest discomfort"],
    urgencyFloor: 86,
    reason: "Fatigue with chest discomfort may indicate serious heart risk."
  },
  {
    name: "Respiratory emergency risk",
    triggerLabels: ["shortness of breath", "chest discomfort"],
    urgencyFloor: 90,
    reason: "Breathing difficulty with chest symptoms can become critical quickly."
  },
  {
    name: "Neurologic red flag",
    triggerLabels: ["severe headache", "confusion"],
    urgencyFloor: 88,
    reason: "Headache with confusion may indicate stroke or severe neurologic event."
  },
  {
    name: "Dehydration and infection risk",
    triggerLabels: ["vomiting", "fever", "dizziness"],
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
const datasetStatus = document.getElementById("dataset-status");
const waiverScreen = document.getElementById("waiver-screen");
const triageScreen = document.getElementById("triage-screen");
const resultsScreen = document.getElementById("results-screen");
const resultSummary = document.getElementById("result-summary");
const dangerFlags = document.getElementById("danger-flags");
const topOption = document.getElementById("top-option");
const backupOptions = document.getElementById("backup-options");
const startOverButton = document.getElementById("start-over-btn");

let symptomCatalog = [...fallbackSymptomCatalog];
let hiddenDangerRules = buildDangerRules(symptomCatalog);
initializeSymptomCatalog();

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

async function initializeSymptomCatalog() {
  const loadedCatalog = await tryLoadCatalogFromProjectFiles();
  if (loadedCatalog) {
    useSymptomCatalog(loadedCatalog.catalog, loadedCatalog.source);
  } else {
    useSymptomCatalog(fallbackSymptomCatalog, "fallback rules");
  }
}

function useSymptomCatalog(nextCatalog, sourceLabel) {
  symptomCatalog = [...nextCatalog].sort((a, b) => b.weight - a.weight);
  hiddenDangerRules = buildDangerRules(symptomCatalog);
  renderSymptoms();
  datasetStatus.textContent = `Symptom source: ${sourceLabel}. Loaded ${symptomCatalog.length} symptoms.`;
}

async function tryLoadCatalogFromProjectFiles() {
  const candidates = [
    "./data/healthcare-symptoms-disease.csv",
    "./data/healthcare_dataset.csv",
    "./data/dataset.csv",
    "./Training.csv",
    "./training.csv"
  ];

  for (const path of candidates) {
    try {
      const response = await fetch(path);
      if (!response.ok) {
        continue;
      }
      const csvText = await response.text();
      const catalog = buildCatalogFromCsv(csvText);
      if (catalog.length >= 8) {
        return { catalog, source: path };
      }
    } catch (error) {
      // Ignore candidate failures and keep trying.
    }
  }
  return null;
}

function buildCatalogFromCsv(csvText) {
  const rows = parseCsv(csvText);
  if (!rows.length) {
    return [];
  }

  const headers = rows[0].map((header) => header.trim());
  const dataRows = rows.slice(1).filter((row) => row.some((value) => value.trim()));
  const symptomScoreMap = new Map();

  const headerIndex = Object.fromEntries(
    headers.map((h, idx) => [normalizeLabel(h), idx])
  );

  const diseaseIdx =
    findHeaderIndex(headers, ["disease", "prognosis", "condition"]) ?? -1;
  const symptomIdx = findHeaderIndex(headers, ["symptom"]);
  const countIdx = findHeaderIndex(headers, ["count", "occurrence", "frequency"]);

  const symptomColumns = headers
    .map((header, idx) => ({ header, idx }))
    .filter(({ header }) => /symptom[\s_]*\d*/i.test(header));

  if (diseaseIdx !== -1 && symptomIdx !== null) {
    for (const row of dataRows) {
      const symptom = cleanSymptomValue(row[symptomIdx]);
      if (!symptom) {
        continue;
      }
      const count = countIdx !== null ? safeNumber(row[countIdx], 1) : 1;
      incrementScore(symptomScoreMap, symptom, count);
    }
  } else if (symptomColumns.length > 0) {
    for (const row of dataRows) {
      for (const column of symptomColumns) {
        const symptom = cleanSymptomValue(row[column.idx]);
        if (symptom) {
          incrementScore(symptomScoreMap, symptom, 1);
        }
      }
    }
  } else if (diseaseIdx !== -1) {
    const oneHotCandidates = headers
      .map((header, idx) => ({ header, idx }))
      .filter(({ idx }) => idx !== diseaseIdx)
      .filter(({ header }) => !["count", "occurrence", "frequency"].includes(normalizeLabel(header)));

    for (const row of dataRows) {
      for (const column of oneHotCandidates) {
        const value = (row[column.idx] || "").trim().toLowerCase();
        if (value === "1" || value === "true" || value === "yes") {
          incrementScore(symptomScoreMap, cleanSymptomValue(column.header), 1);
        }
      }
    }
  } else if (headerIndex.symptom !== undefined) {
    for (const row of dataRows) {
      const symptom = cleanSymptomValue(row[headerIndex.symptom]);
      if (symptom) {
        incrementScore(symptomScoreMap, symptom, 1);
      }
    }
  }

  const maxWeight = Math.max(...Array.from(symptomScoreMap.values()), 1);
  const catalog = Array.from(symptomScoreMap.entries())
    .filter(([label]) => label)
    .map(([label, rawWeight]) => {
      const scaledWeight = Math.round((rawWeight / maxWeight) * 24) + 2;
      return {
        id: slugify(label),
        label: toTitleCase(label),
        weight: scaledWeight
      };
    });

  return dedupeCatalog(catalog);
}

function dedupeCatalog(catalog) {
  const uniqueMap = new Map();
  for (const item of catalog) {
    if (!uniqueMap.has(item.id)) {
      uniqueMap.set(item.id, item);
    }
  }
  return Array.from(uniqueMap.values());
}

function incrementScore(scoreMap, label, amount) {
  const normalized = cleanSymptomValue(label);
  if (!normalized) {
    return;
  }
  const current = scoreMap.get(normalized) || 0;
  scoreMap.set(normalized, current + amount);
}

function findHeaderIndex(headers, tokens) {
  for (let i = 0; i < headers.length; i += 1) {
    const normalized = normalizeLabel(headers[i]);
    if (tokens.some((token) => normalized.includes(token))) {
      return i;
    }
  }
  return null;
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i += 1) {
    const char = text[i];
    const next = text[i + 1];

    if (char === '"') {
      if (inQuotes && next === '"') {
        field += '"';
        i += 1;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === "," && !inQuotes) {
      row.push(field);
      field = "";
    } else if ((char === "\n" || char === "\r") && !inQuotes) {
      if (char === "\r" && next === "\n") {
        i += 1;
      }
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }

  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }

  return rows;
}

function buildDangerRules(catalog) {
  const labelToId = new Map(
    catalog.map((symptom) => [normalizeLabel(symptom.label), symptom.id])
  );
  const aliasToCanonical = {
    "short breath": "shortness of breath",
    "short-breath": "shortness of breath",
    "chest pain": "chest discomfort",
    headache: "severe headache"
  };

  const resolvedRules = [];
  for (const template of dangerRuleTemplates) {
    const triggerIds = [];
    for (const label of template.triggerLabels) {
      const normalized = normalizeLabel(label);
      const canonical = aliasToCanonical[normalized] || normalized;
      const id = labelToId.get(canonical);
      if (id) {
        triggerIds.push(id);
      }
    }
    if (triggerIds.length === template.triggerLabels.length) {
      resolvedRules.push({
        name: template.name,
        trigger: triggerIds,
        urgencyFloor: template.urgencyFloor,
        reason: template.reason
      });
    }
  }
  return resolvedRules;
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

  const symptomMap = new Map(symptomCatalog.map((symptom) => [symptom.id, symptom]));
  for (const symptomId of input.symptoms) {
    const symptom = symptomMap.get(symptomId);
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

function normalizeLabel(value) {
  return (value || "")
    .toLowerCase()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function cleanSymptomValue(value) {
  const normalized = normalizeLabel(value);
  if (!normalized || normalized === "nan" || normalized === "none") {
    return "";
  }
  return normalized;
}

function slugify(value) {
  return normalizeLabel(value).replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

function toTitleCase(value) {
  return value
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function safeNumber(value, fallback) {
  const num = Number(value);
  return Number.isFinite(num) ? num : fallback;
}
