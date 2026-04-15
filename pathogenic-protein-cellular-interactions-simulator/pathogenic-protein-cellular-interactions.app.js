const fallbackConfig = {
  protein: {
    key: "abeta42",
    displayName: "Aβ42",
    heroTitle: "Pathogenic Protein Interaction Simulator",
    introName: "Explore a simplified 3D model of Aβ42",
    sequenceHeading: "Aβ42 Sequence Overview",
    sequenceBadge: "Hydrophobic hotspot highlighted",
    sequence: "DAEFRHDSGYEVHHQKLVFFAEDVGSNKGAIIGLMVGGVVIA",
    hotspotRange: [16, 22],
    hotspotLabel: "LVFFA core interface",
    tailRange: [30, 42],
    tailLabel: "C-terminal disordered tail",
    contactMapExplanation:
      "This heatmap compares each residue against every other residue for Aβ42. Darker regions suggest residues that are more likely to sit near one another or contribute to the same interaction surface in this simplified model.",
    speedExplanation:
      "Motion speed in this viewer is illustrative, not physical. Faster drift represents a more dynamically engaged interaction state in the teaching model, while slower motion can suggest partial docking or a more stabilized contact state. It should not be interpreted as a real molecular diffusion or binding rate."
  },
  assemblies: {
    monomer: { label: "Monomeric peptide", lengthFactor: 0.7, aggregation: 0.35, toxicity: 0.4, speed: 0.8, segments: 18 },
    oligomer: { label: "Soluble oligomer", lengthFactor: 1, aggregation: 0.68, toxicity: 0.82, speed: 1, segments: 26 },
    protofibril: { label: "Protofibril", lengthFactor: 1.35, aggregation: 0.92, toxicity: 0.96, speed: 1.15, segments: 34 }
  },
  components: {
    membrane: { label: "Plasma membrane", color: "#7bb6c9", affinity: 0.82, vulnerabilityBoost: 1, densityBoost: 0.25, narrative: "Hydrophobic residues align with the outer leaflet, increasing the chance of membrane thinning, pore-like disruption, and calcium dysregulation." },
    receptor: { label: "Synaptic receptor cluster", color: "#d6864e", affinity: 0.74, vulnerabilityBoost: 0.35, densityBoost: 1, narrative: "The assembly lingers near receptor-rich zones, raising the likelihood of aberrant signaling and receptor trafficking stress." },
    mitochondria: { label: "Mitochondrion", color: "#87a95e", affinity: 0.69, vulnerabilityBoost: 0.7, densityBoost: 0.2, narrative: "Contact favors oxidative stress amplification, outer-membrane perturbation, and energy metabolism collapse in already stressed cells." },
    lysosome: { label: "Lysosome", color: "#b87393", affinity: 0.62, vulnerabilityBoost: 0.55, densityBoost: 0.15, narrative: "Accumulation near degradative compartments can overload clearance pathways and increase the chance of proteostasis failure." },
    tau: { label: "Tau-rich microtubules", color: "#5f88d8", affinity: 0.77, vulnerabilityBoost: 0.5, densityBoost: 0.4, narrative: "The model shifts toward cross-seeding behavior, where protein exposure can increase local instability around tau-associated structures." }
  }
};

const exampleProfiles = {
  abeta42: fallbackConfig,
  alpha_synuclein: {
    protein: {
      key: "alpha_synuclein",
      displayName: "Alpha-synuclein",
      heroTitle: "Pathogenic Protein Interaction Simulator",
      introName: "Explore a simplified 3D model of alpha-synuclein",
      sequenceHeading: "Alpha-synuclein Sequence Overview",
      sequenceBadge: "NAC interaction region highlighted",
      sequence: "MDVFMKGLSKAKEGVVAAAEKTKQGVAEAAGKTKEGVLYVGSKTKEGVVHGVATVAEKTKEQVTNVGGAVVTGVTAVAQKTVEGAGSIAAATGFVKKDQLGKNEEGAPQEGILEDMPVDPDNEAYEMPSEEGYQDYEPEA",
      hotspotRange: [61, 95],
      hotspotLabel: "NAC aggregation-prone core",
      tailRange: [96, 140],
      tailLabel: "Acidic disordered tail",
      contactMapExplanation: "This heatmap compares each alpha-synuclein residue against every other residue. Darker regions suggest sequence segments that may cluster together or contribute to the same interaction surface in this simplified model.",
      speedExplanation: "Motion speed in this viewer is illustrative, not physical. Faster drift reflects a more dynamically engaged interaction state, while slower drift can suggest partial docking or stabilized contact."
    },
    assemblies: {
      monomer: { label: "Monomeric protein", lengthFactor: 0.95, aggregation: 0.28, toxicity: 0.32, speed: 0.82, segments: 24 },
      oligomer: { label: "Soluble oligomer", lengthFactor: 1.18, aggregation: 0.76, toxicity: 0.84, speed: 1.02, segments: 34 },
      protofibril: { label: "Protofibril", lengthFactor: 1.55, aggregation: 0.94, toxicity: 0.95, speed: 1.08, segments: 42 }
    },
    components: {
      membrane: { label: "Plasma membrane", color: "#7bb6c9", affinity: 0.8, vulnerabilityBoost: 0.9, densityBoost: 0.25, narrative: "The model emphasizes membrane association through amphipathic regions, increasing the chance of altered curvature, vesicle stress, and abnormal surface binding." },
      receptor: { label: "Synaptic receptor cluster", color: "#d6864e", affinity: 0.55, vulnerabilityBoost: 0.25, densityBoost: 1, narrative: "The assembly can linger in receptor-rich zones, potentially disrupting synaptic signaling and trafficking in this educational model." },
      mitochondria: { label: "Mitochondrion", color: "#87a95e", affinity: 0.86, vulnerabilityBoost: 0.82, densityBoost: 0.2, narrative: "The model shifts toward mitochondrial stress, with stronger emphasis on oxidative injury, outer-membrane perturbation, and energetic failure." },
      lysosome: { label: "Lysosome", color: "#b87393", affinity: 0.74, vulnerabilityBoost: 0.62, densityBoost: 0.15, narrative: "Aggregation-prone species may burden degradative pathways and increase the chance of proteostasis collapse." },
      tau: { label: "Tau-rich microtubules", color: "#5f88d8", affinity: 0.42, vulnerabilityBoost: 0.2, densityBoost: 0.25, narrative: "Cross-talk with tau is shown as a secondary pathway rather than the dominant interaction route." }
    }
  },
  tau_4r: {
    protein: {
      key: "tau_4r",
      displayName: "Tau 4R repeat region",
      heroTitle: "Pathogenic Protein Interaction Simulator",
      introName: "Explore a simplified 3D model of tau repeat region aggregates",
      sequenceHeading: "Tau Repeat Region Overview",
      sequenceBadge: "Microtubule-binding repeat hotspot highlighted",
      sequence: "VQIINKKLDLSNVQSKCGSKDNIKHVPGGGSVQIVYKPVDLSKVTSKCGSLGNIHHKPGGGQVEVKSEKLDFKDRVQSKIGSLDNITHVPGGGNKKIETHKLTFRENAKAKTDHGAEIVYKSPVVSGDTSPRHLSNVSSTGSIDMVDSPQLATLADEVSASLAKQGL",
      hotspotRange: [8, 40],
      hotspotLabel: "Repeat-region aggregation hotspot",
      tailRange: [141, 174],
      tailLabel: "Flexible regulatory tail",
      contactMapExplanation: "This heatmap compares tau repeat-region residues against one another. Darker regions suggest segments that may form aggregation interfaces or compact interaction surfaces in this simplified model.",
      speedExplanation: "Motion speed in this viewer is illustrative and helps distinguish diffuse, docking, and stabilized interaction states. It is not a measured physical transport rate."
    },
    assemblies: {
      monomer: { label: "Monomeric tau fragment", lengthFactor: 1, aggregation: 0.22, toxicity: 0.24, speed: 0.78, segments: 26 },
      oligomer: { label: "Tau oligomer", lengthFactor: 1.22, aggregation: 0.72, toxicity: 0.81, speed: 0.98, segments: 36 },
      protofibril: { label: "Tau protofibril", lengthFactor: 1.58, aggregation: 0.95, toxicity: 0.93, speed: 1.05, segments: 44 }
    },
    components: {
      membrane: { label: "Plasma membrane", color: "#7bb6c9", affinity: 0.52, vulnerabilityBoost: 0.48, densityBoost: 0.25, narrative: "Membrane engagement is shown as a secondary interaction route rather than the primary destination for this tau-centered model." },
      receptor: { label: "Synaptic receptor cluster", color: "#d6864e", affinity: 0.46, vulnerabilityBoost: 0.22, densityBoost: 1, narrative: "The model allows synaptic disruption but keeps receptor clustering as a secondary effect." },
      mitochondria: { label: "Mitochondrion", color: "#87a95e", affinity: 0.58, vulnerabilityBoost: 0.56, densityBoost: 0.2, narrative: "Mitochondrial stress is present as a downstream consequence, especially in more toxic oligomeric states." },
      lysosome: { label: "Lysosome", color: "#b87393", affinity: 0.68, vulnerabilityBoost: 0.55, densityBoost: 0.15, narrative: "Clearance overload is highlighted because persistent tau assemblies can accumulate when degradative pathways are strained." },
      tau: { label: "Tau-rich microtubules", color: "#5f88d8", affinity: 0.9, vulnerabilityBoost: 0.85, densityBoost: 0.5, narrative: "This model centers on self-association near tau-rich microtubule structures, emphasizing repeat-mediated packing and cytoskeletal destabilization." }
    }
  }
};

