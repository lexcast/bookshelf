import { SORTS } from "../lib/books.js";

const fieldClass =
  "h-9 rounded border border-amber-900/20 bg-white/70 px-3 text-sm text-stone-800 focus:border-amber-700 focus:outline-none";

const Select = ({ label, value, onChange, options, allLabel }) => (
  <label className="flex flex-col gap-1 text-xs text-stone-600">
    {label}
    <select className={fieldClass} value={value} onChange={(e) => onChange(e.target.value)}>
      {allLabel && <option value="">{allLabel}</option>}
      {options.map((option) => (
        <option key={option.id} value={option.id}>
          {option.label}
        </option>
      ))}
    </select>
  </label>
);

const sortOptions = Object.entries(SORTS).map(([id, { label }]) => ({ id, label }));

const Controls = ({ filters, setFilter, options, count, total, onClear }) => {
  const active = filters.query || filters.author || filters.country || filters.era;

  return (
    <div className="flex flex-wrap items-end justify-center gap-3 font-sans">
      <label className="flex flex-col gap-1 text-xs text-stone-600">
        Buscar
        <input
          type="search"
          className={`${fieldClass} w-56`}
          placeholder="Título o autor"
          value={filters.query}
          onChange={(e) => setFilter("query", e.target.value)}
        />
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

      <div className="flex h-9 items-center gap-3 text-sm text-stone-600">
        <span>
          {count === total ? `${total} libros` : `${count} de ${total} libros`}
        </span>
        {active && (
          <button
            type="button"
            className="cursor-pointer text-amber-800 underline hover:text-amber-950"
            onClick={onClear}
          >
            Limpiar
          </button>
        )}
      </div>
    </div>
  );
};

export default Controls;
