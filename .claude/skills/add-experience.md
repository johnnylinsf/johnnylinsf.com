---
name: add-experience
description: Add a new work experience entry to the site
user_invocable: true
---

# Add Experience

Add a new work experience entry to johnnylinsf.com.

## Steps

1. Ask the user for:
   - Company name
   - Title/role
   - Duration (e.g. "January 2026 - Present")
   - Website (optional)
   - Description bullet points (optional)

2. Add an entry to `src/data/experience.ts`
   - If the company already exists in the file, add the new role near the other roles for that company
   - Roles are auto-grouped and sorted by the ExperienceSection component

3. Run `npm run build` to verify

4. Commit with message: `Add experience: [title] at [company]`