function deepClone(value) {
  return JSON.parse(JSON.stringify(value));
}

function mergeConfig(base, override) {
  if (!override) {
    return deepClone(base);
  }

  const merged = deepClone(base);
  for (const key of Object.keys(override)) {
    const baseValue = merged[key];
    const overrideValue = override[key];
    if (baseValue && overrideValue && typeof baseValue === "object" && typeof overrideValue === "object" && !Array.isArray(baseValue) && !Array.isArray(overrideValue)) {
      merged[key] = { ...baseValue, ...overrideValue };
      if (key === "assemblies" || key === "components") {
        for (const nestedKey of Object.keys(overrideValue)) {
          merged[key][nestedKey] = { ...(baseValue[nestedKey] || {}), ...overrideValue[nestedKey] };
        }
      }
    } else {
      merged[key] = overrideValue;
    }
  }
  return merged;
}

function configFromTemplate(template) {
  if (!template || !template.protein_request) {
    return null;
  }

  return {
    protein: {
      key: template.protein_request.protein_key || "custom_protein",
      displayName: template.protein_request.display_name || template.protein_request.protein_common_name || "Custom protein",
      heroTitle: template.protein_request.hero_title || "Pathogenic Protein Interaction Simulator",
      introName: template.protein_request.intro_name || "Explore a simplified 3D model of a custom pathogenic protein",
      sequenceHeading: template.protein_request.sequence_heading || "Sequence Overview",
      sequenceBadge: template.protein_request.sequence_badge || "Interaction hotspot highlighted",
      sequence: template.protein_request.sequence || fallbackConfig.protein.sequence,
      hotspotRange: template.protein_request.hotspot_range || fallbackConfig.protein.hotspotRange,
      hotspotLabel: template.protein_request.hotspot_label || "Interaction hotspot",
      tailRange: template.protein_request.tail_range || fallbackConfig.protein.tailRange,
      tailLabel: template.protein_request.tail_label || "Flexible tail",
      contactMapExplanation: template.protein_request.contact_map_explanation || fallbackConfig.protein.contactMapExplanation,
      speedExplanation: template.protein_request.speed_explanation || fallbackConfig.protein.speedExplanation
    },
    assemblies: template.assembly_preferences || fallbackConfig.assemblies,
    components: template.component_overrides || fallbackConfig.components
  };
}

function normalizeImportedConfig(data) {
  if (data && data.protein && data.assemblies && data.components) {
    return data;
  }
  if (data && data.protein_request) {
    return configFromTemplate(data);
  }
  throw new Error("Unsupported JSON format. Upload either a simulator config JSON or a completed AI template JSON.");
}

let config = mergeConfig(fallbackConfig, window.PROTEIN_SIM_CONFIG);
let protein = config.protein;
let sequence = protein.sequence;
let hotspotRange = protein.hotspotRange;
let tailRange = protein.tailRange;
let assemblyProfiles = config.assemblies;
let componentProfiles = config.components;

const defaults = { assembly: "oligomer", component: "membrane", pathogenicity: 68, stress: 54, vulnerability: 62, density: 48, showRGroups: true };
const state = { ...defaults };

const refs = {
  appTitle: document.getElementById("appTitle"),
  introProteinName: document.getElementById("introProteinName"),
  sequenceHeading: document.getElementById("sequenceHeading"),
  sequenceBadge: document.getElementById("sequenceBadge"),
  sequenceScale: document.getElementById("sequenceScale"),
  sequenceTrack: document.getElementById("sequenceTrack"),
  mapExplainer: document.getElementById("mapExplainer"),
  speedNote: document.getElementById("speedNote"),
  exampleSelect: document.getElementById("exampleSelect"),
  loadExampleBtn: document.getElementById("loadExampleBtn"),
  configUpload: document.getElementById("configUpload"),
  importStatus: document.getElementById("importStatus"),
  assemblySelect: document.getElementById("assemblySelect"),
  componentSelect: document.getElementById("componentSelect"),
  pathogenicityRange: document.getElementById("pathogenicityRange"),
  stressRange: document.getElementById("stressRange"),
  vulnerabilityRange: document.getElementById("vulnerabilityRange"),
  densityRange: document.getElementById("densityRange"),
  pathogenicityValue: document.getElementById("pathogenicityValue"),
  stressValue: document.getElementById("stressValue"),
  vulnerabilityValue: document.getElementById("vulnerabilityValue"),
  densityValue: document.getElementById("densityValue"),
  resetBtn: document.getElementById("resetBtn"),
  summaryStack: document.getElementById("summaryStack"),
  narrativeText: document.getElementById("narrativeText"),
  timeline: document.getElementById("timeline"),
  annotationGrid: document.getElementById("annotationGrid"),
  contactMap: document.getElementById("contactMap"),
  viewer3d: document.getElementById("viewer3d"),
  viewerCaption: document.querySelector(".viewer-caption"),
  rGroupToggle: document.getElementById("rGroupToggle")
};

const sidechainProfiles = {
  A: { atoms: 1, length: 0.32, spread: 0.08, color: "#d8b56b" },
  C: { atoms: 1, length: 0.35, spread: 0.1, color: "#d6c773" },
  D: { atoms: 2, length: 0.48, spread: 0.18, color: "#c86862" },
  E: { atoms: 3, length: 0.56, spread: 0.18, color: "#c86862" },
  F: { atoms: 3, length: 0.52, spread: 0.16, color: "#8d6ac8" },
  G: { atoms: 0, length: 0, spread: 0, color: "#d9e2e7" },
  H: { atoms: 3, length: 0.48, spread: 0.16, color: "#6a8fd1" },
  I: { atoms: 2, length: 0.48, spread: 0.2, color: "#c89d58" },
  K: { atoms: 4, length: 0.66, spread: 0.15, color: "#52aa86" },
  L: { atoms: 2, length: 0.5, spread: 0.18, color: "#c89d58" },
  M: { atoms: 3, length: 0.54, spread: 0.14, color: "#bea267" },
  N: { atoms: 2, length: 0.46, spread: 0.15, color: "#5ca8c4" },
  P: { atoms: 2, length: 0.38, spread: 0.2, color: "#9d8f65" },
  Q: { atoms: 3, length: 0.54, spread: 0.16, color: "#5ca8c4" },
  R: { atoms: 4, length: 0.72, spread: 0.16, color: "#3f9a73" },
  S: { atoms: 1, length: 0.34, spread: 0.12, color: "#63adc7" },
  T: { atoms: 2, length: 0.4, spread: 0.16, color: "#63adc7" },
  V: { atoms: 2, length: 0.4, spread: 0.22, color: "#d0a35d" },
  W: { atoms: 4, length: 0.6, spread: 0.14, color: "#725ab1" },
  Y: { atoms: 3, length: 0.54, spread: 0.16, color: "#8670c1" },
  X: { atoms: 2, length: 0.44, spread: 0.16, color: "#8ca4b0" }
};

