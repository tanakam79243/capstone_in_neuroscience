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
    monomer: {
      label: "Monomeric peptide",
      lengthFactor: 0.7,
      aggregation: 0.35,
      toxicity: 0.4,
      speed: 0.8,
      segments: 18
    },
    oligomer: {
      label: "Soluble oligomer",
      lengthFactor: 1,
      aggregation: 0.68,
      toxicity: 0.82,
      speed: 1,
      segments: 26
    },
    protofibril: {
      label: "Protofibril",
      lengthFactor: 1.35,
      aggregation: 0.92,
      toxicity: 0.96,
      speed: 1.15,
      segments: 34
    }
  },
  components: {
    membrane: {
      label: "Plasma membrane",
      color: "#7bb6c9",
      affinity: 0.82,
      vulnerabilityBoost: 1,
      densityBoost: 0.25,
      narrative:
        "Hydrophobic residues align with the outer leaflet, increasing the chance of membrane thinning, pore-like disruption, and calcium dysregulation."
    },
    receptor: {
      label: "Synaptic receptor cluster",
      color: "#d6864e",
      affinity: 0.74,
      vulnerabilityBoost: 0.35,
      densityBoost: 1,
      narrative:
        "The assembly lingers near receptor-rich zones, raising the likelihood of aberrant signaling and receptor trafficking stress."
    },
    mitochondria: {
      label: "Mitochondrion",
      color: "#87a95e",
      affinity: 0.69,
      vulnerabilityBoost: 0.7,
      densityBoost: 0.2,
      narrative:
        "Contact favors oxidative stress amplification, outer-membrane perturbation, and energy metabolism collapse in already stressed cells."
    },
    lysosome: {
      label: "Lysosome",
      color: "#b87393",
      affinity: 0.62,
      vulnerabilityBoost: 0.55,
      densityBoost: 0.15,
      narrative:
        "Accumulation near degradative compartments can overload clearance pathways and increase the chance of proteostasis failure."
    },
    tau: {
      label: "Tau-rich microtubules",
      color: "#5f88d8",
      affinity: 0.77,
      vulnerabilityBoost: 0.5,
      densityBoost: 0.4,
      narrative:
        "The model shifts toward cross-seeding behavior, where protein exposure can increase local instability around tau-associated structures."
    }
  }
};

function mergeConfig(base, override) {
  if (!override) {
    return structuredClone(base);
  }

  const merged = structuredClone(base);
  for (const key of Object.keys(override)) {
    const baseValue = merged[key];
    const overrideValue = override[key];
    if (
      baseValue &&
      overrideValue &&
      typeof baseValue === "object" &&
      typeof overrideValue === "object" &&
      !Array.isArray(baseValue) &&
      !Array.isArray(overrideValue)
    ) {
      merged[key] = { ...baseValue, ...overrideValue };
      if (key === "assemblies" || key === "components") {
        for (const nestedKey of Object.keys(overrideValue)) {
          merged[key][nestedKey] = { ...baseValue[nestedKey], ...overrideValue[nestedKey] };
        }
      }
    } else {
      merged[key] = overrideValue;
    }
  }
  return merged;
}

const config = mergeConfig(fallbackConfig, window.PROTEIN_SIM_CONFIG);
const protein = config.protein;
const sequence = protein.sequence;
const hotspotRange = protein.hotspotRange;
const tailRange = protein.tailRange;
const assemblyProfiles = config.assemblies;
const componentProfiles = config.components;

const defaults = {
  assembly: "oligomer",
  component: "membrane",
  pathogenicity: 68,
  stress: 54,
  vulnerability: 62,
  density: 48
};

const state = { ...defaults };

const refs = {
  appTitle: document.getElementById("appTitle"),
  introProteinName: document.getElementById("introProteinName"),
  sequenceHeading: document.getElementById("sequenceHeading"),
  sequenceBadge: document.getElementById("sequenceBadge"),
  sequenceTrack: document.getElementById("sequenceTrack"),
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
  viewer3d: document.getElementById("viewer3d")
};

const mapCtx = refs.contactMap.getContext("2d");

let viewerCanvas;
let viewerCtx;
let frameId;
let dragState = null;
let yaw = 0.45;
let pitch = -0.2;

