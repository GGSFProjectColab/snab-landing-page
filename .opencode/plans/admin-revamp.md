# Admin Pages Revamp Plan

## Goal
Revamp all admin pages (sign-in, dashboard, job editor, candidate drawer) to match the main site's design system: dark oklch theme, dotted borders, crosshair markers, dot-grid backgrounds, Tailwind utilities, and the same typography.

## Key Changes

### 1. Layout: Sidebar → Top Navigation
- Replace the sticky sidebar with a horizontal top navigation bar
- Navigation sits inside the `ContainerWrapper` with dotted border-x
- Full-width workspace below the nav
- Responsive: collapses to hamburger on mobile

### 2. Remove Legacy CSS
- Remove `import "../legacy.css"` from `admin/layout.tsx`
- Remove `import "./careers/admin-careers.css"` from admin pages
- Delete or deprecate `admin-careers.css`

### 3. Admin Login Page (`/admin`)
- Centered card layout with `ContainerWrapper`
- Dot-grid background (`section-dot-grid`)
- Crosshair markers on the login card corners
- BrandLogo with Pixelify Sans heading
- Styled input with dotted border focus ring
- Orange accent button (matching `--admin-orange` via oklch)

### 4. Admin Dashboard (`/admin/careers`)
- Full-width top nav with: Logo, Applications tab, Jobs tab, View careers site link, Sign out
- Stats section: 3-column grid with dotted borders between items
- Filters: Search input + dropdowns with dotted borders
- Applications table: Dotted border rows, status badges with oklch colors
- Jobs list: Cards with dotted borders, status badges

### 5. Candidate Drawer
- Slide-in panel from right
- Dotted border sections
- Same typography and color tokens

### 6. Job Editor Modal
- Centered modal with dotted border container
- Form fields with dotted border styling
- Same accent colors

### 7. Skeleton Loading
- Update skeleton styles to match new layout
- Use the same `skeleton.css` base styles

## Files to Modify

| File | Action |
|------|--------|
| `app/admin/layout.tsx` | Remove legacy.css import |
| `app/admin/page.tsx` | Remove admin-careers.css import, update metadata |
| `app/admin/AdminLogin.tsx` | Full rewrite with Tailwind + design system |
| `app/admin/careers/page.tsx` | Remove admin-careers.css import |
| `app/admin/careers/AdminCareers.tsx` | Full rewrite: top nav layout, Tailwind classes |
| `app/admin/careers/AdminCareersSkeleton.tsx` | Update for new layout |
| `app/admin/careers/admin-careers.css` | Delete or empty |
| `app/admin/careers/loading.tsx` | Keep as-is (uses skeleton) |
| `app/skeletons.css` | Update admin skeleton classes for new layout |

## Design Tokens to Use

From `globals.css`:
- `--background`, `--foreground`, `--card`, `--muted`, `--border`, `--edge`
- `--primary`, `--primary-foreground`
- `--accent`, `--accent-foreground`
- `--destructive`
- `--input`, `--ring`
- `--sidebar-*` (repurposed for admin nav)

Tailwind classes:
- `bg-background`, `text-foreground`, `border-border`, `border-edge`
- `bg-card`, `text-card-foreground`
- `bg-muted`, `text-muted-foreground`
- `font-pixelify` for headings
- `border-dotted` for all borders

## Component Structure

### AdminLayout (top nav)
```
┌─────────────────────────────────────────────┐
│  [Logo]  SNAB  │  Applications  Jobs  │  [Links] │  ← topbar
├─────────────────────────────────────────────┤
│                                             │
│              ContainerWrapper               │
│           (dotted border-x)                 │
│                                             │
│              [Page Content]                 │
│                                             │
└─────────────────────────────────────────────┘
```

### AdminLogin (centered card)
```
┌─────────────────────────────────────────────┐
│          dot-grid background                │
│                                             │
│     ┌───────────────────────┐               │
│     │     [BrandLogo]       │               │
│     │     SNAB / Hiring     │               │
│     │     Admin access      │               │
│     │                       │               │
│     │  [Password input]     │               │
│     │  [Enter dashboard →]  │               │
│     └───────────────────────┘               │
│                                             │
└─────────────────────────────────────────────┘
```

### AdminCareers Dashboard
```
┌─────────────────────────────────────────────┐
│  [Logo]  SNAB  │  Applications  Jobs  │  [Links] │
├─────────────────────────────────────────────┤
│  ┌─────────────────────────────────────────┐│
│  │ Recruiting / applications               ││
│  │ Candidate inbox           [+ New job]   ││
│  └─────────────────────────────────────────┘│
│  ┌──────────┬──────────┬──────────┐         │
│  │ Total    │ New      │ General  │         │
│  │ 42       │ 7        │ 12       │         │
│  └──────────┴──────────┴──────────┘         │
│  [Search...] [Type ▾] [Role ▾] [Status ▾]  │
│  ───────────────────────────────────────────│
│  │ Candidate │ App │ Location │ Date │ Stage│
│  │───────────│─────│──────────│──────│──────│
│  │ ...       │     │          │      │      │
└─────────────────────────────────────────────┘
```

## Implementation Order

1. Update `admin/layout.tsx` - remove legacy.css, add top nav structure
2. Rewrite `AdminLogin.tsx` - centered card with design system
3. Rewrite `AdminCareers.tsx` - top nav + full-width workspace
4. Update `AdminCareersSkeleton.tsx` - match new layout
5. Update `skeletons.css` - new admin skeleton classes
6. Delete `admin-careers.css`
7. Test all flows: login, logout, applications view, jobs view, candidate drawer, job editor, delete dialog

## Responsive Breakpoints
- Desktop: ≥900px - full top nav, multi-column layouts
- Tablet: 620-899px - collapsed nav, 2-column filters
- Mobile: <620px - hamburger menu, single column
