import OwnerLink from "@/components/owner-link";
import ContactForm from "./contact-form";

export const metadata = {
  title: "Contact | Jack Ning",
};

export default function Contact() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Contact
      </h1>
      <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
        Want to talk about edge AI, crypto, or an opportunity? Send me a
        message via the API and I&apos;ll get back to you.
      </p>
      <ContactForm />
      <OwnerLink
        href="/admin/contacts"
        className="mt-6 inline-block text-sm font-medium text-zinc-500 underline underline-offset-2 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
      >
        Manage submissions →
      </OwnerLink>
    </section>
  );
}
