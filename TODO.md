# TODO

- Perf optimize the dup words lookup
- Category name and entries should be tabbable
- Why buttons are not properly disabled?
- Consider `maxLength` on entry/category inputs
- Make inputs forms (wrap input + button in `<form onSubmit>` with `type="submit"`; drop manual Enter handling)
- Explore `aria-live="polite"` instead of `role="alert"` for validation errors that update as the user types
- Explore submit-gated validation: keep validation pure/derived (same compute cost as live), but only show errors after first submit attempt — gate with an `attemptedSubmit` flag so errors auto-clear as the user keeps typing
