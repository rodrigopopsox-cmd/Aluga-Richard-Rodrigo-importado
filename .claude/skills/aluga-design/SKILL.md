---
name: aluga-design
description: Use this skill to generate well-branded interfaces and assets for Aluga, either for production or throwaway prototypes/mocks/etc. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for protoyping.
user-invocable: true
---

Read `DESIGN.md` at the repository root (tokens + visual contract), then `design-system/README.md` (library map) and `design-system/guidelines/brand.md` (full brand guideline), and explore the other files in `design-system/`.
If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out of `design-system/assets/images` and create static HTML files for the user to view (link `design-system/reference/styles.css` for the tokens). If working on production code, use the React components from `@design-system` and follow `AGENTS.md` — never hardcode colors, fonts, spacing or radii.
If the user invokes this skill without any other guidance, ask them what they want to build or design, ask some questions, and act as an expert designer who outputs HTML artifacts _or_ production code, depending on the need.
