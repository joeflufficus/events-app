// Returns a new array sorted by company name, case-insensitive.
export const sortByCompany = (events) =>
  [...events].sort((a, b) =>
    (a.company || "").localeCompare(b.company || "", undefined, { sensitivity: "base" })
  );
