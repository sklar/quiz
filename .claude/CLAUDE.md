# Qwiz

Playground for comparing popular JS frameworks side by side.

## Tech Stack

- **Package manager**: pnpm
- **Language**: TypeScript (strict mode)
- **Website**: Astro 6
- **Linting/Formatting**: Biome

## File Names (website content pages)

- kebab-case, no diacritics
- File name = URL slug
- Frontmatter: camelCase for custom variables

## MDX — Known Issues

- `<->` and similar `<` patterns in text break JSX parser → use Unicode arrows (`↔`, `→`, `←`)
