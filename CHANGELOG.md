# Changelog

Semantic versioning: MAJOR = a prop, exported type, or default behaviour changed in a way that
could break an existing consumer without any code change on their side. MINOR = additive only.
Consuming projects should pin to a tag (`#v1.0.0`), never `#main`.

## v1.0.1 — 2026-08-20

Additive. `copyrightHolder` made optional. Caught while migrating S3 Photobook itself, not in
the abstract: it genuinely has no copyright/settings source at all (checked directly -- no
such data exists anywhere in its codebase), and the prop being required would have forced a
fake or empty value onto a project that has never shown one.

## v1.0.0 — 2026-08-20

First release. `ClaudiaFooter` -- checked three real footer implementations (PETGI, Lintel,
S3 Photobook) before building anything, not assumed identical. The Connect-an-AI-assistant
toggle/card/`ConnectAIPanel` wrapper was confirmed byte-identical between Lintel's and S3
Photobook's real code -- extracted verbatim. The copyright line and settings shape matched
between PETGI and Lintel, but the support-contact field name did not (`contact_email` vs
`support_email`) -- real, different names for the same idea -- so this component takes
already-resolved values as props rather than querying a settings table itself.

Policy links are deliberately NOT rendered by this component: PETGI and Lintel use two
genuinely different, already-in-production systems (`claudia_policy_documents`, kind-based,
vs `claudia_policies`, arbitrary named policies keyed by `project_id`) -- forcing one shape
here would misrepresent a real architectural difference as an oversight. `policyLinks` is a
free-form slot each project fills with its own real markup.

**Known consumers at this tag:** none yet at release — PETGI, Lintel and S3 Photobook are the
first real adoptions, landing in the same session this tag was cut.
