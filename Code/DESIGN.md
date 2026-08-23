---
name: "ระบบแจ้งซ่อม V4"
description: "ระบบงานแจ้งซ่อมและสต็อกอะไหล่สำหรับบุคลากรมหาวิทยาลัยที่ต้องเร็ว ชัด และสบายตา"
colors:
  primary-blue: "#3b82f6"
  primary-blue-deep: "#2563eb"
  action-indigo: "#4f46e5"
  action-violet: "#7c3aed"
  calm-teal: "#06b6d4"
  success-green: "#10b981"
  warning-amber: "#f59e0b"
  danger-red: "#ef4444"
  page-bg: "#f8fafc"
  surface: "#fbfdff"
  surface-muted: "#f3f4f6"
  border-soft: "#d1d5db"
  text-main: "#1f2937"
  text-muted: "#6b7280"
typography:
  headline:
    fontFamily: "Sarabun, system-ui, sans-serif"
    fontSize: "1.35rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "normal"
  title:
    fontFamily: "Sarabun, system-ui, sans-serif"
    fontSize: "1.18rem"
    fontWeight: 800
    lineHeight: 1.25
    letterSpacing: "normal"
  body:
    fontFamily: "Sarabun, system-ui, sans-serif"
    fontSize: "14.5px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "normal"
  label:
    fontFamily: "Sarabun, system-ui, sans-serif"
    fontSize: "0.94rem"
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: "normal"
rounded:
  xs: "7px"
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "999px"
spacing:
  xs: "0.5rem"
  sm: "0.75rem"
  md: "1rem"
  lg: "1.25rem"
  xl: "1.5rem"
components:
  button-primary:
    backgroundColor: "{colors.action-indigo}"
    textColor: "{colors.surface}"
    rounded: "{rounded.sm}"
    padding: "0 0.9rem"
    height: "42px"
    typography: "{typography.label}"
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.sm}"
    padding: "0 0.9rem"
    height: "42px"
    typography: "{typography.label}"
  input-default:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-main}"
    rounded: "{rounded.sm}"
    padding: "0 0.75rem"
    height: "44px"
    typography: "{typography.body}"
  status-low:
    backgroundColor: "#fee2e2"
    textColor: "{colors.danger-red}"
    rounded: "{rounded.pill}"
    padding: "0.25rem 0.65rem"
    typography: "{typography.label}"
---

# Design System: ระบบแจ้งซ่อม V4

## 1. Overview

**Creative North Star: "Calm Government Desk"**

The interface should feel like a clean university service desk: organized, quick to scan, and friendly without becoming playful. It serves teachers and education staff who need to finish real administrative work, so clarity and confidence come before decoration.

The current visual language uses Sarabun, soft blue surfaces, restrained teal and violet accents, compact tables, and 8px component corners. Color can be fresh, but it must stay quiet enough for official work and long sessions.

It explicitly rejects the PRODUCT.md anti-reference: "สีจัดเกินจำเป็น ตารางที่แน่นจนอ่านยาก และองค์ประกอบตกแต่งที่รบกวนงานหลัก."

**Key Characteristics:**
- Restrained color with visible semantic states
- Dense but readable forms and tables
- Familiar product UI controls
- Fast task flow with clear action hierarchy
- Government-appropriate polish, not a campaign look

## 2. Colors

The palette is a cool administrative base with blue as the primary action color, teal for calm information, green for success, amber for warning, and red for risk.

### Primary
- **Service Blue**: the primary action and focus color. Use for main actions, focused controls, active navigation, and high-confidence system affordances.
- **Deep Service Blue**: hover and pressed state for primary actions.
- **Indigo Action**: the older stock action button color. Keep it for existing primary stock actions until the UI is consolidated.
- **Violet Support**: secondary accent used inside gradients with indigo. Keep usage rare.

### Secondary
- **Calm Teal**: informational panels, soft gradients, and system-neutral highlights.

### Tertiary
- **Success Green**: completed states, successful saves, valid outcomes.
- **Warning Amber**: pending or caution states.
- **Danger Red**: destructive actions, low stock, irreversible actions, and errors.

### Neutral
- **Paper Blue Background**: page and app shell background.
- **Clean Surface**: cards, panels, table bodies, form surfaces.
- **Soft Border**: inputs, table outlines, cards, drawer boundaries.
- **Main Ink**: primary text.
- **Muted Ink**: secondary copy, helper text, table labels.

