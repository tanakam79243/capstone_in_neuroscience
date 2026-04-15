# Pathogenic Protein Interaction Simulator

A lightweight browser-based simulator for exploring how a configurable pathogenic protein may interact with membranes, receptor clusters, mitochondria, lysosomes, and tau-rich structures.

## Quick Start

1. Keep all files together in the same folder.
2. Open `pathogenic-protein-cellular-interactions.html` in a browser.
3. Use the built-in example loader or upload a JSON file to switch proteins.

## Main files

- `pathogenic-protein-cellular-interactions.html`: main browser entrypoint
- `pathogenic-protein-cellular-interactions.app.js`: simulation and rendering logic
- `pathogenic-protein-cellular-interactions.styles.css`: visual styling
- `pathogenic-protein-cellular-interactions.config.js`: default protein profile loaded on page start
- `pathogenic-protein-ai-template.json`: AI template users can fill out and upload

## Easy protein switching

Users can change the protein in two simple ways:

1. Choose a built-in example from the page and click `Load Example`
2. Upload a JSON file from:
   - `examples/alpha-synuclein.profile.json`
   - `examples/tau-4r.profile.json`
   - a completed version of `pathogenic-protein-ai-template.json`

The page accepts:

- direct simulator profile JSON shaped like `{ protein, assemblies, components }`
- completed AI template JSON shaped like the provided template file

## Notes

This simulator is educational and conceptual. It is not a molecular dynamics or clinically validated prediction tool.

- The 3D viewer now includes an optional `Show R-group balls` toggle for approximate ball-and-stick sidechain rendering.
- The sidechains are heuristic educational geometry, not atomically exact coordinates from PDB, NMR, cryo-EM, or molecular dynamics data.
- The protein viewer uses enhanced depth cues, including perspective scaling, layered highlights, and stronger occlusion, to make the 3D pose easier to read.
- The plasma membrane target now renders as a stylized phospholipid bilayer instead of a single rounded bar.
- The membrane scene also includes embedded transmembrane proteins and cholesterol-like sterols to make the bilayer feel more biologically recognizable.
- The viewer now supports free 360-degree orbiting, and holding `Shift` while dragging rolls the protein for harder-to-reach orientations.
