import { SORTS } from "../lib/books.js";

const fieldClass =
  "h-10 w-full rounded-lg border border-line bg-field px-3 text-sm text-ink transition-colors placeholder:text-muted/70 hover:border-accent/40 focus:border-accent focus:ring-2 focus:ring-accent/20 focus:outline-none";

const labelClass = "flex flex-col gap-1.5 text-xs font-medium uppercase tracking-wider text-muted";

const Chevron = () => (
  <svg viewBox="0 0 20 20" className="pointer-events-none absolute right-3 top-1/2 size-4 -translate-y-1/2 text-muted" fill="currentColor">
    <path d="M5.2 7.6a.75.75 0 0 1 1.06.04L10 11.6l3.74-3.96a.75.75 0 1 1 1.1 1.02l-4.3 4.55a.75.75 0 0 1-1.1 0l-4.3-4.55a.75.75 0 0 1 .06-1.06z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 20 20" className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
    <circle cx="9" cy="9" r="6" />
    <path d="m14 14 3.5 3.5" />
  </svg>
);

const Select = ({ label, value, onChange, options, allLabel }) => (
  <label className={labelClass}>
    {label}
    <span className="relative">
      <select
        className={`${fieldClass} cursor-pointer appearance-none pr-9 normal-case tracking-normal`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {allLabel && <option value="">{allLabel}</option>}
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.label}
          </option>
        ))}
      </select>
      <Chevron />
    </span>
  </label>
);

const sortOptions = Object.entries(SORTS).map(([id, { label }]) => ({ id, label }));

const Controls = ({ filters, setFilter, options, count, total, onClear }) => {
  const active = filters.query || filters.author || filters.country || filters.era;

  return (
    <div className="w-full rounded-2xl border border-line bg-surface p-4 font-sans shadow-sm backdrop-blur-md">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-[2fr_1.5fr_1fr_1fr_1.3fr]">
        <label className={`${labelClass} col-span-2 md:col-span-1`}>
          Buscar
          <span className="relative">
            <SearchIcon />
            <input
              type="search"
              className={`${fieldClass} pl-9 normal-case tracking-normal`}
              placeholder="Título o autor"
              value={filters.query}
              onChange={(e) => setFilter("query", e.target.value)}
            />
          </span>
        </label>
        <Select
          label="Autor"
          value={filters.author}
          onChange={(value) => setFilter("author", value)}
          options={options.authors}
          allLabel="Todos"
        />
        <Select
          label="País"
          value={filters.country}
          onChange={(value) => setFilter("country", value)}
          options={options.countries}
          allLabel="Todos"
        />
        <Select
          label="Época"
          value={filters.era}
          onChange={(value) => setFilter("era", value)}
          options={options.eras}
          allLabel="Todas"
        />
        <Select
          label="Ordenar"
          value={filters.sort}
          onChange={(value) => setFilter("sort", value)}
          options={sortOptions}
        />
      </div>

      <div className="mt-3 flex h-6 items-center justify-between text-sm text-muted">
        <span>
          {count === total ? `${total} libros` : `${count} de ${total} libros`}
        </span>
        {active && (
          <button
            type="button"
            className="cursor-pointer rounded-full px-3 py-0.5 text-accent transition-colors hover:bg-accent/10"
            onClick={onClear}
          >
            Limpiar filtros
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
