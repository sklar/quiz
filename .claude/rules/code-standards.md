# Code Standards

This project uses **Biome** for formatting and linting.

## Quick Reference

- **Check for issues**: `pnpm biome check`
- **Auto-fix**: `pnpm biome check --write`

Most issues are automatically fixable.

---

## Astro & MDX

- Astro components (`.astro`) use frontmatter fences (`---`) for server-side logic
- MDX files support JSX components — import them at the top after frontmatter
- Avoid `<->`, `<=>` and similar angle-bracket patterns in MDX text — use Unicode arrows
