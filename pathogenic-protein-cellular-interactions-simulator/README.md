# Pathogenic Protein Interaction Simulator

A lightweight static prototype for exploring how a configurable pathogenic protein might interact with different cellular components in an educational 3D interface.

## Quick Start

1. Download or clone this folder.
2. Open `pathogenic-protein-cellular-interactions.html` in a browser.
3. If the page does not load correctly, try opening the folder in a different browser such as Chrome or Safari.
4. To explore a different pathogenic protein, edit `pathogenic-protein-cellular-interactions.config.js` or give `pathogenic-protein-ai-template.json` to an AI and ask it to generate a new config file.

## Suggested repo contents

- `README.md`: project overview and usage instructions
- `pathogenic-protein-cellular-interactions.html`: main browser entrypoint
- `pathogenic-protein-cellular-interactions.app.js`: rendering, interaction, and simulation logic
- `pathogenic-protein-cellular-interactions.styles.css`: visual styling
- `pathogenic-protein-cellular-interactions.config.js`: AI-editable protein definition file
- `pathogenic-protein-ai-template.json`: AI prompt/output template for creating new protein interaction profiles

## What it includes

- AlphaFold-inspired layout with sequence strip, confidence legend, contact map, and large 3D viewer
- Interactive controls for assembly state, target component, pathogenicity, oxidative stress, vulnerability, and receptor density
- Simplified heuristic scoring for exposure, binding likelihood, disruption index, and confidence
- Guided configuration file for swapping in a different protein without editing the main simulator logic
- Canvas-based ribbon-style scene showing protein motion relative to membranes, receptors, mitochondria, lysosomes, or tau-rich structures

## Main customization file

- [pathogenic-protein-cellular-interactions.config.js](/Users/tanakamanhede/Documents/Playground/pathogenic-protein-cellular-interactions-simulator/pathogenic-protein-cellular-interactions.config.js): the AI-editable file where you define the protein name, sequence, hotspot, disordered tail, explanatory text, and assembly/component settings

## AI template file

- [pathogenic-protein-ai-template.json](/Users/tanakamanhede/Documents/Playground/pathogenic-protein-cellular-interactions-simulator/pathogenic-protein-ai-template.json): a structured template that users can hand to an AI to generate a new protein profile for this simulator

## AI workflow

Ask any AI to modify only [pathogenic-protein-cellular-interactions.config.js](/Users/tanakamanhede/Documents/Playground/pathogenic-protein-cellular-interactions-simulator/pathogenic-protein-cellular-interactions.config.js) and keep the same object shape.

Example prompt:

```text
Create a new pathogenic-protein-cellular-interactions.config.js for alpha-synuclein. Keep the same field names, update the sequence, set the NAC region as the hotspot, use a disordered C-terminal tail, and make the mitochondria narrative more prominent.

Or provide the JSON in `pathogenic-protein-ai-template.json` to an AI and ask it to return a completed profile plus a matching JavaScript config file.
```

## Important scope note

This is a concept simulator for teaching, communication, and UI prototyping. It is **not** a molecular dynamics engine and should not be used as a scientific prediction tool.

## Run it

Open [/Users/tanakamanhede/Documents/Playground/pathogenic-protein-cellular-interactions-simulator/pathogenic-protein-cellular-interactions.html](/Users/tanakamanhede/Documents/Playground/pathogenic-protein-cellular-interactions-simulator/pathogenic-protein-cellular-interactions.html) in a browser.

If the page does not appear correctly, open the project in another browser and make sure all files stay together in the same folder.
