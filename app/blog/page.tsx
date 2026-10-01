import {
  BarChart3,
  Blocks,
  BrainCircuit,
  Compass,
  Landmark,
  WalletCards,
} from "lucide-react";

const writingTopics = [
  { name: "Data & Analytics", icon: BarChart3, accent: "#6366f1" },
  { name: "Economics", icon: Landmark, accent: "#14b8a6" },
  { name: "Finance", icon: WalletCards, accent: "#f59e0b" },
  { name: "Decision-Making", icon: Compass, accent: "#8b5cf6" },
  { name: "AI", icon: BrainCircuit, accent: "#f97316" },
  { name: "Building EconIQ", icon: Blocks, accent: "#22c55e" },
] as const;

export default function BlogIndexPage() {
  return (
    <main id="content" style={{ backgroundColor: "var(--background)", color: "var(--foreground)" }}>
      <section className="border-b" style={{ borderColor: "var(--section-border)" }}>
        <div className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
          <div className="max-w-3xl">
            <p
              className="text-[11px] font-semibold uppercase tracking-[0.28em]"
              style={{ color: "var(--foreground-muted)" }}
            >
              BLOG
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
              Ideas in progress.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed" style={{ color: "var(--foreground-muted)" }}>
              A space for thoughts, ideas, and questions I&apos;m researching, exploring, and thinking through.
            </p>
          </div>

          <div className="mt-8 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--foreground-muted)" }}>
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: "var(--link-accent)" }} aria-hidden="true" />
            WRITING IN PROGRESS
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-6xl px-6 py-16 md:px-10 lg:px-12 lg:py-20">
        <div className="mb-8">
          <p
            className="text-[11px] font-semibold uppercase tracking-[0.28em]"
            style={{ color: "var(--foreground-muted)" }}
          >
            WRITING ABOUT
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {writingTopics.map(({ name, icon: Icon, accent }) => (
            <div
              key={name}
              className="rounded-2xl border p-5 transition-colors"
              style={{
                borderColor: "var(--card-border)",
                backgroundColor: "var(--card-bg)",
              }}
            >
              <div
                className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl border"
                style={{
                  borderColor: "var(--card-border)",
                  backgroundColor: "color-mix(in srgb, var(--card-bg) 80%, white 20%)",
                }}
              >
                <Icon className="h-4 w-4" style={{ color: accent }} aria-hidden="true" />
              </div>
              <p className="text-sm font-medium" style={{ color: "var(--foreground)" }}>
                {name}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

