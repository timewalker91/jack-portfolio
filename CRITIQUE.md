# Critique

## 1. Routes — src/app/about-me/page.tsx (commit 0f16d8e), src/app/contact-me-server-form (commit 1cf6e7f)

Viber proposed: /about and /contact (commit 9cd5cc8).

I changed: renamed them to /about-me and /contact-me-server-form.

Why: those are the required URLs.

Check: opened /about-me and /contact-me-server-form → both load.

## 2. Contact validation — src/app/contact-me-server-form/actions.ts (commit 1cf6e7f)

Viber proposed: a Server Action that validates name, email and message and saves valid entries.

I kept it after testing.

Why: the server must reject bad input, not just the browser.

Check: submitted blank name, a@b..com, a valid entry → red errors for the bad ones; the valid one showed success and appeared in data/contact-submissions.json.

## 3. New contact page had no link — src/components/Navbar.tsx (commit 61f8f42)

Viber proposed: built the new /contact-me page and /api/contacts, but at first did not add the page to the top bar.

What happened: after refreshing the site I could not find the new contact page; it only opened when I typed localhost:3000/contact-me.

Changed: a "Contact API" link was added to the top bar in commit 61f8f42.

Why: a visitor (or grader) should be able to reach every page from the top bar.

Check: refreshed the site and clicked "Contact API" → /contact-me opens.

## 4. Confusing top-bar labels — src/components/Navbar.tsx (commit 9711a9d)

Viber proposed: two new links, "Blog" → /admin/blogs (the page for writing a post) and "Blog API" → /blogs (the list of posts).

My judgment: with "Contact" / "Contact API" and "Blog" / "Blog API", the top bar looks like it has duplicate pages, and "Blog" opens the writing page, not the reading list.

Kept for this submission: the links work, so I kept them because of the deadline; a later fix is to name them by what each page does (e.g. "Blog" and "New Post").

Check: clicked "Blog" → /admin/blogs (form); clicked "Blog API" → /blogs (list).

Update (commit a9a431f): the "later fix" above has already been applied — the top bar now has a single "Blog" link to the list, the writing page moved to a "New Post" subpage at /blogs/new (linked from a button on the blog list), and /admin/blogs was removed from the top bar.
