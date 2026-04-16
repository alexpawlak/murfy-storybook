# Project Summary: murfy-storybook

This project is a design system and component library for the `murfy.fr` website redesign, built using Storybook. It serves as the single source of truth for UI components, ensuring consistency and facilitating development and testing.

## Key Technologies

*   **Framework:** React (using Vite for the build tool)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS
*   **Component Library:** Storybook
*   **Design Tokens:** A custom design token system is used, with tokens defined in JSON files (`tokens.json`, `tokens_base.json`) and processed into CSS variables.

## Project Structure

The project follows an **atomic design** methodology, with components organized into the following categories:

*   **Foundation:** Base styles, design tokens, colors, typography, and spacing.
*   **Atoms:** The smallest, indivisible UI elements (e.g., `Button`, `Input`, `Tag`).
*   **Molecules:** Simple combinations of atoms (e.g., `NavItem`, `PostalCodeForm`, `ServiceCard`).
*   **Organisms:** More complex UI components composed of molecules and/or atoms.
*   **Templates:** Page-level layouts.
*   **Pages:** Full page examples.

Component files are located in `src/`, with Storybook stories co-located with their respective components. The main introduction and documentation for the design system is in `src/Introduction.mdx`.

## Theming and Accents

A key feature of this design system is its support for multiple themes and "accents".

*   **Themes:** The system supports multiple themes (e.g., `light`, `dark`, `pink-vivid`), which can be applied using the `data-theme` attribute.
*   **Accents:** The system also supports "accents," which are variations in the theme for different business verticals (e.g., "Chauffage", "Solaire"). These are applied using the `data-accent` attribute.

This allows the same component to be reused across different parts of the website with different visual styles, while maintaining a consistent look and feel.

## How I Built The Figma Design System And Storybook

I built the design system by starting with foundations first rather than jumping straight into components. In Figma, I defined the visual rules for color, typography, spacing, radius, themes, and Murfy's vertical-specific accent system so the UI could scale consistently across électroménager, chauffage, and solaire. That gave me a reusable token layer before any component work began.

From there, I mirrored that system into code through `tokens.json`, which became the source of truth for design tokens. I created a build pipeline in `scripts/build-tokens.ts` that transforms those tokens into `src/styles/tokens.css` and regenerates the Tailwind theme configuration. This meant the same semantic decisions made in Figma were available in React as CSS variables, with support for 5 themes and 4 accent variants without rewriting component code.

Once the token layer was stable, I built the UI library in Storybook using React, TypeScript, Tailwind, and an atomic design structure. I documented foundations, then assembled atoms, molecules, organisms, and page templates, with stories colocated next to each component so the system stayed inspectable and easy to extend. Storybook became both the testing environment and the documentation layer, especially for accessibility, naming conventions, responsive behavior, and content guidance.

I also connected the codebase back to the Figma file using Figma Code Connect, which helped keep design and implementation aligned. The result was a workflow where Figma defined the system, tokens translated it into code, and Storybook turned it into a usable component library that stakeholders and developers could review before anything shipped to `murfy.fr`.

## Portfolio Summary

For this project, I created a full design-system workflow linking Figma and Storybook. I started by structuring the foundations in Figma, translated those decisions into a token pipeline in code, and then built a reusable React component library documented in Storybook. The outcome was a shared source of truth for Murfy's UI, with theming, accent variations, accessibility guidance, and a clearer handoff between design and development.
