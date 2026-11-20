import OwnerGate from "@/components/owner-gate";
import ContactsAdmin from "./contacts-admin";

export const metadata = {
  title: "Manage submissions | Jack Ning",
};

export default function ManageSubmissions() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Contact submissions
      </h1>
      <OwnerGate>
        <ContactsAdmin />
      </OwnerGate>
    </section>
  );
}
