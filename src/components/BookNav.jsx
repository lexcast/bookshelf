import { VIEWS, stepView } from "../lib/views.js";

const buttonClass =
  "flex size-9 cursor-pointer items-center justify-center rounded-full text-ink transition-colors hover:bg-accent/15 disabled:cursor-default disabled:opacity-30 disabled:hover:bg-transparent";

const Arrow = ({ flip }) => (
  <svg viewBox="0 0 20 20" className={`size-5 ${flip ? "rotate-180" : ""}`} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 5-5 5 5 5" />
  </svg>
);

const BookNav = ({ view, onStep, onClose }) => (
  <nav
    aria-label="Libro abierto"
    className="fixed bottom-6 left-1/2 z-60 flex -translate-x-1/2 animate-fade-in items-center gap-1 rounded-full border border-line bg-field p-1 font-sans shadow-xl backdrop-blur-md"
  >
    <button type="button" className={buttonClass} disabled={!stepView(view, -1)} onClick={() => onStep(-1)} aria-label="Anterior">
      <Arrow />
    </button>

    <ol className="flex items-center gap-1 px-1 text-sm">
      {VIEWS.map(({ id, label }) => (
        <li
          key={id}
          aria-current={id === view ? "step" : undefined}
          className={id === view ? "rounded-full bg-accent/15 px-3 py-1 font-medium text-accent" : "hidden px-2 text-muted sm:block"}
        >
          {label}
        </li>
      ))}
    </ol>

    <button type="button" className={buttonClass} disabled={!stepView(view, 1)} onClick={() => onStep(1)} aria-label="Siguiente">
      <Arrow flip />
    </button>

    <span className="mx-1 h-5 w-px bg-line" />

    <button type="button" className={buttonClass} onClick={onClose} aria-label="Guardar libro" title="Guardar libro (Esc)">
      <svg viewBox="0 0 20 20" className="size-4" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
        <path d="m5 5 10 10M15 5 5 15" />
      </svg>
    </button>
  </nav>
);

export default BookNav;
