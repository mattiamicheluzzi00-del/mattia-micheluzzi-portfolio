import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-4 text-ink">
      <section className="max-w-md text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-zinc-500">
          Pagina non trovata
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-normal">
          Mattia Micheluzzi
        </h1>
        <p className="mt-4 leading-7 text-zinc-600">
          La pagina che stai cercando non e disponibile.
        </p>
        <Link
          href="/"
          className="mt-7 inline-flex h-12 items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white transition hover:bg-zinc-800"
        >
          Torna alla home
        </Link>
      </section>
    </main>
  );
}
