# Client project governance article

- Added a public Insights index and a generic `/insights/:slug` article route.
- Article body, metadata, sources, and AI-assistance disclosure live in `src/content/articles/client-project-governance.mdx`.
- Reused the shared header/footer, metadata pattern, and CTA. Vite compiles MDX with `@mdx-js/rollup`.
- Verify with `bun run build`, `bun run lint`, and browser checks at `/insights` and `/insights/client-project-governance`.
