# Contributing to es6-fuzz

Thanks for your interest in improving es6-fuzz! This guide covers the local
workflow and the conventions used in this repository.

## Prerequisites

- Node.js 22+ (see `engines` in [package.json](package.json))
- npm

`package-lock.json` is intentionally not committed, so use `npm install`
(not `npm ci`).

## Getting started

```bash
git clone https://github.com/sebs/es6-fuzz.git
cd es6-fuzz
npm install
npm test
```

## Common scripts

| Script | What it does |
| --- | --- |
| `npm run build` | Clean `lib/` and compile TypeScript |
| `npm test` | Build, then run the test suite |
| `npm run test:coverage` | Run the suite with a coverage report |
| `npm run check` | Strict type-check (`tsc --noEmit`) without emitting |
| `npm run docs` | Generate the TypeDoc API site into `out/` |
| `npm run render-examples` | Render fuzzifier SVGs + viewer into `examples/` |

Generated output (`lib/`, `out/`, `docs/CHANGELOG.md`, `examples/`) is not
committed — it is produced by the build and CI pipeline.

## Tests

Tests use the built-in Node.js test runner (`node:test`) executed via `tsx`,
and live under [test/](test/). Test files import from the compiled `lib/`
output, which is why `npm test` builds first. Please add or update tests for any
behavior change, and keep the suite green:

```bash
npm test
npm run check
```

## Coding conventions

- TypeScript in `strict` mode — no new type errors (`npm run check`).
- Each fuzzifier implements the `Fuzzify` contract in
  [src/curve/fuzzifier.ts](src/curve/fuzzifier.ts) and maps a crisp input to a
  membership degree in `0..1`.
- Match the style of the surrounding code.

## Commit messages

This project uses [Conventional Commits](https://www.conventionalcommits.org/)
prefixes — e.g. `feat:`, `fix:`, `chore:`, `ci:`, `build:`, `refactor:`,
`docs:`. Keep commits focused and the subject line imperative.

## Submitting changes

1. Fork and branch from `master`.
2. Make your change with tests and passing `npm test` / `npm run check`.
3. Open a pull request describing the change and the motivation.

CI runs the test suite and the strict type-check on Node 22 and 24
(see [.github/workflows/ci.yml](.github/workflows/ci.yml)).

## Releases

Maintainers release by bumping the version, which creates a matching tag:

```bash
npm version <patch|minor|major>   # postversion pushes the commit + tag
```

Pushing the `v*` tag triggers the release workflow (builds, packs, and
generates release notes); publishing to npm is a separate, manually dispatched
workflow.

## License

By contributing you agree that your contributions are licensed under the
project's [MIT License](LICENSE.md).
