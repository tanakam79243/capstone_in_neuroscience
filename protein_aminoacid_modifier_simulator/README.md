# Toxic Protein Sequence Viewer

A single-file HTML workspace for uploading, editing, and comparing amino-acid sequences for aggregation-prone proteins such as alpha-synuclein and amyloid-beta.

## What it does

- Runs as plain HTML with inline CSS and JavaScript
- Accepts pasted FASTA, plain amino-acid text, and uploaded `.fasta` or `.txt` files
- Keeps separate reference and edited sequences
- Supports quick substitutions, insertions, and deletions
- Aligns the edited chain against the reference and lists called differences
- Renders the edited sequence as an interactive browser-based pseudo-3D backbone
- Updates the backbone shape immediately when edited residues, insertions, or deletions change the sequence
- Includes built-in presets for human alpha-synuclein, Abeta40, and Abeta42
- Can fetch a UniProt FASTA by accession when opened through a local web server
- Exports the edited sequence as FASTA plus a simple mutation report

## Open it

Open [index.html](/Users/tanakamanhede/Documents/Playground/als-sequence-editor/index.html) directly in a browser, or launch it from Visual Studio Code with Live Server.

## Suggested workflow

1. Ask ChatGPT to return a sequence in FASTA format.
2. Save that response as a `.fasta` or `.txt` file.
3. Upload the file into the page, or paste the sequence directly.
4. Inspect the live 3D view near the top of the page and drag to orbit the backbone.
5. Use the edit controls to replace residues, insert residues, or delete residues.
6. Export the edited FASTA for later use.

## Notes

- Browser-only upload and paste flows work from disk.
- UniProt fetches are more reliable when the page is served from a local server such as VS Code Live Server.
- Preset cards are conveniences, not authoritative annotations. Validate the exact sequence and residue numbering you want to analyze.
- Amyloid-beta is handled here as the processed peptide sequence rather than as the full-length APP precursor.
- The 3D panel is a qualitative structural visualization derived from sequence composition, edit locations, and preset context. It is not a validated AlphaFold, PDB, NMR, or cryo-EM structure.
- The built-in demo sequence is synthetic and only there to test the interface.
