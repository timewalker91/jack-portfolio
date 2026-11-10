const experience = [
  { role: "Business Development Manager", company: "MEXC Global" },
  { role: "Investment Manager", company: "OKX Ventures" },
  { role: "Business Manager", company: "Mindfulness Capital" },
  { role: "Project Manager", company: "FutureMoney" },
];

const skills = [
  "Data Analysis",
  "AI Coding Agents",
  "Strategic Operation",
  "Due Diligence",
  "Strategic Marketing",
];

export const metadata = {
  title: "About Me | Jack Ning",
};

export default function About() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        About Me
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        I&apos;m Jack (Kunjun) Ning, a STEM MBA candidate at the Leavey School
        of Business, Santa Clara University. Over the past 7 years I&apos;ve
        worked across crypto investment and business development — from global
        exchanges and venture funds to capital firms — and I&apos;m now focused
        on edge AI wearables and multimodal memory/companion devices.
      </p>

      <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,1fr)_280px] lg:gap-16">
        <div className="space-y-14">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Experience
            </h2>
            <ol className="mt-6 space-y-8 border-l border-zinc-200 pl-6 dark:border-zinc-800">
              {experience.map(({ role, company }) => (
                <li key={company} className="relative">
                  <span className="absolute -left-[30px] top-1.5 h-2.5 w-2.5 rounded-full bg-zinc-900 dark:bg-zinc-100" />
                  <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                    {role}
                  </h3>
                  <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                    {company}
                  </p>
                </li>
              ))}
            </ol>
          </div>

          <div>
            <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Education
            </h2>
            <div className="mt-6">
              <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
                STEM MBA
              </h3>
              <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                Leavey School of Business, Santa Clara University
              </p>
            </div>
          </div>
        </div>

        <aside>
          <h2 className="text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Skills
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2 lg:flex-col lg:items-start">
            {skills.map((skill) => (
              <li
                key={skill}
                className="rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-sm font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
              >
                {skill}
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
