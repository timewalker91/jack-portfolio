import OwnerGate from "@/components/owner-gate";
import AdminDashboard from "./admin-dashboard";

export const metadata = {
  title: "Owner | Jack Ning",
};

export default function Admin() {
  return (
    <section className="mx-auto w-full max-w-5xl flex-1 px-6 py-24">
      <h1 className="text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50">
        Owner
      </h1>
      <OwnerGate>
        <AdminDashboard />
      </OwnerGate>
    </section>
  );
}
