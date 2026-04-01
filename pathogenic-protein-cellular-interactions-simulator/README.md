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
