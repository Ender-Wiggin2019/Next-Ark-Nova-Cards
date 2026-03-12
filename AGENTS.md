## Rules

1. **Never modify game card styles** — Animal, Sponsor, Endgame, Project, and Action card components have their own domain-specific styling via `arknova.css`
2. **Use semantic tokens** — Prefer `bg-background`, `text-foreground`, `bg-primary`, `border-border` over hardcoded color values
3. **Maintain glass-morphism** — Floating panels use `backdrop-blur-md` + gradient backgrounds + subtle ring borders
4. **Respect the neutral shift** — Use sage-tinted neutrals, not pure grays, for all non-card UI
5. **Keep accessibility** — Maintain sufficient contrast ratios in both light and dark modes
6. **Use shadcn Button consistently** — Prefer `@/components/ui/button` for clickable button interactions instead of raw `<button>` unless there is a strict technical limitation
