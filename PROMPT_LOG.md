# Prompt Log

Prompts used to build this portfolio website with an AI coding assistant, in order.

## 1. Scaffold the app, navbar, and homepage

> I want to build my personal portfolio website. Let's do it step by step. First of all, create a new Next.js app called portfolio. Then add a nav bar with links to Home, About me, Projects and Contact. Make the homepage introducing me: Jack(Kunjun) Ning. STEM MBA candidate in Silicon Valley with 7 years of pre-MBA experience in crypto investment and business development. Interested in edge AI wearables and multimodal memory/companion devices.

Result: Created the Next.js (TypeScript, Tailwind) app, a `Navbar` component with active-link highlighting, and a homepage hero introducing Jack.

## 2. About Me page

> Ok, now create About me page using the information I give you: Education: STEM MBA, Leavey School of Business, Santa Clara University. Experience: Business Development manager at MEXC Global; Investment Manager at OKX Ventures; Business Manager at Mindfulness Capital; Project manager at FutureMoney. Skills: Data analysis; AI coding agents; strategic operation; due diligence; strategic marketing.

Result: About page with an experience timeline, education section, and skill pills.

## 3. Route fixes and dynamic project pages

> Commit what we have so far. Routes fix: Landing page at /, About Me at /about-me. Put my projects at /projects. Put two dynamically routed projects at /projects/aide-commerce and /projects/products-cli. In aide-commerce put: Aide-commerce — built with a team of 4 at AWS x A10 Hack 2026. Gives an AI shopping agent its own identity, checks every action it takes, and lets the user stop it mid-task; its next request is refused in about 0.7 seconds. Tech: Python, React, AWS (Cognito, KMS, DynamoDB, Bedrock). In products-cli put: Product Inventory CLI — a Python command-line tool (products.py) with add, list, get, update and delete commands, saving product records to a JSON file.

Result: First commit; moved About to `/about-me`; `/projects` index plus a dynamically routed `/projects/[slug]` detail page for the two projects.

## 4. Commit

> Yes, commit

Result: Committed the route fixes and project pages.

## 5. Richer project details

> Put more details in every project's details using the information that I give you, not just copy the project describe on project page.

Result: Each project gained an overview paragraph and a "What it does" feature breakdown on its detail page; the index cards kept the short summary.

## 6. Contact page and server-side form

> Route fix: contact page at /contact-me-server-form. Now build the contact form. The form has components: Name, Email and Message field. Validate the inputs: name and message can't be empty; email must have exactly one @, must have text before @, a domain with a dot and no empty parts between dots, and no spaces. If input is invalid, returns an error message for each bad field. If valid, adds the submission with a timestamp to data/contact-submissions.json and returns success on the website.

Result: Contact page moved to `/contact-me-server-form`; server action validates inputs, returns per-field errors, appends timestamped submissions to `data/contact-submissions.json`, and shows a success message. Verified end-to-end with automated browser tests (27/27 checks).

## 7. Commit

> commit

Result: Committed the contact form work.

## 8. Documentation

> Create a README.md and prompt log file. Commit

Result: Added this prompt log and the project README, then committed both.

## 9. Critique of the AI's work

> Create CRITIQUE.md with the text: Critique 1. Routes — src/app/about-me/page.tsx (commit 0f16d8e), src/app/contact-me-server-form (commit 1cf6e7f). Viber proposed: /about and /contact (commit 9cd5cc8). I changed: renamed them to /about-me and /contact-me-server-form. Why: those are the required URLs. Check: opened /about-me and /contact-me-server-form → both load. 2. Contact validation — src/app/contact-me-server-form/actions.ts (commit 1cf6e7f). Viber proposed: a Server Action that validates name, email and message and saves valid entries. I kept it after testing. Why: the server must reject bad input, not just the browser. Check: submitted blank name, a@b..com, a valid entry → red errors for the bad ones; the valid one showed success and appeared in data/contact-submissions.json.

Result: Added CRITIQUE.md documenting route fixes I requested and the contact validation I kept after testing.

## 10. Publish

> Update the prompt log file. Commit and push this to a new public GitHub repo called jack-portfolio.

Result: Updated this log, committed, and pushed the site to the public GitHub repo `jack-portfolio`.

## 11. Contact page with a client-side form and API

> Add a new /contact-me page with the same components of name, email and message. Build a API to support a POST request to /api/contacts. The page makes a call to /api/contacts, and store all contact information as the server form submissions in a JSON.

Result: Added the `/contact-me` page (client-side fetch form) and a `POST /api/contacts` route that reuses the same validation and stores to the same JSON file as the server-form submissions. Verified with automated browser and API tests.

## 12. Commit and the missing nav entrance

> Commit. But where is the entrance of this new /contact-me page? I can't see the entrance on the page.

Result: Committed, and added a "Contact API" link to the top bar so the page is reachable from the nav.

## 13. Blog admin page and API

> Create an /admin/blogs page. Build the UX to create a blog post including title and content sections, which will POST to /api/blogs, build the API to support a POST request to /api/blogs. Save the successful blog submissions to a JSON file. Commit.

Result: Added the `/admin/blogs` create-post form and a `POST /api/blogs` route that validates title/content and saves posts (id + timestamp) to `data/blog-posts.json`.

## 14. Blog list page and dynamic post routes

> Make the /admin/blogs page Blog on nav bar. Add a new /blogs page that makes an API call to /api/blogs. Make this new page Blog API on nav bar. Build the API to support a GET request to /api/blogs to populate /blog-posts and show the blogs on /blogs. Apply dynamic routing to all the blog post. Commit.

Result: Added `GET /api/blogs`, a `/blogs` list page loaded via the API, dynamically routed `/blogs/[id]` post pages, and "Blog" / "Blog API" nav links.

## 15. Blog cleanup, seeded posts, contact API parity

> At Blog page, you don't need to say Published posts are saved to data/blog-posts.json at the front end. Fix it. Create two random new blogs according to the information I provided. Using the same rules of contact format to Contact API page. Use the same returns as Contact page when the input is wrong. Make Blog page a subpage in Blog API called New Post to create new posts, and remove it from nav bar. Change the name Blog API to Blog.

Result: Removed the data-file mention from the UI, seeded two blog posts written from the background information provided, confirmed both contact forms return identical errors, moved the create page to `/blogs/new` ("New Post" subpage with a button on the blog list), and renamed the nav label to "Blog".

## 16. Prompt log and critique update

> Create a prompt log file. Update CRITIQUE.md with the text: [critique items 3 and 4 about the missing contact link and the confusing top-bar labels]. Commit.

Result: Updated this log with all entries since the last update and appended critique items 3 and 4 to CRITIQUE.md, then committed.

## 17. Move the create page back to /admin/blogs

> Keep the front end as it is, but move the new post page back from /blogs/new to /admin/blogs. Then update prompt.md. Commit.

Result: Moved the create-post page back to `/admin/blogs` (keeping the "New Post" heading and UI); the "New Post" button on the blog list now points there, and the top bar still has the single "Blog" link to the list.

