# D-Infotech Computer Institute

## Current State
The site has 7 pages including Admissions where users can submit enquiries. The backend stores enquiries in `admissionInquiriesMap` and exposes `getAllAdmissionInquiries()` which is admin-role-gated. There is no UI to view submitted enquiries.

## Requested Changes (Diff)

### Add
- New `/admin` route and `AdminPanel.tsx` page
- Admin page has a password gate (hardcoded password: `dinfotech@admin`)
- After login, shows a table of all admission enquiries (name, phone, email, course, message, date)
- Also shows contact form submissions in a second tab
- Backend: add public query `getAdmissionInquiriesAdmin(password: Text)` and `getContactSubmissionsAdmin(password: Text)` with a server-side password check so any caller can use it without ICP identity

### Modify
- `App.tsx`: add `/admin` route
- `Navbar.tsx`: optionally add small Admin link (or leave it hidden)

### Remove
- Nothing removed

## Implementation Plan
1. Add `getAdmissionInquiriesAdmin(password)` and `getContactSubmissionsAdmin(password)` public query functions to `main.mo` with a hardcoded password check
2. Regenerate backend bindings
3. Create `AdminPanel.tsx` with password gate + tabs for Enquiries and Contact submissions
4. Add `/admin` route to `App.tsx`
