/*
  Guided protein profile configuration file
  --------------------------------
  Edit this file directly, or ask any AI assistant to generate a new version.

  Purpose:
  - Define the pathogenic protein to visualize in the simulator
  - Customize the sequence, labels, hotspot, tail, and assembly behavior
  - Keep protein-specific changes out of script.js

  Reserved AI-editable section:
  - Replace the object assigned to window.PROTEIN_SIM_CONFIG below
  - Keep the same field names unless you also update script.js

  Example prompt for AI:
  "Create a protein-profile.config.js file for alpha-synuclein with a hydrophobic NAC region,
  a disordered C-terminal tail, and a mitochondria-focused interaction narrative."
*/

window.PROTEIN_SIM_CONFIG = {
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
