# Project memory

## Product intent & audience

- Travel/tourism booking platform with package browsing, visa assistance, checkout, and user account/bookings.
- Two sides: public-facing storefront (implemented) and admin management (to be built).
- Admin side intended to manage packages, bookings, visa inquiries, users, and permissions.

## Brand personality & voice

- Travel-focused, customer-facing; tone inferred as approachable and service-oriented from existing pages.
- Production-quality presentation expected across all surfaces.

## Visual design & UX direction

- Tailwind CSS for styling; Lucide React for all icons and logos.
- Reusable component pattern: navigation, footer, cart drawer, package cards, visa modal, section headers, quantity controls.
- Cart exposed via slide-out drawer; checkout and account/bookings pages already exist.
- Path alias `@/` → `src/` for imports (no deep relative paths).
- No external UI/theme packages; keep to built-in template stack.

## Decisions, constraints & rationale

- Architecture: `components`, `pages`, `services`, `types`, `context`, and mock data folders.
- Services layer abstracts data source — prepared to switch from mock to real API calls.
- Cart persisted in browser via localStorage.
- Supabase client dependency present but not yet wired for data or auth.
- All data (packages, bookings, visa inquiries) currently mock-based.
- No Git repository available in the environment; cannot diff or show change history.
- Admin prerequisites identified: real DB schema, admin auth, protected admin routes, admin dashboard — before management screens.

## Open questions & assumptions

- Should Supabase be used for both database and admin auth, or another approach?
- Admin data model design pending: packages, bookings, visa inquiries, users, roles/permissions.
- How to handle admin route protection (role-based access, separate auth flow, or Supabase RLS)?
- Migration plan from mock data to live data not yet defined.
- No Git history to verify user-reported repo changes; relying on file inspection only.