import { useState } from "react";
import { EMPTY_EVENT, WEB_SAFE_COLORS, validateEvent } from "../utils/validation";

/**
 * Reusable for both create and edit. The parent supplies `onSubmit`
 * (which may throw); this component handles field state, validation,
 * and showing a submit error.
 */
export default function EventForm({
  initialValues = EMPTY_EVENT,
  submitLabel = "Add event",
  resetOnSuccess = false,
  onSubmit,
  onCancel,
}) {
  const [values, setValues] = useState({ ...EMPTY_EVENT, ...initialValues });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const found = validateEvent(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setSubmitting(true);
    setSubmitError(null);
    try {
      await onSubmit(values);
      if (resetOnSuccess) setValues(EMPTY_EVENT);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const field = (name, label, control) => (
    <div className="field">
      <label htmlFor={name}>{label}</label>
      {control}
      {errors[name] && (
        <span className="field-error" role="alert">
          {errors[name]}
        </span>
      )}
    </div>
  );

  return (
    <form onSubmit={handleSubmit} noValidate>
      {field("name", "Name",
        <input id="name" name="name" value={values.name} onChange={handleChange} />)}
      {field("description", "Description",
        <textarea id="description" name="description" rows={3}
          value={values.description} onChange={handleChange} />)}
      {field("company", "Company",
        <input id="company" name="company" value={values.company} onChange={handleChange} />)}
      {field("color", "Color",
        <select id="color" name="color" value={values.color} onChange={handleChange}>
          <option value="">Select a color</option>
          {WEB_SAFE_COLORS.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>)}

      {submitError && <p role="alert" className="error">{submitError}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Saving…" : submitLabel}
      </button>
      {onCancel && (
        <button type="button" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
}
