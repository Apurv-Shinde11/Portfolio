import { site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-900/80 bg-zinc-950/95 mt-20">
      <div className="mx-auto flex w-full max-w-6xl justify-center px-6 py-10 text-center">

        <p className="text-sm text-zinc-500">
          Designed with ❤️ by {site.name}.
        </p>

      </div>
    </footer>
  );
}