const mapCtx = refs.contactMap.getContext("2d");
let viewerCanvas;
let viewerCtx;
let frameId;
let dragState = null;
let yaw = 0.45;
let pitch = -0.2;
let roll = 0;

function setImportStatus(message, isError = false) {
  refs.importStatus.textContent = message;
  refs.importStatus.style.color = isError ? "#8f2d18" : "#073c51";
}

function normalizeAngle(angle) {
  const fullTurn = Math.PI * 2;
  if (!Number.isFinite(angle)) {
    return 0;
  }
  angle %= fullTurn;
  if (angle > Math.PI) {
    angle -= fullTurn;
  } else if (angle < -Math.PI) {
    angle += fullTurn;
  }
  return angle;
}

function applyProteinContent() {
  refs.appTitle.textContent = protein.heroTitle;
  refs.introProteinName.textContent = protein.introName;
  refs.sequenceHeading.textContent = protein.sequenceHeading;
  refs.sequenceBadge.textContent = protein.sequenceBadge;
  refs.mapExplainer.textContent = protein.contactMapExplanation;
  refs.speedNote.textContent = protein.speedExplanation;
}

function updateViewerCaption() {
  if (!refs.viewerCaption) {
    return;
  }
  refs.viewerCaption.textContent = state.showRGroups
    ? "Blue to amber shading marks increasing disorder and exposure. The highlighted target object changes with the selected cellular component, and the ball-and-stick sidechains approximate amino-acid R-groups."
    : "Blue to amber shading marks increasing disorder and exposure. The highlighted target object changes with the selected cellular component. Turn R-groups back on to see approximate ball-and-stick sidechains.";
}

function renderSequenceScale() {
  refs.sequenceScale.innerHTML = "";
  const markers = [1];
  const interval = Math.max(10, Math.round(sequence.length / 4 / 5) * 5 || 10);
  for (let marker = interval; marker < sequence.length; marker += interval) {
    markers.push(marker);
  }
  if (!markers.includes(sequence.length)) {
    markers.push(sequence.length);
  }
  markers.forEach((marker) => {
    const span = document.createElement("span");
    span.textContent = marker;
    refs.sequenceScale.appendChild(span);
  });
}

function renderSequence() {
  renderSequenceScale();
  refs.sequenceTrack.innerHTML = "";
  refs.sequenceTrack.style.gridTemplateColumns = `repeat(${sequence.length}, minmax(0, 1fr))`;
  [...sequence].forEach((residue, index) => {
    const position = index + 1;
    const cell = document.createElement("span");
    cell.className = "residue";
    if (position >= hotspotRange[0] && position <= hotspotRange[1]) {
      cell.classList.add("hot");
    }
    if (position >= tailRange[0]) {
      cell.classList.add("tail");
    }
    cell.textContent = residue;
    cell.title = `${protein.displayName} residue ${position}: ${residue}`;
    refs.sequenceTrack.appendChild(cell);
  });
}

function getModelMetrics() {
  const assembly = assemblyProfiles[state.assembly];
  const component = componentProfiles[state.component];
  const exposure = assembly.aggregation * 36 + state.pathogenicity * 0.28 + state.stress * 0.18 + state.vulnerability * 0.12;
  const binding = component.affinity * 42 + state.pathogenicity * 0.22 + state.density * 0.18 * component.densityBoost + state.vulnerability * 0.14 * component.vulnerabilityBoost;
  const disruption = assembly.toxicity * 38 + state.stress * 0.28 + state.vulnerability * 0.24 + binding * 0.16;
  const confidence = 92 - state.pathogenicity * 0.12 + assembly.aggregation * 8 - state.stress * 0.08;
  return {
    exposure: Math.min(99, Math.round(exposure)),
    binding: Math.min(99, Math.round(binding)),
    disruption: Math.min(99, Math.round(disruption)),
    confidence: Math.max(44, Math.min(96, Math.round(confidence)))
  };
}

function renderSummary(metrics) {
  const component = componentProfiles[state.component];
  const assembly = assemblyProfiles[state.assembly];
  refs.summaryStack.innerHTML = `
    <article class="summary-card"><span class="metric-label">Protein</span><span class="metric-value">${protein.displayName}</span></article>
    <article class="summary-card"><span class="metric-label">Assembly State</span><span class="metric-value">${assembly.label}</span></article>
    <article class="summary-card"><span class="metric-label">Target</span><span class="metric-value">${component.label}</span></article>
    <article class="summary-card"><span class="metric-label">Surface Exposure</span><span class="metric-value emphasis">${metrics.exposure}%</span></article>
    <article class="summary-card"><span class="metric-label">Predicted Binding Likelihood</span><span class="metric-value emphasis">${metrics.binding}%</span></article>
    <article class="summary-card"><span class="metric-label">Cellular Disruption Index</span><span class="metric-value emphasis">${metrics.disruption}%</span></article>
  `;
}

function renderNarrative(metrics) {
  const component = componentProfiles[state.component];
  const assembly = assemblyProfiles[state.assembly];
  const severity = metrics.disruption >= 80 ? "high-risk interaction regime" : metrics.disruption >= 60 ? "moderate-risk interaction regime" : "lower-risk interaction regime";
  refs.narrativeText.textContent = `${protein.displayName} in a ${assembly.label.toLowerCase()} state currently trends toward a ${severity}. ${component.narrative} Estimated binding is ${metrics.binding}% with ${metrics.exposure}% interface exposure.`;
}

function renderTimeline(metrics) {
  const component = componentProfiles[state.component];
  const events = [
    { title: "Approach", body: `The ${protein.displayName} ${assemblyProfiles[state.assembly].label.toLowerCase()} drifts toward the ${component.label.toLowerCase()} as pathogenicity and crowding raise collision frequency.` },
    { title: "Docking", body: `Binding likelihood reaches ${metrics.binding}%, driven by exposed sequence features and the current ${state.component === "receptor" ? "receptor density" : "cell stress"} setting.` },
    { title: "Cellular Response", body: metrics.disruption > 75 ? `The simulator predicts a strong downstream disturbance signal for ${protein.displayName}, with elevated odds of organelle or membrane dysfunction.` : `The simulator predicts a partial response, where transient ${protein.displayName} contact may still prime later dysfunction if the local environment worsens.` }
  ];
  refs.timeline.innerHTML = events.map((event) => `<article class="timeline-card"><strong>${event.title}</strong><p>${event.body}</p></article>`).join("");
}

function renderAnnotations(metrics) {
  const component = componentProfiles[state.component];
  const cards = [
    { kicker: "Residue Cluster", title: protein.hotspotLabel, body: `Residues ${hotspotRange[0]}-${hotspotRange[1]} are highlighted as the main interaction patch, and their prominence increases with the current ${metrics.exposure}% exposure score.` },
    { kicker: "Flexible Region", title: protein.tailLabel, body: `Residues ${tailRange[0]}-${tailRange[1]} are rendered as the most mobile segment, matching the lower-confidence, higher-contact edge of the ${protein.displayName} model.` },
    { kicker: "Cell Target", title: component.label, body: `${component.narrative} In this state, the simulator estimates a ${metrics.binding}% likelihood of persistent contact.` }
  ];
  refs.annotationGrid.innerHTML = cards.map((card) => `<article class="annotation-card"><span class="annotation-kicker">${card.kicker}</span><h3>${card.title}</h3><p>${card.body}</p></article>`).join("");
}

