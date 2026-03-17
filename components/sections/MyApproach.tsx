const steps = [
  {
    label: "01 · Identify inefficiency",
    title: "Find the friction in the workflow.",
    body: "Start from real bottlenecks—manual reporting, fragmented spreadsheets, repeated checks—and define clear before/after states.",
  },
  {
    label: "02 · Structure the problem",
    title: "Turn chaos into a model.",
    body: "Map entities, inputs, and decisions into a structured data model and process flow that is easy to reason about.",
  },
  {
    label: "03 · Build automated solution",
    title: "Ship a repeatable system.",
    body: "Use code, queries, and templates to create an automated pipeline or tool that runs reliably, not just once.",
  },
  {
    label: "04 · Deploy & optimize",
    title: "Measure impact, refine, iterate.",
    body: "Add logging, validation, and simple metrics so the system can be monitored, trusted, and improved over time.",
  },
];

export default function MyApproach() {
  return (
    <section
      id="approach"
      className="border-t border-zinc-900/80 bg-zinc-950/95"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-zinc-500">
              My Approach
            </p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-zinc-50 md:text-3xl">
              A systems mindset for analytics and automation.
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-zinc-400">
            I don&apos;t just answer one‑off questions—I design{" "}
            <span className="font-medium text-zinc-100">
              end‑to‑end analytical systems
            </span>{" "}
            that can be reused, trusted, and extended by teams.
          </p>
        </div>

        <div className="relative mt-4">
          <div className="pointer-events-none absolute inset-x-6 top-6 hidden h-px bg-gradient-to-r from-transparent via-zinc-700/70 to-transparent md:block" />
          <div className="grid gap-6 md:grid-cols-4">
            {steps.map((step) => (
              <div
                key={step.label}
                className="relative rounded-2xl border border-zinc-800/80 bg-zinc-950/80 p-4"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  {step.label}
                </p>
                <p className="mt-2 text-sm font-medium text-zinc-100">
                  {step.title}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

