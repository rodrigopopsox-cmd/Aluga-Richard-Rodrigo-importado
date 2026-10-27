# Aluga — Admin dashboard UI kit
Click-through recreation of the property-rental admin, styled after the VANTA reference screens (uploads/vanta-01, 03, 09–13).

- `index.html` — responsive app (resize the window: <760 mobile, <1180 tablet, desktop). Starts at Login (state saved in localStorage `aluga_kit_auth`; use the log-out icon/avatar to return).
- `mobile.html` — the same app inside a 390×844 phone frame.
- `Shell.jsx` (rail, top bar, mobile header + bottom bar), `LoginScreen.jsx`, `DashboardScreen.jsx`, `AnalyticsScreen.jsx`, `PropertiesScreen.jsx`, `MaintenanceScreen.jsx`, `FinanceScreen.jsx`, `App.jsx` (state, add-task dialog, toasts), `data.js` (fake data).
- All UI comes from the design-system bundle (`window.AlugaDesignSystem_e4b917`).

> Nota da migração: os `.jsx` (Shell, LoginScreen, …, App) foram embutidos em `index.html` como blocos
> `<script type="text/babel" data-source="…">` para o kit abrir direto do disco (o Babel não consegue buscar
> arquivos via `file://`); `data.js` continua separado. O bundle está em `../../vendor/ds-bundle.js`.
> A versão viva e tipada deste kit é `design-system/templates/admin/` (rota `/design-system/admin`).
