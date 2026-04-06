---
name: add-writing
description: Add a new piece of writing (article/blog post) to the site
user_invocable: true
---

# Add Writing

Add a new article/blog post to johnnylinsf.com.

## Steps

1. Ask the user for:
   - Title
   - Content (or a URL to fetch content from)
   - Date
   - Description (1-2 sentences)

2. Generate a slug from the title (lowercase, hyphens, no special chars)

3. Count the words in the content

4. Add an entry to `src/data/writing.ts`:
   ```ts
   {
     name: "Title",
     slug: "the-slug",
     description: "Description here.",
     date: "YYYY-MM-DD",
     wordCount: N,
   },
   ```

5. Create `src/content/articles/[slug].mdx` with the content

6. Run `npm run build` to verify

7. Commit with message: `Add writing: [title]`
