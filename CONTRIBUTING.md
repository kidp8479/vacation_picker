# Contributing

Personal project, run like a real one. The project-agnostic bar lives in
`~/42/WIP/CLAUDE.md` (Engineering standards); this file is the local
summary.

## Workflow

- One unit of work = one branch = one PR. No direct commits to `main`.
- Rebase the branch on `main` before opening or merging the PR; keep a
  linear history (merge commits only at the actual merge).
- Re-read your own diff before merging (`/code-review`).

## Commits

- Conventional Commits: `type: summary` (`feat`, `fix`, `refactor`,
  `docs`, `build`, `ci`, `test`, `style`, `chore`).
- Atomic: one logical change per commit. The body explains *why* when the
  diff does not.
- Everything written into the repo is in English (code, comments,
  commits, docs).

## Before committing

```sh
# backend
npm --prefix backend run format:check
npm --prefix backend run lint:check
npm --prefix backend run typecheck
npm --prefix backend test

# frontend
npm --prefix frontend run format:check
npm --prefix frontend run lint:check
npm --prefix frontend run typecheck
npm --prefix frontend test
npm --prefix frontend run build
```

A husky pre-commit hook runs `lint-staged` (eslint + prettier on staged
files); pre-push runs the backend and frontend tests. CI (`.github/workflows/ci.yml`)
runs the full set above for both packages, plus a gitleaks secret scan,
on every push to `main` and every PR. Don't bypass them (`--no-verify`).

## Decisions (ADRs)

Record a structural decision (auth strategy, data-access approach,
transport, schema choice) as a short ADR under `docs/adr/NNNN-title.md`:
context / decision / consequences. A commit message or a chat thread is
not a durable record.

## Code clarity

- Comment the *why*, not the *what*. A comment that restates the
  identifier name earns nothing.
- Public surface (exported classes/methods, HTTP routes) gets a doc
  comment; obvious private code does not.
- ESLint enforces a complexity budget on the backend (`complexity` set at
  the current ceiling): split the function, don't raise the number.

## Secrets

- `.env` only (git-ignored). Never in code, git history, or a PR. Keep
  `.env.example` current with placeholder values.
- Treat a leaked secret as compromised: rotate it, don't just delete the
  line.

## Security

Before merging anything touching authentication or user data, run the
`web-security-review` skill (`~/.claude/skills/`). Every mutating route on
a user resource checks auth **and** ownership; CRUD scaffolds ship with
no guards, so lock them before merge.
