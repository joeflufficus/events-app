// Pure validation logic, kept separate from the UI so it is easy to test.
export const WEB_SAFE_COLORS = [
  "red", "orange", "yellow", "green", "blue", "purple", "pink", "brown", "gray", "black",
];

export const EMPTY_EVENT = { name: "", description: "", company: "", color: "" };

export function validateEvent(values) {
  const errors = {};
  const name = values.name.trim();
  const description = values.description.trim();
  const company = values.company.trim();

  if (!name) errors.name = "Name is required.";
  else if (name.length > 60) errors.name = "Name must be 60 characters or fewer.";

  if (!description) errors.description = "Description is required.";
  else if (description.length < 10)
    errors.description = "Description must be at least 10 characters.";
  else if (description.length > 500)
    errors.description = "Description must be 500 characters or fewer.";

  if (!company) errors.company = "Company is required.";
  else if (company.length > 60) errors.company = "Company must be 60 characters or fewer.";

  if (!WEB_SAFE_COLORS.includes(values.color)) errors.color = "Choose a color.";

  return errors;
}
