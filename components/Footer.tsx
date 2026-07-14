import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer
      className="mt-20"
      style={{
        borderTop: "1px solid var(--footer-border)",
        backgroundColor: "var(--footer-bg)",
      }}
    >
      <div className="mx-auto flex w-full max-w-6xl justify-center px-6 py-10 text-center">
        <p className="text-sm" style={{ color: "var(--foreground-muted)" }}>
          Designed with ❤️ by {site.name}.
        </p>
      </div>
    </footer>
  );
}
