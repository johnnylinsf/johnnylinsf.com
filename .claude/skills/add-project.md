---
name: add-project
description: Add a new project to the site
user_invocable: true
---

# Add Project

Add a new project to johnnylinsf.com.

## Steps

1. Ask the user for:
   - Project name
   - Status (current or past)
   - Start date (and end date if past)
   - Description
   - Tech stack (list)
   - Link (optional)
   - Related article slugs (optional)

2. Generate a slug from the name

3. Add an entry to `src/data/projects.ts`

4. Run `npm run build` to verify

5. Commit with message: `Add project: [name]`