function drawContactMap(metrics) {
  const size = refs.contactMap.width;
  const count = sequence.length;
  const cell = size / count;
  mapCtx.clearRect(0, 0, size, size);
  const assembly = assemblyProfiles[state.assembly];
  const component = componentProfiles[state.component];
  for (let y = 0; y < count; y += 1) {
    for (let x = 0; x < count; x += 1) {
      const distance = Math.abs(x - y);
      const hotspotBoost = x >= hotspotRange[0] - 1 && x <= hotspotRange[1] - 1 && y >= hotspotRange[0] - 1 && y <= hotspotRange[1] - 1 ? 0.28 : 0;
      const tailBoost = x >= tailRange[0] - 1 || y >= tailRange[0] - 1 ? 0.12 : 0;
      const diagonal = Math.max(0, 1 - distance / 10);
      const exposure = metrics.exposure / 100;
      const value = Math.min(1, diagonal * 0.36 + assembly.aggregation * 0.24 + component.affinity * 0.18 + exposure * 0.16 + hotspotBoost + tailBoost);
      const hue = 145 - value * 28;
      const sat = 30 + value * 38;
      const light = 92 - value * 52;
      mapCtx.fillStyle = `hsl(${hue} ${sat}% ${light}%)`;
      mapCtx.fillRect(x * cell, y * cell, cell + 1, cell + 1);
    }
  }
  mapCtx.strokeStyle = "rgba(18, 33, 39, 0.12)";
  mapCtx.lineWidth = 2;
  mapCtx.beginPath();
  mapCtx.moveTo(0, 0);
  mapCtx.lineTo(size, size);
  mapCtx.stroke();
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return { r: (value >> 16) & 255, g: (value >> 8) & 255, b: value & 255 };
}

function mixColor(a, b, t) {
  const colorA = hexToRgb(a);
  const colorB = hexToRgb(b);
  return `rgb(${Math.round(lerp(colorA.r, colorB.r, t))} ${Math.round(lerp(colorA.g, colorB.g, t))} ${Math.round(lerp(colorA.b, colorB.b, t))})`;
}

function addVector(a, b) {
  return { x: a.x + b.x, y: a.y + b.y, z: a.z + b.z };
}

function subtractVector(a, b) {
  return { x: a.x - b.x, y: a.y - b.y, z: a.z - b.z };
}

function scaleVector(vector, factor) {
  return { x: vector.x * factor, y: vector.y * factor, z: vector.z * factor };
}

function normalizeVector(vector) {
  const length = Math.hypot(vector.x, vector.y, vector.z) || 1;
  return { x: vector.x / length, y: vector.y / length, z: vector.z / length };
}

function crossVector(a, b) {
  return {
    x: a.y * b.z - a.z * b.y,
    y: a.z * b.x - a.x * b.z,
    z: a.x * b.y - a.y * b.x
  };
}

function getSidechainProfile(residue) {
  return sidechainProfiles[residue] || sidechainProfiles.X;
}

function generateProteinGeometry(time) {
  const assembly = assemblyProfiles[state.assembly];
  const metrics = getModelMetrics();
  const startY = -assembly.lengthFactor * 3.4;
  const drift = 0.6 + metrics.binding / 180;
  const points = [];
  for (let index = 0; index < assembly.segments; index += 1) {
    const t = index / Math.max(1, assembly.segments - 1);
    points.push({
      x: Math.sin(index * 0.56 + time * 0.8) * 0.82 * assembly.lengthFactor + Math.sin(time * 0.65) * drift,
      y: startY + index * 0.34 * assembly.lengthFactor + Math.sin(time + t * 6) * 0.06,
      z: Math.cos(index * 0.42 + time * 0.45) * 0.68 + Math.sin(t * 8 + time) * 0.04,
      radius: 0.18 + Math.sin(t * Math.PI) * 0.17,
      color: mixColor("#1f57bb", "#d69b2d", t)
    });
  }
  return points;
}

function buildRGroupGeometry(backbonePoints, time) {
  if (!state.showRGroups) {
    return { atoms: [], bonds: [] };
  }

  const atoms = [];
  const bonds = [];

  backbonePoints.forEach((point, index) => {
    const residueIndex = Math.round((index / Math.max(1, backbonePoints.length - 1)) * (sequence.length - 1));
    const residue = sequence[residueIndex] || "X";
    const profile = getSidechainProfile(residue);

    if (!profile.atoms) {
      return;
    }

    const previous = backbonePoints[Math.max(0, index - 1)];
    const next = backbonePoints[Math.min(backbonePoints.length - 1, index + 1)];
    const tangent = normalizeVector(subtractVector(next, previous));
    const helperAxis = Math.abs(tangent.y) > 0.82 ? { x: 1, y: 0, z: 0 } : { x: 0, y: 1, z: 0 };
    let normal = normalizeVector(crossVector(tangent, helperAxis));

    if (!Number.isFinite(normal.x) || !Number.isFinite(normal.y) || !Number.isFinite(normal.z)) {
      normal = { x: 1, y: 0, z: 0 };
    }

    const binormal = normalizeVector(crossVector(tangent, normal));
    let previousAtomPoint = point;

    for (let atomIndex = 0; atomIndex < profile.atoms; atomIndex += 1) {
      const direction = normalizeVector(
        addVector(
          scaleVector(normal, index % 2 === 0 ? 1 : -1),
          scaleVector(
            binormal,
            (atomIndex - (profile.atoms - 1) / 2) * profile.spread +
              Math.sin(time * 0.9 + index * 0.55 + atomIndex) * 0.12
          )
        )
      );

      const distance = 0.46 + (profile.length * (atomIndex + 1)) / Math.max(1, profile.atoms);
      const wobble = addVector(
        scaleVector(binormal, Math.sin(time + index * 0.4 + atomIndex) * profile.spread * 0.18),
        scaleVector(normal, Math.cos(time * 0.7 + index + atomIndex) * 0.05)
      );
      const atomPoint = addVector(point, addVector(scaleVector(direction, distance), wobble));
      const atom = {
        x: atomPoint.x,
        y: atomPoint.y,
        z: atomPoint.z,
        radius: 0.08 + (profile.atoms - atomIndex) * 0.016,
        color: profile.color
      };

      atoms.push(atom);
      bonds.push({
        start: previousAtomPoint,
        end: atomPoint,
        color: profile.color
      });
      previousAtomPoint = atomPoint;
    }
  });

  return { atoms, bonds };
}

function rotatePoint(point, localYaw, localPitch) {
  const cosY = Math.cos(localYaw);
  const sinY = Math.sin(localYaw);
  const cosP = Math.cos(localPitch);
  const sinP = Math.sin(localPitch);
  const xzX = point.x * cosY - point.z * sinY;
  const xzZ = point.x * sinY + point.z * cosY;
  const pitched = {
    x: xzX,
    y: point.y * cosP - xzZ * sinP,
    z: point.y * sinP + xzZ * cosP
  };
  const cosR = Math.cos(roll);
  const sinR = Math.sin(roll);
  return {
    x: pitched.x * cosR - pitched.y * sinR,
    y: pitched.x * sinR + pitched.y * cosR,
    z: pitched.z
  };
}

function projectPoint(point, width, height) {
  const cameraDistance = 9.5;
  const perspective = 300 / (cameraDistance - point.z);
  return {
    x: width / 2 + point.x * perspective,
    y: height / 2 + point.y * perspective,
    depth: point.z,
    scale: perspective / 120
  };
}

function residueToSegmentIndex(residuePosition, segmentCount) {
  if (segmentCount <= 1 || sequence.length <= 1) {
    return 0;
  }
  const normalized = (clamp(residuePosition, 1, sequence.length) - 1) / (sequence.length - 1);
  return Math.max(0, Math.min(segmentCount - 1, Math.round(normalized * (segmentCount - 1))));
}

