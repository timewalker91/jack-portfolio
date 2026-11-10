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
