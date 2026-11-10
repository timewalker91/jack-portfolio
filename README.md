# Jack (Kunjun) Ning — Personal Portfolio

Personal portfolio website for Jack (Kunjun) Ning, STEM MBA candidate in Silicon Valley with 7 years of pre-MBA experience in crypto investment and business development, interested in edge AI wearables and multimodal memory/companion devices.

Built with [Next.js](https://nextjs.org) (App Router, Server Actions), React, TypeScript, and Tailwind CSS.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # run ESLint
```

## Routes

| Route | Description |
| --- | --- |
| `/` | Homepage introducing Jack |
| `/about-me` | Education, experience, and skills |
| `/projects` | Project index |
| `/projects/aide-commerce` | Aide-commerce — AI shopping agent safety (AWS x A10 Hack 2026) |
| `/projects/products-cli` | Product Inventory CLI — Python CRUD tool |
| `/contact-me-server-form` | Contact form |

## Contact Form

The contact page uses a Next.js Server Action to validate and store submissions.

- **Fields:** Name, Email, Message
- **Validation:**
  - Name and message can't be empty
  - Email must contain exactly one `@`, have text before it, contain no spaces, and have a domain with a dot and no empty parts between dots
- Invalid input returns an error message under each bad field.
- Valid submissions are appended (with an ISO timestamp) to `data/contact-submissions.json`, and the site shows a success message.

## Project Structure

```
src/
├── app/                        # App Router pages
│   ├── page.tsx                # Homepage
│   ├── about-me/
│   ├── projects/
│   │   ├── page.tsx            # Project index
│   │   └── [slug]/page.tsx     # Dynamically routed project details
│   └── contact-me-server-form/ # Contact page, server action, client form
├── components/
│   └── Navbar.tsx              # Nav bar with active-link highlighting
└── lib/
    └── projects.ts             # Shared project data
data/
└── contact-submissions.json    # Contact form submissions
```
