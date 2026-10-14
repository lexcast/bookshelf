// Faces of an open book, in the order clicking turns it
export const VIEWS = [
  { id: "front", label: "Portada" },
  { id: "inside", label: "Interior" },
  { id: "back", label: "Contraportada" },
];

// The face next to the current one, null past either end
export const stepView = (view, delta) =>
  VIEWS[VIEWS.findIndex((v) => v.id === view) + delta]?.id ?? null;