### Named Rules
**The Fresh But Official Rule.** Bright colors are allowed only when they explain state or action. Decorative saturation is prohibited.

**The One Primary Action Rule.** A screen section should have one visually dominant action. Secondary actions stay neutral.

## 3. Typography

**Display Font:** Sarabun, system-ui, sans-serif  
**Body Font:** Sarabun, system-ui, sans-serif  
**Label/Mono Font:** Sarabun, system-ui, sans-serif

**Character:** Humanist Thai UI typography with strong labels and compact body text. The font should feel official, readable, and familiar.

### Hierarchy
- **Headline** (800, 1.35rem, 1.25): top-level screen and module titles.
- **Title** (800, 1.18rem, 1.25): panel headers, drawer titles, table sections.
- **Body** (400, 14.5px to 16px, 1.7): long-form UI copy, form content, table data.
- **Label** (700, 0.94rem, normal): form labels, button text, compact table labels.

### Named Rules
**The Work Text Rule.** UI labels must be legible before they are stylish. No display fonts in controls, data, or reports.

## 4. Elevation

This system is mostly flat, with depth conveyed through borders, tonal layering, and light shadows. Heavy shadows are reserved for the app shell, modal dialogs, drawers, and active primary buttons.

### Shadow Vocabulary
- **Shell Lift** (`box-shadow: 0 22px 52px oklch(0.42 0.08 250 / 0.16)`): page-level stock card container.
- **Action Lift** (`box-shadow: 0 10px 20px oklch(0.55 0.2 255 / 0.2)`): primary stock action buttons.
- **Drawer Lift** (`box-shadow: -18px 0 36px oklch(0.31 0.04 250 / 0.18)`): slide-in history drawer.
- **Dialog Lift** (`box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25)`): modal overlays.

### Named Rules
**The Flat Until Active Rule.** Panels and tables rest flat with borders. Shadows appear only for page shells, overlays, and active actions.

## 5. Components

### Buttons
- **Shape:** gently squared corners (8px).
- **Primary:** blue or indigo fill, white-tinted text, 42px minimum height, 0.9rem horizontal padding.
- **Hover / Focus:** darken fill, keep motion under 200ms, use visible focus rings on inputs and action controls.
- **Secondary / PDF:** neutral surface with border, main text color, no heavy shadow.

### Chips
- **Style:** pill radius, compact padding, strong font weight, semantic background tints.
- **State:** green for normal/complete, red for low stock/error, violet for repair-linked history, amber for warnings.

### Cards / Containers
- **Corner Style:** page cards and panels use 8px; dialogs may use 16px.
- **Background:** clean surfaces over cool blue page backgrounds.
- **Shadow Strategy:** page shell and overlays can lift; repeated panels should use borders.
- **Border:** soft blue-gray border vocabulary.
- **Internal Padding:** 1rem to 1.35rem for product density.

### Inputs / Fields
- **Style:** 44px minimum height, 8px radius, clean surface, soft border.
- **Focus:** blue border with low-opacity blue focus ring.
- **Error / Disabled:** semantic tint, reduced opacity, clear cursor/state.

### Navigation
- **Style:** restrained topbar/sidebar patterns, compact labels, standard buttons.
- **Active State:** primary blue or teal tint with clear contrast.
- **Mobile Treatment:** stack controls, preserve 44px touch target, convert dense tables into readable blocks when necessary.

### Data Tables
- **Style:** fixed layout where possible, soft header gradient, compact but readable cells.
- **State:** row hover can add a subtle blue highlight. Avoid hiding key labels on mobile.

## 6. Do's and Don'ts

### Do:
- **Do** keep primary action color rare and meaningful.
- **Do** use Sarabun for Thai labels, tables, buttons, and reports.
- **Do** keep form controls at least 44px high.
- **Do** use borders and soft tonal backgrounds before adding shadows.
- **Do** make status colors explain state: green success, amber caution, red risk, blue action.

### Don't:
- **Don't** make the UI "สีจัดเกินจำเป็น."
- **Don't** make tables "แน่นจนอ่านยาก."
- **Don't** add decoration that "รบกวนงานหลัก."
- **Don't** add new gradient text. Existing legacy gradient text should not spread to new surfaces.
- **Don't** use side-stripe borders as decorative accents.
- **Don't** use glassmorphism as a default surface treatment.
