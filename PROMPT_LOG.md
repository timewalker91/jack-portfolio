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
