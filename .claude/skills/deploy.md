---
name: deploy
description: Build, commit, and push changes to deploy the site
user_invocable: true
---

# Deploy

Build, commit, and push all pending changes to deploy to Vercel.

## Steps

1. Run `npm run build` to verify the build passes

2. If build fails, fix the errors first

3. Run `git status` to see what changed

4. Stage the relevant files (avoid staging `.env`, credentials, or `node_modules`)

5. Create a commit with a descriptive message

6. Push to `origin main`

7. Report the push result to the user
