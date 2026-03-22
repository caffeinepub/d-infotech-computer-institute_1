# D-Infotech Computer Institute

## Current State
Admin Panel displays admission enquiries in a table. No delete functionality exists.

## Requested Changes (Diff)

### Add
- Backend: `deleteAdmissionInquiryAdmin(password, id)` method to remove an enquiry by ID
- Frontend: Delete button (red trash icon) in each row of the Admission Enquiries table
- Confirmation before deleting (simple inline or dialog)

### Modify
- AdminPanel.tsx: Add delete handler, update enquiries state after deletion
- Backend: Store enquiries with IDs accessible for deletion

### Remove
- Nothing removed

## Implementation Plan
1. Add `deleteAdmissionInquiryAdmin(password: Text, id: Nat): async Bool` to backend
2. Add Delete column + button in enquiries table in AdminPanel
3. On click, call backend delete, then remove from local state