function initViewer() {
  viewerCanvas = document.createElement("canvas");
  refs.viewer3d.innerHTML = "";
  refs.viewer3d.appendChild(viewerCanvas);
  viewerCtx = viewerCanvas.getContext("2d");
  resizeViewer();
  window.addEventListener("resize", resizeViewer);
  viewerCanvas.addEventListener("pointerdown", (event) => {
    dragState = {
      x: event.clientX,
      y: event.clientY,
      mode: event.shiftKey ? "roll" : "orbit"
    };
    viewerCanvas.setPointerCapture(event.pointerId);
  });
  viewerCanvas.addEventListener("pointermove", (event) => {
    if (!dragState) {
      return;
    }
    const dx = event.clientX - dragState.x;
    const dy = event.clientY - dragState.y;

    if (dragState.mode === "roll") {
      roll = normalizeAngle(roll + (dx + dy) * 0.008);
    } else {
      yaw = normalizeAngle(yaw + dx * 0.01);
      pitch = normalizeAngle(pitch + dy * 0.008);
    }

    dragState = {
      x: event.clientX,
      y: event.clientY,
      mode: event.shiftKey ? "roll" : dragState.mode
    };
  });
  viewerCanvas.addEventListener("pointerup", () => {
    dragState = null;
  });
  viewerCanvas.addEventListener("pointerleave", () => {
    dragState = null;
  });
  viewerCanvas.addEventListener("pointercancel", () => {
    dragState = null;
  });
}

