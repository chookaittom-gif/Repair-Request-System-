# Responsive Audit - index.txt / dashboard.txt - 2026-06-07

Source files:
- `D:\Webapp\ระบบแจ้งซ่อม\Code\index.txt`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\dashboard.txt`

User screenshots:
- `C:\Users\DuckBig\Desktop\New folder\1.jpg`
- `C:\Users\DuckBig\Desktop\New folder\2.jpg`

Captured evidence:
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\index-desktop-1440.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\index-laptop-1024.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\index-tablet-768.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\index-mobile-390.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\index-mobile-320.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\dashboard-desktop-1440.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\dashboard-laptop-1024.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\dashboard-tablet-768.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\dashboard-mobile-390.png`
- `D:\Webapp\ระบบแจ้งซ่อม\Code\audit-responsive-20260607\dashboard-mobile-320.png`

## Step Health

1. `index.txt` desktop 1440: good. Main form is centered, readable, and uses available width well.
2. `index.txt` tablet 768: good. Form fields stack correctly and keep comfortable touch size.
3. `index.txt` mobile 390/320: needs fix. Header/navigation content is wider than viewport and is visually cropped.
4. `dashboard.txt` desktop 1440: mostly good. Dashboard cards and report controls fit the viewport.
5. `dashboard.txt` tablet 768: mostly good. Main cards stack and stay readable, but local render shows a load error.
6. `dashboard.txt` mobile 390/320: partial. Core layout stacks, but header text/nav can overflow and data-dependent chart/table states could not be fully verified because local render errors before loading data.

## Findings

### P1 - `index.txt` mobile header/nav is cropped

File + Position + Anchor: `index.txt:852` `.nav-container`, `index.txt:870` `.nav-buttons`, `index.txt:878` `.nav-btn`, `index.txt:1765` `<nav class="navbar">`

Evidence: `index-mobile-320.png`, `index-mobile-390.png`

Problem: At 320px and 390px, the right side of the header/nav is cut. Users may not see all navigation actions.

Cause: The mobile rules still keep multiple nav buttons visible with `min-width: 100px` to `110px`, while the navbar has several actions. Hidden horizontal overflow masks the real width issue.

Minimal fix: On `max-width:480px`, make `.nav-buttons` a 1-column grid or horizontal scroll rail with visible affordance. If keeping all buttons visible, set `.nav-btn { width:100%; min-width:0; }`.

### P1 - `dashboard.txt` local render throws `showEmpty is not defined`

File + Position + Anchor: `dashboard.txt` data loading path, visible in captured dashboard screenshots.

Evidence: `dashboard-desktop-1440.png`, `dashboard-mobile-390.png`, `dashboard-mobile-320.png`

Problem: The page shows `เกิดข้อผิดพลาดในการโหลดข้อมูล: showEmpty is not defined`. This blocks a complete responsive audit of charts and populated tables.

Cause: Local render hits a JavaScript path that calls `showEmpty` without a defined function in the current file/runtime context.

Minimal fix: Verify whether `showEmpty` is missing from `dashboard.txt` or injected by another Apps Script file. If missing, add a small local helper or replace calls with the existing empty-state function.

### P2 - `dashboard.txt` mobile header/title can overflow horizontally

File + Position + Anchor: `dashboard.txt:2088` `.nav-container`, `dashboard.txt:2101` `.logo h1`, `dashboard.txt:2129` `.dashboard-title`

Evidence: `dashboard-mobile-320.png`

Problem: At 320px the dashboard title/header text is visually clipped on the right edge.

Cause: Header text stays in one line longer than the viewport allows, and the mobile header centers content without enough wrapping control.

Minimal fix: Add `min-width:0`, `overflow-wrap:anywhere`, and smaller mobile title size for `.logo h1` and `.dashboard-title`; ensure children inside `.nav-container` cannot force wider than viewport.

### P2 - Dashboard data table mobile mode needs live-data verification

File + Position + Anchor: `dashboard.txt:2282` `#dataTable` mobile block

Evidence: source inspection and blocked local data state.

Problem: Source has mobile card-mode table rules, but the populated state shown in the user desktop screenshot cannot be verified at 320/390 because data loading fails locally.

Cause: The audit run cannot reach actual GAS data from local file rendering.

Minimal fix: After fixing `showEmpty`, capture `dashboard` mobile with at least one populated row and verify action buttons do not exceed card width.

## Accessibility / UX Notes

- `index.txt` form fields maintain large touch targets on mobile.
- Both pages use visible color and icon states, but screenshot-only audit cannot validate keyboard focus order or screen reader labels.
- `dashboard.txt` error alert is visible, but it overlays the top area and may obscure nav on small screens.

## Limits

- This audit used local HTML rendering from `index.txt` and `dashboard.txt`; Apps Script server calls and authenticated data were not available.
- Chart/table populated mobile states in `dashboard.txt` require a live Apps Script deployment or mocked data.
- No code was changed in this audit pass.
