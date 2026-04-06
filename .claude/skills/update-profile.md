---
name: update-profile
description: Update bio, highlights, contact info, or other profile details
user_invocable: true
---

# Update Profile

Update profile information on johnnylinsf.com.

## Steps

1. Read `src/data/profile.ts` to see current values

2. Ask the user what they want to change (bio, highlights, contact, location)

3. Edit `src/data/profile.ts` with the changes
   - Highlights support markdown links: `[text](url)` for external, `[text](/path)` for internal

4. Run `npm run build` to verify

5. Commit with message: `Update profile: [what changed]`
