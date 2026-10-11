# MyTravelPath — working rules for Claude

## Git: commit and push only when told

- Do **not** commit or push on your own. Make the change, run `npm run build`, verify it
  (screenshot if visual), then stop and say it is built locally and not pushed.
- Commit and push only when the user explicitly says so ("push", "commit", "deploy").
- Before committing, run `git status` and show the user any edits of theirs that would be
  included. Their editor reformats files on save (Prettier style); that is expected.
- Every push to `main` auto-deploys to GitHub Pages via `.github/workflows/deploy.yml`.

## Commits are the user's own

- Commits are authored by the user's git identity only. Do **not** add a
  `Co-Authored-By: Claude …` trailer or any other attribution line to commit messages
  or pull requests.
- Keep commit messages short, in the imperative, describing the user-visible change.

## Supplied artwork

- When the user supplies an image (favicon, app icon, header), use it whole: scale only,
  never crop, trim or recompose. If a tighter crop would help, ask first.
- Never draw icons or illustrations by hand. Use real photos (Wikimedia Commons, with
  credit) or established icon sets (react-icons, circle-flags). See
  `.claude/skills/design/SKILL.md`.
