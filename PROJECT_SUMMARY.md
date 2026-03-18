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