function applyProteinContent() {
  refs.appTitle.textContent = protein.heroTitle;
  refs.introProteinName.textContent = protein.introName;
  refs.sequenceHeading.textContent = protein.sequenceHeading;
  refs.sequenceBadge.textContent = protein.sequenceBadge;

  const mapExplainer = document.querySelector(".map-explainer");
  if (mapExplainer) {
    mapExplainer.textContent = protein.contactMapExplanation;
  }

  const speedNote = document.querySelector(".speed-note");
  if (speedNote) {
    speedNote.textContent = protein.speedExplanation;
  }
}

function renderSequence() {
  refs.sequenceTrack.innerHTML = "";
  [...sequence].forEach((residue, index) => {
    const cell = document.createElement("span");
    const position = index + 1;
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

  const exposure =
    assembly.aggregation * 36 +
    state.pathogenicity * 0.28 +
    state.stress * 0.18 +
    state.vulnerability * 0.12;

  const binding =
    component.affinity * 42 +
    state.pathogenicity * 0.22 +
    state.density * 0.18 * component.densityBoost +
    state.vulnerability * 0.14 * component.vulnerabilityBoost;

  const disruption =
    assembly.toxicity * 38 +
    state.stress * 0.28 +
    state.vulnerability * 0.24 +
    binding * 0.16;

  const confidence =
    92 -
    state.pathogenicity * 0.12 +
    assembly.aggregation * 8 -
    state.stress * 0.08;

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
    <article class="summary-card">
      <span class="metric-label">Protein</span>
      <span class="metric-value">${protein.displayName}</span>
    </article>
    <article class="summary-card">
      <span class="metric-label">Assembly State</span>
      <span class="metric-value">${assembly.label}</span>
    </article>
    <article class="summary-card">
      <span class="metric-label">Target</span>
      <span class="metric-value">${component.label}</span>
    </article>
    <article class="summary-card">
      <span class="metric-label">Surface Exposure</span>
      <span class="metric-value emphasis">${metrics.exposure}%</span>
    </article>
    <article class="summary-card">
      <span class="metric-label">Predicted Binding Likelihood</span>
      <span class="metric-value emphasis">${metrics.binding}%</span>
    </article>
    <article class="summary-card">
      <span class="metric-label">Cellular Disruption Index</span>
      <span class="metric-value emphasis">${metrics.disruption}%</span>
    </article>
  `;
}

function renderNarrative(metrics) {
  const component = componentProfiles[state.component];
  const assembly = assemblyProfiles[state.assembly];
  const severity =
    metrics.disruption >= 80
      ? "high-risk interaction regime"
      : metrics.disruption >= 60
        ? "moderate-risk interaction regime"
        : "lower-risk interaction regime";

  refs.narrativeText.textContent = `${protein.displayName} in a ${assembly.label.toLowerCase()} state currently trends toward a ${severity}. ${component.narrative} Estimated binding is ${metrics.binding}% with ${metrics.exposure}% interface exposure.`;
}

function renderTimeline(metrics) {
  const component = componentProfiles[state.component];
  const events = [
    {
      title: "Approach",
      body: `The ${protein.displayName} ${assemblyProfiles[state.assembly].label.toLowerCase()} drifts toward the ${component.label.toLowerCase()} as pathogenicity and crowding raise collision frequency.`
    },
    {
      title: "Docking",
      body: `Binding likelihood reaches ${metrics.binding}%, driven by exposed sequence features and the current ${state.component === "receptor" ? "receptor density" : "cell stress"} setting.`
    },
    {
      title: "Cellular Response",
      body:
        metrics.disruption > 75
          ? `The simulator predicts a strong downstream disturbance signal for ${protein.displayName}, with elevated odds of organelle or membrane dysfunction.`
          : `The simulator predicts a partial response, where transient ${protein.displayName} contact may still prime later dysfunction if the local environment worsens.`
    }
  ];

  refs.timeline.innerHTML = events
    .map(
      (event) => `
        <article class="timeline-card">
          <strong>${event.title}</strong>
          <p>${event.body}</p>
        </article>
      `
    )
    .join("");
}

function renderAnnotations(metrics) {
  const component = componentProfiles[state.component];
  const cards = [
    {
      kicker: "Residue Cluster",
      title: protein.hotspotLabel,
      body: `Residues ${hotspotRange[0]}-${hotspotRange[1]} are highlighted as the main interaction patch, and their prominence increases with the current ${metrics.exposure}% exposure score.`
    },
    {
      kicker: "Flexible Region",
      title: protein.tailLabel,
      body: `Residues ${tailRange[0]}-${tailRange[1]} are rendered as the most mobile segment, matching the lower-confidence, higher-contact edge of the ${protein.displayName} model.`
    },
    {
      kicker: "Cell Target",
      title: component.label,
      body: `${component.narrative} In this state, the simulator estimates a ${metrics.binding}% likelihood of persistent contact.`
    }
  ];

  refs.annotationGrid.innerHTML = cards
    .map(
      (card) => `
        <article class="annotation-card">
          <span class="annotation-kicker">${card.kicker}</span>
          <h3>${card.title}</h3>
          <p>${card.body}</p>
        </article>
      `
    )
    .join("");
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
      const hotspotBoost =
        x >= hotspotRange[0] - 1 &&
        x <= hotspotRange[1] - 1 &&
        y >= hotspotRange[0] - 1 &&
        y <= hotspotRange[1] - 1
          ? 0.28
          : 0;
      const tailBoost = x >= tailRange[0] - 1 || y >= tailRange[0] - 1 ? 0.12 : 0;
      const diagonal = Math.max(0, 1 - distance / 10);
      const exposure = metrics.exposure / 100;
      const value = Math.min(
        1,
        diagonal * 0.36 +
          assembly.aggregation * 0.24 +
          component.affinity * 0.18 +
          exposure * 0.16 +
          hotspotBoost +
          tailBoost
      );

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

function initViewer() {
  viewerCanvas = document.createElement("canvas");
  refs.viewer3d.innerHTML = "";
  refs.viewer3d.appendChild(viewerCanvas);
  viewerCtx = viewerCanvas.getContext("2d");

  resizeViewer();
  window.addEventListener("resize", resizeViewer);

  viewerCanvas.addEventListener("pointerdown", (event) => {
    dragState = { x: event.clientX, y: event.clientY };
    viewerCanvas.setPointerCapture(event.pointerId);
  });

  viewerCanvas.addEventListener("pointermove", (event) => {
    if (!dragState) {
      return;
    }
    const dx = event.clientX - dragState.x;
    const dy = event.clientY - dragState.y;
    yaw += dx * 0.01;
    pitch = clamp(pitch + dy * 0.008, -1.1, 0.75);
    dragState = { x: event.clientX, y: event.clientY };
  });

  const stopDragging = () => {
    dragState = null;
  };

  viewerCanvas.addEventListener("pointerup", stopDragging);
  viewerCanvas.addEventListener("pointerleave", stopDragging);
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

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function lerp(a, b, t) {
  return a + (b - a) * t;
}

function hexToRgb(hex) {
  const normalized = hex.replace("#", "");
  const value = Number.parseInt(normalized, 16);
  return {
    r: (value >> 16) & 255,
    g: (value >> 8) & 255,
    b: value & 255
  };
}

function mixColor(a, b, t) {
  const colorA = hexToRgb(a);
  const colorB = hexToRgb(b);
  return `rgb(${Math.round(lerp(colorA.r, colorB.r, t))} ${Math.round(lerp(colorA.g, colorB.g, t))} ${Math.round(lerp(colorA.b, colorB.b, t))})`;
}

function generateProteinGeometry(time) {
  const assembly = assemblyProfiles[state.assembly];
  const metrics = getModelMetrics();
  const points = [];
  const startY = -assembly.lengthFactor * 3.4;
  const drift = 0.6 + metrics.binding / 180;

  for (let index = 0; index < assembly.segments; index += 1) {
    const t = index / Math.max(1, assembly.segments - 1);
    points.push({
      x:
        Math.sin(index * 0.56 + time * 0.8) * 0.82 * assembly.lengthFactor +
        Math.sin(time * 0.65) * drift,
      y: startY + index * 0.34 * assembly.lengthFactor + Math.sin(time + t * 6) * 0.06,
      z: Math.cos(index * 0.42 + time * 0.45) * 0.68 + Math.sin(t * 8 + time) * 0.04,
      radius: 0.18 + Math.sin(t * Math.PI) * 0.17,
      color: mixColor("#1f57bb", "#d69b2d", t)
    });
  }

  return points;
}

function rotatePoint(point, localYaw, localPitch) {
  const cosY = Math.cos(localYaw);
  const sinY = Math.sin(localYaw);
  const cosP = Math.cos(localPitch);
  const sinP = Math.sin(localPitch);

  const xzX = point.x * cosY - point.z * sinY;
  const xzZ = point.x * sinY + point.z * cosY;

  const yzY = point.y * cosP - xzZ * sinP;
  const yzZ = point.y * sinP + xzZ * cosP;

  return { x: xzX, y: yzY, z: yzZ };
}

function projectPoint(point, width, height) {
  const cameraDistance = 9.5;
  const perspective = 300 / (cameraDistance - point.z);
  return {
    x: width / 2 + point.x * perspective,
    y: height / 2 + point.y * perspective,
    scale: perspective / 120,
    depth: point.z
  };
}

function renderTarget(width, height, time) {
  const component = componentProfiles[state.component];
  const centerX = width * 0.5;
  const centerY = height * 0.73;
  viewerCtx.save();
  viewerCtx.globalAlpha = 0.9;
  viewerCtx.strokeStyle = component.color;
  viewerCtx.fillStyle = `${component.color}33`;
  viewerCtx.lineWidth = 2;

  if (state.component === "membrane") {
    viewerCtx.fillStyle = `${component.color}40`;
    viewerCtx.fillRect(centerX - 180, centerY - 20, 360, 42);
    viewerCtx.strokeRect(centerX - 180, centerY - 20, 360, 42);
  } else if (state.component === "receptor") {
    for (let index = 0; index < 5; index += 1) {
      const x = centerX - 130 + index * 65;
      const wobble = Math.sin(time * 1.3 + index) * 5;
      viewerCtx.beginPath();
      viewerCtx.moveTo(x, centerY + 70);
      viewerCtx.lineTo(x, centerY - 10 + wobble);
      viewerCtx.stroke();
      viewerCtx.beginPath();
      viewerCtx.arc(x, centerY - 30 + wobble, 18, 0, Math.PI * 2);
      viewerCtx.fill();
      viewerCtx.stroke();
    }
  } else if (state.component === "mitochondria") {
    viewerCtx.beginPath();
    viewerCtx.ellipse(centerX, centerY, 165, 88, -0.2, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.stroke();
    for (let index = 0; index < 4; index += 1) {
      viewerCtx.beginPath();
      viewerCtx.ellipse(centerX - 60 + index * 40, centerY, 24, 54, 0.4, 0, Math.PI * 2);
      viewerCtx.stroke();
    }
  } else if (state.component === "lysosome") {
    viewerCtx.beginPath();
    viewerCtx.arc(centerX, centerY, 88, 0, Math.PI * 2);
    viewerCtx.fill();
    viewerCtx.stroke();
  } else if (state.component === "tau") {
    for (let index = 0; index < 6; index += 1) {
      const x = centerX - 150 + index * 55;
      viewerCtx.beginPath();
      viewerCtx.moveTo(x, centerY + 60);
      viewerCtx.quadraticCurveTo(
        x + 20,
        centerY - 10 + Math.sin(time + index) * 22,
        x + 10,
        centerY - 90
      );
      viewerCtx.stroke();
    }
  }

  viewerCtx.restore();
}

function drawLabel(x, y, text, color) {
  viewerCtx.save();
  viewerCtx.font = '600 13px "Avenir Next", "Segoe UI", sans-serif';
  const textWidth = viewerCtx.measureText(text).width;
  const boxWidth = textWidth + 20;
  viewerCtx.fillStyle = "rgba(255, 252, 247, 0.92)";
  viewerCtx.strokeStyle = color;
  viewerCtx.lineWidth = 1.2;
  viewerCtx.beginPath();
  viewerCtx.roundRect(x, y - 18, boxWidth, 28, 12);
  viewerCtx.fill();
  viewerCtx.stroke();
  viewerCtx.fillStyle = "#16303b";
  viewerCtx.fillText(text, x + 10, y);
  viewerCtx.restore();
}

function drawBackground(width, height) {
  const gradient = viewerCtx.createRadialGradient(
    width * 0.3,
    height * 0.18,
    20,
    width * 0.5,
    height * 0.6,
    height * 0.8
  );
  gradient.addColorStop(0, "rgba(255,255,255,0.95)");
  gradient.addColorStop(1, "rgba(214,228,229,0.95)");
  viewerCtx.fillStyle = gradient;
  viewerCtx.fillRect(0, 0, width, height);
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
  viewerCtx.lineWidth = 1;
  viewerCtx.beginPath();
  viewerCtx.roundRect(origin.x - 34, origin.y - 34, 88, 88, 18);
  viewerCtx.fill();
  viewerCtx.stroke();

  viewerCtx.font = '700 12px "Avenir Next", "Segoe UI", sans-serif';
  viewerCtx.lineWidth = 2.4;

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

function renderViewerFrame(timeMs) {
  const width = refs.viewer3d.clientWidth;
  const height = refs.viewer3d.clientHeight;
  drawBackground(width, height);
  drawOrientationAxes(width, height);

  const time = timeMs * 0.001;
  renderTarget(width, height, time);

  const metrics = getModelMetrics();
  const proteinPoints = generateProteinGeometry(time);
  const transformed = proteinPoints.map((point) => {
    const rotated = rotatePoint(point, yaw + time * 0.12, pitch);
    const projected = projectPoint(rotated, width, height);
    return { ...point, ...rotated, ...projected };
  });

  transformed.sort((a, b) => a.depth - b.depth);

  viewerCtx.save();
  viewerCtx.lineCap = "round";
  viewerCtx.lineJoin = "round";
  viewerCtx.strokeStyle = `rgba(255, 255, 255, ${0.45 + metrics.exposure / 240})`;
  viewerCtx.lineWidth = 22;
  viewerCtx.beginPath();
  viewerCtx.moveTo(transformed[0].x, transformed[0].y);
  for (let index = 1; index < transformed.length - 1; index += 1) {
    const current = transformed[index];
    const next = transformed[index + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    viewerCtx.quadraticCurveTo(current.x, current.y, midX, midY);
  }
  viewerCtx.stroke();

  const ribbonGradient = viewerCtx.createLinearGradient(
    transformed[0].x,
    transformed[0].y,
    transformed[transformed.length - 1].x,
    transformed[transformed.length - 1].y
  );
  ribbonGradient.addColorStop(0, "rgba(31, 87, 187, 0.86)");
  ribbonGradient.addColorStop(0.55, "rgba(90, 169, 205, 0.88)");
  ribbonGradient.addColorStop(1, "rgba(214, 155, 45, 0.9)");
  viewerCtx.strokeStyle = ribbonGradient;
  viewerCtx.lineWidth = 14;
  viewerCtx.beginPath();
  viewerCtx.moveTo(transformed[0].x, transformed[0].y);
  for (let index = 1; index < transformed.length - 1; index += 1) {
    const current = transformed[index];
    const next = transformed[index + 1];
    const midX = (current.x + next.x) / 2;
    const midY = (current.y + next.y) / 2;
    viewerCtx.quadraticCurveTo(current.x, current.y, midX, midY);
  }
  viewerCtx.stroke();

  const targetColor = componentProfiles[state.component].color;
  const hotspotPoint = transformed[Math.max(0, Math.floor((hotspotRange[0] + hotspotRange[1]) / 2) - 1)];
  const tailPoint = transformed[transformed.length - 1];
  drawLabel(hotspotPoint.x + 14, hotspotPoint.y - 10, protein.hotspotLabel, "#d69b2d");
  drawLabel(tailPoint.x - 120, tailPoint.y - 8, protein.tailLabel, "#cb6b63");
  drawLabel(width * 0.5 + 18, height * 0.73 - 12, componentProfiles[state.component].label, targetColor);
  viewerCtx.restore();

  frameId = requestAnimationFrame(renderViewerFrame);
}

function updateView() {
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
}

function attachEvents() {
  refs.assemblySelect.addEventListener("change", (event) => {
    state.assembly = event.target.value;
    updateView();
  });

  refs.componentSelect.addEventListener("change", (event) => {
    state.component = event.target.value;
    updateView();
  });

  [
    ["pathogenicityRange", "pathogenicity"],
    ["stressRange", "stress"],
    ["vulnerabilityRange", "vulnerability"],
    ["densityRange", "density"]
  ].forEach(([inputId, key]) => {
    refs[inputId].addEventListener("input", (event) => {
      state[key] = Number(event.target.value);
      refs[`${key}Value`].textContent = state[key];
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
    yaw = 0.45;
    pitch = -0.2;
    updateView();
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