function resizeViewer() {
  if (!viewerCanvas) {
    return;
  }
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  const width = refs.viewer3d.clientWidth;
  const height = refs.viewer3d.clientHeight;
  viewerCanvas.width = Math.max(10, Math.round(width * ratio));
  viewerCanvas.height = Math.max(10, Math.round(height * ratio));
  viewerCanvas.style.width = `${width}px`;
  viewerCanvas.style.height = `${height}px`;
  viewerCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function drawBackground(width, height) {
  const gradient = viewerCtx.createRadialGradient(width * 0.26, height * 0.16, 18, width * 0.52, height * 0.68, height * 0.92);
  gradient.addColorStop(0, "rgba(255,255,255,0.95)");
  gradient.addColorStop(0.55, "rgba(234,243,242,0.96)");
  gradient.addColorStop(1, "rgba(206,223,225,0.98)");
  viewerCtx.fillStyle = gradient;
  viewerCtx.fillRect(0, 0, width, height);

  const floorGlow = viewerCtx.createRadialGradient(width * 0.5, height * 0.8, 30, width * 0.5, height * 0.88, width * 0.38);
  floorGlow.addColorStop(0, "rgba(124, 180, 190, 0.16)");
  floorGlow.addColorStop(1, "rgba(124, 180, 190, 0)");
  viewerCtx.fillStyle = floorGlow;
  viewerCtx.fillRect(0, height * 0.52, width, height * 0.48);

  viewerCtx.save();
  viewerCtx.strokeStyle = "rgba(86, 118, 126, 0.08)";
  viewerCtx.lineWidth = 1;
  for (let index = 1; index <= 5; index += 1) {
    const y = height * (0.18 + index * 0.11);
    viewerCtx.beginPath();
    viewerCtx.moveTo(width * 0.08, y);
    viewerCtx.lineTo(width * 0.92, y);
    viewerCtx.stroke();
  }
  viewerCtx.restore();
}

function drawChainPath(points) {
  viewerCtx.beginPath();
  viewerCtx.moveTo(points[0].x, points[0].y);
  for (let index = 1; index < points.length - 1; index += 1) {
    const current = points[index];
    const next = points[index + 1];
    viewerCtx.quadraticCurveTo(current.x, current.y, (current.x + next.x) / 2, (current.y + next.y) / 2);
  }
}

function drawPhospholipidBilayer(centerX, centerY, width, time) {
  const halfWidth = width / 2;
  const headSpacing = 26;
  const headRadius = 8.5;
  const topY = centerY - 18;
  const bottomY = centerY + 18;
  const tailTopY = centerY - 7;
  const tailBottomY = centerY + 7;

  const coreGradient = viewerCtx.createLinearGradient(centerX, centerY - 26, centerX, centerY + 26);
  coreGradient.addColorStop(0, "rgba(173, 219, 234, 0.45)");
  coreGradient.addColorStop(0.28, "rgba(90, 152, 176, 0.9)");
  coreGradient.addColorStop(0.5, "rgba(56, 108, 126, 0.96)");
  coreGradient.addColorStop(0.72, "rgba(90, 152, 176, 0.9)");
  coreGradient.addColorStop(1, "rgba(173, 219, 234, 0.45)");

  viewerCtx.save();
  viewerCtx.fillStyle = coreGradient;
  viewerCtx.strokeStyle = "rgba(56, 108, 126, 0.82)";
  viewerCtx.lineWidth = 2;
  viewerCtx.beginPath();
  viewerCtx.roundRect(centerX - halfWidth, centerY - 27, width, 54, 24);
  viewerCtx.fill();
  viewerCtx.stroke();

  for (let x = centerX - halfWidth + 18; x <= centerX + halfWidth - 18; x += headSpacing) {
    const phase = Math.sin(time * 0.8 + x * 0.04) * 1.6;
    const topHeadGradient = viewerCtx.createRadialGradient(x - 2, topY - 2 + phase, 2, x, topY + phase, headRadius + 2);
    topHeadGradient.addColorStop(0, "rgba(255,255,255,0.96)");
    topHeadGradient.addColorStop(0.35, "rgba(196, 236, 245, 0.98)");
    topHeadGradient.addColorStop(1, "rgba(94, 157, 183, 0.98)");
    viewerCtx.fillStyle = topHeadGradient;
    viewerCtx.beginPath();
    viewerCtx.arc(x, topY + phase, headRadius, 0, Math.PI * 2);
    viewerCtx.fill();

    const bottomHeadGradient = viewerCtx.createRadialGradient(x - 2, bottomY - 2 - phase, 2, x, bottomY - phase, headRadius + 2);
    bottomHeadGradient.addColorStop(0, "rgba(255,255,255,0.96)");
    bottomHeadGradient.addColorStop(0.35, "rgba(196, 236, 245, 0.98)");
    bottomHeadGradient.addColorStop(1, "rgba(94, 157, 183, 0.98)");
    viewerCtx.fillStyle = bottomHeadGradient;
    viewerCtx.beginPath();
    viewerCtx.arc(x, bottomY - phase, headRadius, 0, Math.PI * 2);
    viewerCtx.fill();

    viewerCtx.strokeStyle = "rgba(241, 248, 214, 0.72)";
    viewerCtx.lineWidth = 1.8;
    viewerCtx.beginPath();
    viewerCtx.moveTo(x - 4, topY + phase + headRadius - 1);
    viewerCtx.quadraticCurveTo(x - 8, centerY - 1, x - 5, tailBottomY + Math.sin(time + x * 0.03) * 2);
    viewerCtx.moveTo(x + 4, topY + phase + headRadius - 1);
    viewerCtx.quadraticCurveTo(x + 8, centerY - 2, x + 5, tailBottomY + Math.cos(time * 0.9 + x * 0.04) * 2);
    viewerCtx.moveTo(x - 4, bottomY - phase - headRadius + 1);
    viewerCtx.quadraticCurveTo(x - 8, centerY + 1, x - 5, tailTopY + Math.cos(time + x * 0.03) * 2);
    viewerCtx.moveTo(x + 4, bottomY - phase - headRadius + 1);
    viewerCtx.quadraticCurveTo(x + 8, centerY + 2, x + 5, tailTopY + Math.sin(time * 0.9 + x * 0.04) * 2);
    viewerCtx.stroke();
  }

  viewerCtx.strokeStyle = "rgba(255,255,255,0.4)";
  viewerCtx.lineWidth = 1.2;
  viewerCtx.beginPath();
  viewerCtx.moveTo(centerX - halfWidth + 16, centerY - 2);
  viewerCtx.lineTo(centerX + halfWidth - 16, centerY - 2);
  viewerCtx.moveTo(centerX - halfWidth + 16, centerY + 2);
  viewerCtx.lineTo(centerX + halfWidth - 16, centerY + 2);
  viewerCtx.stroke();
  drawMembraneMicroFeatures(centerX, centerY, width, time);
  viewerCtx.restore();
}

function drawMembraneProtein(x, centerY, height, width, tilt, time, palette) {
  const topY = centerY - height / 2;
  const bottomY = centerY + height / 2;
  const bodyGradient = viewerCtx.createLinearGradient(x - width, topY, x + width, bottomY);
  bodyGradient.addColorStop(0, palette.light);
  bodyGradient.addColorStop(0.45, palette.mid);
  bodyGradient.addColorStop(1, palette.dark);

  viewerCtx.save();
  viewerCtx.translate(x, centerY);
  viewerCtx.rotate(tilt + Math.sin(time * 0.8 + x * 0.015) * 0.02);
  viewerCtx.shadowColor = "rgba(23, 39, 54, 0.18)";
  viewerCtx.shadowBlur = 14;
  viewerCtx.shadowOffsetY = 7;
  viewerCtx.fillStyle = bodyGradient;
  viewerCtx.strokeStyle = palette.outline;
  viewerCtx.lineWidth = 1.6;

  for (let helix = -1; helix <= 1; helix += 1) {
    const helixX = helix * (width * 0.34);
    viewerCtx.beginPath();
    viewerCtx.roundRect(helixX - width * 0.2, -height / 2, width * 0.4, height, width * 0.22);
    viewerCtx.fill();
    viewerCtx.stroke();
  }

  viewerCtx.shadowBlur = 0;
  viewerCtx.strokeStyle = "rgba(255,255,255,0.36)";
  viewerCtx.lineWidth = 1;
  viewerCtx.beginPath();
  viewerCtx.moveTo(-width * 0.5, -height * 0.34);
  viewerCtx.quadraticCurveTo(0, -height * 0.46, width * 0.45, -height * 0.3);
  viewerCtx.moveTo(-width * 0.46, 0);
  viewerCtx.quadraticCurveTo(0, -height * 0.08, width * 0.42, 0.04 * height);
  viewerCtx.stroke();

  viewerCtx.fillStyle = palette.cap;
  viewerCtx.beginPath();
  viewerCtx.ellipse(0, -height / 2 - 10, width * 0.65, 8, 0, 0, Math.PI * 2);
  viewerCtx.fill();
  viewerCtx.beginPath();
  viewerCtx.ellipse(0, height / 2 + 10, width * 0.58, 7, 0, 0, Math.PI * 2);
  viewerCtx.fill();
  viewerCtx.restore();
}

function drawCholesterolGlyph(x, centerY, scale, time) {
  const wobble = Math.sin(time * 0.9 + x * 0.03) * 1.5;
  viewerCtx.save();
  viewerCtx.translate(x, centerY + wobble);
  viewerCtx.rotate(0.16 + Math.sin(time * 0.4 + x * 0.01) * 0.04);
  viewerCtx.strokeStyle = "rgba(123, 93, 36, 0.82)";
  viewerCtx.lineWidth = 1.5;
  viewerCtx.fillStyle = "rgba(224, 189, 96, 0.9)";

  const ringOffsets = [
    { x: -10 * scale, y: -4 * scale },
    { x: -2 * scale, y: 1 * scale },
    { x: 7 * scale, y: -3 * scale },
    { x: 13 * scale, y: 6 * scale }
  ];

  ringOffsets.forEach((offset, index) => {
    viewerCtx.beginPath();
    viewerCtx.arc(offset.x, offset.y, (index === 3 ? 4.5 : 5.6) * scale, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.stroke();
  });

  viewerCtx.beginPath();
  viewerCtx.moveTo(-15 * scale, -8 * scale);
  viewerCtx.lineTo(-22 * scale, -15 * scale);
  viewerCtx.moveTo(18 * scale, 10 * scale);
  viewerCtx.lineTo(24 * scale, 19 * scale);
  viewerCtx.stroke();
  viewerCtx.restore();
}

function drawMembraneMicroFeatures(centerX, centerY, width, time) {
  const proteinPalettes = [
    {
      light: "rgba(245, 221, 173, 0.96)",
      mid: "rgba(205, 160, 84, 0.96)",
      dark: "rgba(125, 82, 34, 0.96)",
      outline: "rgba(116, 76, 34, 0.92)",
      cap: "rgba(248, 236, 203, 0.92)"
    },
    {
      light: "rgba(227, 214, 255, 0.96)",
      mid: "rgba(142, 119, 204, 0.96)",
      dark: "rgba(75, 60, 136, 0.96)",
      outline: "rgba(70, 58, 123, 0.92)",
      cap: "rgba(239, 233, 255, 0.92)"
    }
  ];

  const proteinPositions = [
    centerX - width * 0.26,
    centerX + width * 0.18
  ];

  proteinPositions.forEach((x, index) => {
    drawMembraneProtein(
      x,
      centerY,
      78 + index * 6,
      28 + index * 3,
      index === 0 ? -0.08 : 0.06,
      time,
      proteinPalettes[index % proteinPalettes.length]
    );
  });

  const cholesterolPositions = [
    centerX - width * 0.11,
    centerX + width * 0.02,
    centerX + width * 0.31
  ];

  cholesterolPositions.forEach((x, index) => {
    drawCholesterolGlyph(x, centerY + (index % 2 === 0 ? -2 : 6), 0.95 - index * 0.08, time + index * 0.4);
  });
}

function drawOrientationAxes(width, height) {
  const origin = { x: 72, y: height - 50 };
  const axisLength = 34;
  const axes = [
    { label: "X", color: "#d14b45", vector: { x: 1, y: 0, z: 0 } },
    { label: "Y", color: "#2b8a57", vector: { x: 0, y: -1, z: 0 } },
    { label: "Z", color: "#2d63c8", vector: { x: 0, y: 0, z: 1 } }
  ];
  viewerCtx.save();
  viewerCtx.fillStyle = "rgba(255, 252, 247, 0.88)";
  viewerCtx.strokeStyle = "rgba(22, 33, 39, 0.12)";
  viewerCtx.beginPath();
  viewerCtx.roundRect(origin.x - 34, origin.y - 34, 88, 88, 18);
  viewerCtx.fill();
  viewerCtx.stroke();
  viewerCtx.font = '700 12px "Avenir Next", "Segoe UI", sans-serif';
  axes.forEach((axis) => {
    const rotated = rotatePoint(axis.vector, yaw, pitch);
    const endX = origin.x + rotated.x * axisLength;
    const endY = origin.y + rotated.y * axisLength;
    viewerCtx.strokeStyle = axis.color;
    viewerCtx.fillStyle = axis.color;
    viewerCtx.beginPath();
    viewerCtx.moveTo(origin.x, origin.y);
    viewerCtx.lineTo(endX, endY);
    viewerCtx.stroke();
    viewerCtx.beginPath();
    viewerCtx.arc(endX, endY, 3.5, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.fillText(axis.label, endX + 7, endY + 4);
  });
  viewerCtx.restore();
}

function renderTarget(width, height, time) {
  const component = componentProfiles[state.component];
  const centerX = width * 0.5;
  const centerY = height * 0.73;
  viewerCtx.save();
  viewerCtx.lineWidth = 2;
  viewerCtx.shadowColor = "rgba(21, 41, 52, 0.18)";
  viewerCtx.shadowBlur = 22;
  viewerCtx.shadowOffsetY = 10;
  if (state.component === "membrane") {
    drawPhospholipidBilayer(centerX, centerY, 376, time);
  } else if (state.component === "receptor") {
    for (let index = 0; index < 5; index += 1) {
      const x = centerX - 130 + index * 65;
      const wobble = Math.sin(time * 1.3 + index) * 5;
      const stemGradient = viewerCtx.createLinearGradient(x, centerY + 70, x, centerY - 26 + wobble);
      stemGradient.addColorStop(0, "rgba(136, 83, 34, 0.95)");
      stemGradient.addColorStop(1, component.color);
      viewerCtx.strokeStyle = stemGradient;
      viewerCtx.lineWidth = 5;
      viewerCtx.beginPath();
      viewerCtx.moveTo(x, centerY + 70);
      viewerCtx.lineTo(x, centerY - 10 + wobble);
      viewerCtx.stroke();
      const capGradient = viewerCtx.createRadialGradient(x - 5, centerY - 38 + wobble, 4, x, centerY - 30 + wobble, 22);
      capGradient.addColorStop(0, "rgba(255,255,255,0.95)");
      capGradient.addColorStop(0.35, "rgba(240, 190, 121, 0.94)");
      capGradient.addColorStop(1, component.color);
      viewerCtx.fillStyle = capGradient;
      viewerCtx.strokeStyle = "rgba(138, 92, 55, 0.9)";
      viewerCtx.lineWidth = 2;
      viewerCtx.beginPath();
      viewerCtx.arc(x, centerY - 30 + wobble, 18, 0, Math.PI * 2);
      viewerCtx.fill();
      viewerCtx.stroke();
    }
  } else if (state.component === "mitochondria") {
    const mitoGradient = viewerCtx.createRadialGradient(centerX - 58, centerY - 32, 18, centerX, centerY, 180);
    mitoGradient.addColorStop(0, "rgba(240,255,233,0.98)");
    mitoGradient.addColorStop(0.45, "rgba(168, 202, 111, 0.95)");
    mitoGradient.addColorStop(1, "rgba(77, 120, 55, 0.98)");
    viewerCtx.fillStyle = mitoGradient;
    viewerCtx.strokeStyle = "rgba(75, 110, 58, 0.92)";
    viewerCtx.lineWidth = 3;
    viewerCtx.beginPath();
    viewerCtx.ellipse(centerX, centerY, 165, 88, -0.2, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.stroke();
    viewerCtx.shadowBlur = 0;
    for (let index = 0; index < 4; index += 1) {
      viewerCtx.strokeStyle = "rgba(230, 246, 213, 0.8)";
      viewerCtx.lineWidth = 3;
      viewerCtx.beginPath();
      viewerCtx.ellipse(centerX - 58 + index * 40, centerY + Math.sin(time + index) * 2, 20, 50, 0.42, 0, Math.PI * 2);
      viewerCtx.stroke();
    }
  } else if (state.component === "lysosome") {
    const lysoGradient = viewerCtx.createRadialGradient(centerX - 24, centerY - 26, 10, centerX, centerY, 110);
    lysoGradient.addColorStop(0, "rgba(255, 239, 247, 0.96)");
    lysoGradient.addColorStop(0.45, "rgba(211, 134, 179, 0.94)");
    lysoGradient.addColorStop(1, "rgba(132, 66, 101, 0.97)");
    viewerCtx.fillStyle = lysoGradient;
    viewerCtx.strokeStyle = "rgba(126, 72, 104, 0.9)";
    viewerCtx.lineWidth = 3;
    viewerCtx.beginPath();
    viewerCtx.arc(centerX, centerY, 88, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.stroke();
    viewerCtx.shadowBlur = 0;
    for (let index = 0; index < 5; index += 1) {
      viewerCtx.fillStyle = "rgba(255,255,255,0.18)";
      viewerCtx.beginPath();
      viewerCtx.arc(centerX - 26 + index * 14, centerY - 12 + Math.sin(index + time) * 4, 4, 0, Math.PI * 2);
      viewerCtx.fill();
    }
  } else {
    for (let index = 0; index < 6; index += 1) {
      const x = centerX - 150 + index * 55;
      viewerCtx.strokeStyle = index % 2 === 0 ? "rgba(116, 148, 223, 0.95)" : "rgba(71, 102, 186, 0.92)";
      viewerCtx.lineWidth = 4;
      viewerCtx.beginPath();
      viewerCtx.moveTo(x, centerY + 60);
      viewerCtx.quadraticCurveTo(x + 20, centerY - 10 + Math.sin(time + index) * 22, x + 10, centerY - 90);
      viewerCtx.stroke();
    }
  }
  viewerCtx.restore();
}

function drawLabel(x, y, text, color) {
  viewerCtx.save();
  viewerCtx.font = '600 13px "Avenir Next", "Segoe UI", sans-serif';
  const boxWidth = viewerCtx.measureText(text).width + 20;
  viewerCtx.shadowColor = "rgba(26, 39, 49, 0.12)";
  viewerCtx.shadowBlur = 12;
  viewerCtx.shadowOffsetY = 5;
  viewerCtx.fillStyle = "rgba(255, 252, 247, 0.96)";
  viewerCtx.strokeStyle = color;
  viewerCtx.beginPath();
  viewerCtx.roundRect(x, y - 18, boxWidth, 28, 12);
  viewerCtx.fill();
  viewerCtx.stroke();
  viewerCtx.fillStyle = "#16303b";
  viewerCtx.fillText(text, x + 10, y);
  viewerCtx.restore();
}

function renderViewerFrame(timeMs) {
  const width = refs.viewer3d.clientWidth;
  const height = refs.viewer3d.clientHeight;
  drawBackground(width, height);
  drawOrientationAxes(width, height);
  const time = timeMs * 0.001;
  renderTarget(width, height, time);
  const metrics = getModelMetrics();
  const proteinPoints = generateProteinGeometry(time);
  const rGroupGeometry = buildRGroupGeometry(proteinPoints, time);
  const transformedOrdered = proteinPoints.map((point) => {
    const rotated = rotatePoint(point, yaw + time * 0.12, pitch);
    return { ...point, ...projectPoint(rotated, width, height) };
  });
  const transformed = transformedOrdered.slice().sort((a, b) => a.depth - b.depth);
  const transformedAtoms = rGroupGeometry.atoms
    .map((atom) => ({ ...atom, ...projectPoint(rotatePoint(atom, yaw + time * 0.12, pitch), width, height) }))
    .sort((a, b) => a.depth - b.depth);
  const transformedBonds = rGroupGeometry.bonds
    .map((bond) => {
      const rotatedStart = rotatePoint(bond.start, yaw + time * 0.12, pitch);
      const rotatedEnd = rotatePoint(bond.end, yaw + time * 0.12, pitch);
      return {
        color: bond.color,
        start: { ...rotatedStart, ...projectPoint(rotatedStart, width, height) },
        end: { ...rotatedEnd, ...projectPoint(rotatedEnd, width, height) },
        depth: (rotatedStart.z + rotatedEnd.z) / 2
      };
    })
    .sort((a, b) => a.depth - b.depth);
  const hotspotStartIndex = residueToSegmentIndex(hotspotRange[0], transformedOrdered.length);
  const hotspotEndIndex = residueToSegmentIndex(hotspotRange[1], transformedOrdered.length);
  const hotspotMidIndex = residueToSegmentIndex(Math.round((hotspotRange[0] + hotspotRange[1]) / 2), transformedOrdered.length);
  const tailIndex = residueToSegmentIndex(tailRange[1], transformedOrdered.length);

  viewerCtx.save();
  viewerCtx.lineCap = "round";
  viewerCtx.lineJoin = "round";
  viewerCtx.shadowColor = "rgba(22, 36, 46, 0.16)";
  viewerCtx.shadowBlur = 20;
  viewerCtx.shadowOffsetY = 12;
  viewerCtx.strokeStyle = `rgba(255, 255, 255, ${0.42 + metrics.exposure / 260})`;
  viewerCtx.lineWidth = 24;
  drawChainPath(transformedOrdered);
  viewerCtx.stroke();

  const ribbonGradient = viewerCtx.createLinearGradient(
    transformedOrdered[0].x,
    transformedOrdered[0].y,
    transformedOrdered[transformedOrdered.length - 1].x,
    transformedOrdered[transformedOrdered.length - 1].y
  );
  ribbonGradient.addColorStop(0, "rgba(31, 87, 187, 0.86)");
  ribbonGradient.addColorStop(0.55, "rgba(90, 169, 205, 0.88)");
  ribbonGradient.addColorStop(1, "rgba(214, 155, 45, 0.9)");
  viewerCtx.strokeStyle = ribbonGradient;
  viewerCtx.lineWidth = 15;
  drawChainPath(transformedOrdered);
  viewerCtx.stroke();

  viewerCtx.strokeStyle = "rgba(255,255,255,0.22)";
  viewerCtx.lineWidth = 5;
  viewerCtx.beginPath();
  viewerCtx.moveTo(transformedOrdered[0].x - 2, transformedOrdered[0].y - 3);
  for (let index = 1; index < transformedOrdered.length - 1; index += 1) {
    const current = transformedOrdered[index];
    const next = transformedOrdered[index + 1];
    viewerCtx.quadraticCurveTo(current.x - 2, current.y - 3, (current.x + next.x) / 2 - 1, (current.y + next.y) / 2 - 3);
  }
  viewerCtx.stroke();

  transformedBonds.forEach((bond) => {
    const bondGradient = viewerCtx.createLinearGradient(bond.start.x, bond.start.y, bond.end.x, bond.end.y);
    bondGradient.addColorStop(0, "rgba(255,255,255,0.72)");
    bondGradient.addColorStop(1, bond.color);
    viewerCtx.strokeStyle = bondGradient;
    viewerCtx.globalAlpha = clamp(0.45 + ((bond.start.scale + bond.end.scale) / 2) * 0.55, 0.45, 1);
    viewerCtx.lineWidth = clamp(1.2 + ((bond.start.scale + bond.end.scale) / 2) * 2.8, 1.2, 4.8);
    viewerCtx.beginPath();
    viewerCtx.moveTo(bond.start.x, bond.start.y);
    viewerCtx.lineTo(bond.end.x, bond.end.y);
    viewerCtx.stroke();
  });

  transformedAtoms.forEach((atom) => {
    const radius = Math.max(1.8, atom.radius * 12 * atom.scale);
    const glow = viewerCtx.createRadialGradient(atom.x - radius * 0.4, atom.y - radius * 0.45, 1, atom.x, atom.y, radius);
    glow.addColorStop(0, "rgba(255,255,255,0.96)");
    glow.addColorStop(0.42, atom.color);
    glow.addColorStop(1, mixColor(atom.color, "#17313b", 0.45));
    viewerCtx.globalAlpha = clamp(0.48 + atom.scale * 0.58, 0.48, 1);
    viewerCtx.fillStyle = glow;
    viewerCtx.beginPath();
    viewerCtx.arc(atom.x, atom.y, radius, 0, Math.PI * 2);
    viewerCtx.fill();
  });

  viewerCtx.shadowBlur = 0;
  viewerCtx.globalAlpha = 1;

  transformed.forEach((point, index) => {
    const isAnchor =
      index === 0 ||
      index === transformed.length - 1 ||
      index === hotspotStartIndex ||
      index === hotspotEndIndex ||
      index === tailIndex;
    if (!isAnchor) {
      return;
    }
    const radius = Math.max(6, (7 + point.radius * 16) * point.scale);
    const beadGradient = viewerCtx.createRadialGradient(point.x - radius * 0.4, point.y - radius * 0.45, 2, point.x, point.y, radius);
    beadGradient.addColorStop(0, "rgba(255,255,255,0.95)");
    beadGradient.addColorStop(0.3, point.color);
    beadGradient.addColorStop(1, "rgba(15, 34, 57, 0.92)");
    viewerCtx.globalAlpha = clamp(0.5 + point.scale * 0.5, 0.5, 1);
    viewerCtx.fillStyle = beadGradient;
    viewerCtx.beginPath();
    viewerCtx.arc(point.x, point.y, radius, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.strokeStyle = "rgba(255,255,255,0.26)";
    viewerCtx.lineWidth = 1.5;
    viewerCtx.beginPath();
    viewerCtx.arc(point.x - 1, point.y - 1, radius * 0.82, Math.PI * 1.1, Math.PI * 1.85);
    viewerCtx.stroke();
  });
  viewerCtx.globalAlpha = 1;

  const contactShadow = viewerCtx.createRadialGradient(width * 0.5, height * 0.76, 20, width * 0.5, height * 0.84, width * 0.24);
  contactShadow.addColorStop(0, "rgba(62, 109, 121, 0.18)");
  contactShadow.addColorStop(1, "rgba(62, 109, 121, 0)");
  viewerCtx.fillStyle = contactShadow;
  viewerCtx.beginPath();
  viewerCtx.ellipse(width * 0.5, height * 0.8, width * 0.21, height * 0.05, 0, 0, Math.PI * 2);
  viewerCtx.fill();
  drawLabel(transformedOrdered[hotspotMidIndex].x + 14, transformedOrdered[hotspotMidIndex].y - 10, protein.hotspotLabel, "#d69b2d");
  drawLabel(transformedOrdered[tailIndex].x - 120, transformedOrdered[tailIndex].y - 8, protein.tailLabel, "#cb6b63");
  drawLabel(width * 0.5 + 18, height * 0.73 - 12, componentProfiles[state.component].label, componentProfiles[state.component].color);
  viewerCtx.restore();
  frameId = requestAnimationFrame(renderViewerFrame);
}

function updateView() {
  if (refs.rGroupToggle) {
    refs.rGroupToggle.checked = state.showRGroups;
  }
  refs.pathogenicityValue.textContent = state.pathogenicity;
  refs.stressValue.textContent = state.stress;
  refs.vulnerabilityValue.textContent = state.vulnerability;
  refs.densityValue.textContent = state.density;
  const metrics = getModelMetrics();
  renderSummary(metrics);
  renderNarrative(metrics);
  renderTimeline(metrics);
  renderAnnotations(metrics);
  drawContactMap(metrics);
  updateViewerCaption();
}

function updateActiveConfig(nextConfig) {
  config = mergeConfig(fallbackConfig, nextConfig);
  protein = config.protein;
  sequence = protein.sequence;
  hotspotRange = protein.hotspotRange;
  tailRange = protein.tailRange;
  assemblyProfiles = config.assemblies;
  componentProfiles = config.components;
  applyProteinContent();
  renderSequence();
  updateView();
}

function handleUploadedFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const imported = normalizeImportedConfig(JSON.parse(reader.result));
      updateActiveConfig(imported);
      setImportStatus(`Loaded ${imported.protein.displayName} from ${file.name}.`);
    } catch (error) {
      setImportStatus(error.message || "Could not load that JSON file.", true);
    }
  };
  reader.readAsText(file);
}

function loadExampleProfile(exampleKey) {
  const example = exampleProfiles[exampleKey];
  if (!example) {
    setImportStatus("That example profile was not found.", true);
    return;
  }
  updateActiveConfig(example);
  setImportStatus(`Loaded built-in example: ${example.protein.displayName}.`);
}

function attachEvents() {
  refs.exampleSelect.addEventListener("change", (event) => {
    loadExampleProfile(event.target.value);
  });

  refs.loadExampleBtn.addEventListener("click", () => {
    loadExampleProfile(refs.exampleSelect.value);
  });

  refs.configUpload.addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) {
      handleUploadedFile(file);
    }
  });

  refs.assemblySelect.addEventListener("change", (event) => {
    state.assembly = event.target.value;
    updateView();
  });
  refs.componentSelect.addEventListener("change", (event) => {
    state.component = event.target.value;
    updateView();
  });
  if (refs.rGroupToggle) {
    refs.rGroupToggle.addEventListener("change", (event) => {
      state.showRGroups = event.target.checked;
      updateView();
    });
  }
  [["pathogenicityRange", "pathogenicity"], ["stressRange", "stress"], ["vulnerabilityRange", "vulnerability"], ["densityRange", "density"]].forEach(([id, key]) => {
    refs[id].addEventListener("input", (event) => {
      state[key] = Number(event.target.value);
      updateView();
    });
  });
  refs.resetBtn.addEventListener("click", () => {
    Object.assign(state, defaults);
    refs.assemblySelect.value = state.assembly;
    refs.componentSelect.value = state.component;
    refs.pathogenicityRange.value = state.pathogenicity;
    refs.stressRange.value = state.stress;
    refs.vulnerabilityRange.value = state.vulnerability;
    refs.densityRange.value = state.density;
    if (refs.rGroupToggle) {
      refs.rGroupToggle.checked = state.showRGroups;
    }
    yaw = 0.45;
    pitch = -0.2;
    roll = 0;
    updateActiveConfig(window.PROTEIN_SIM_CONFIG || fallbackConfig);
    setImportStatus(`Reset to default profile: ${(window.PROTEIN_SIM_CONFIG || fallbackConfig).protein.displayName}.`);
  });
}

applyProteinContent();
renderSequence();
initViewer();
attachEvents();
updateView();
frameId = requestAnimationFrame(renderViewerFrame);

window.addEventListener("beforeunload", () => {
  if (frameId) {
    cancelAnimationFrame(frameId);
  }
});
