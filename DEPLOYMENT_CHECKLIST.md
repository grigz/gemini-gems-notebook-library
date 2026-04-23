# Deployment Checklist

Use this checklist to ensure a smooth deployment of the Gemini Gems Catalog.

## Pre-Deployment

- [ ] Verify you have access to the Google Sheet: YOUR_GOOGLE_SHEET_URL_HERE
- [ ] Ensure you have edit permissions on the Google Sheet
- [ ] Review all files in this directory (Code.gs, AuthService.gs, SheetService.gs, Index.html, Styles.html, Script.html)

## Google Sheet Setup

- [ ] Open the Google Sheet
- [ ] Add header row (if not present): `Title | Short Description | Version | Full Prompt | Shared URL | Created By | Created Date | Last Edited By | Last Edited Date`
- [ ] Verify headers are in columns A through I
- [ ] Optionally add sample data for testing

## Apps Script Project Creation

- [ ] From Google Sheet: Extensions > Apps Script
- [ ] Apps Script editor opens with default Code.gs file
- [ ] Project is linked to the Google Sheet

## File Upload to Apps Script

### Server-Side Files (.gs)

- [ ] **Code.gs** - Replace default content with Code.gs from this directory
- [ ] **AuthService.gs** - Create new script file, paste content
- [ ] **SheetService.gs** - Create new script file, paste content

### Client-Side Files (.html)

- [ ] **Index.html** - Create new HTML file, paste content
- [ ] **Styles.html** - Create new HTML file, paste content
- [ ] **Script.html** - Create new HTML file, paste content

### Verify File Names

- [ ] Files are named exactly: `Code`, `AuthService`, `SheetService`, `Index`, `Styles`, `Script`
- [ ] No extra .gs or .html extensions in Apps Script editor (they're added automatically)

## Save and Deploy

- [ ] Save project (Ctrl+S / Cmd+S)
- [ ] Name project: "Gemini Gems Catalog"
- [ ] Click Deploy > New deployment
- [ ] Select type: Web app
- [ ] Set description: "Gemini Gems Catalog MVP"
- [ ] Execute as: Me
- [ ] Who has access: Anyone (or choose appropriate access level)
- [ ] Click Deploy

## Authorization

- [ ] Click "Review Permissions"
- [ ] Select your Google account
- [ ] (If warning appears) Click "Advanced"
- [ ] Click "Go to [Project Name] (unsafe)"
- [ ] Click "Allow"
- [ ] Copy the deployment URL

## Testing

### Basic Load Test

- [ ] Open deployment URL in browser
- [ ] Page loads without errors
- [ ] Header displays "Gemini Gems Catalog"
- [ ] "Add Gem" button visible
- [ ] Custom brand colors visible (teal, orange, purple)

### Add Gem Test

- [ ] Click "Add Gem"
- [ ] Modal opens
- [ ] Fill in all required fields
- [ ] Click "Save Gem"
- [ ] Success message appears
- [ ] Modal closes
- [ ] New gem appears in grid

### View Gem Test

- [ ] Gem card displays: title, version badge, creator, date, description
- [ ] Click "Show Full Prompt" - prompt expands
- [ ] Click "Hide Full Prompt" - prompt collapses
- [ ] Click "Try Now" - URL opens in new tab

### Edit Gem Test

- [ ] Click "Edit" on a gem
- [ ] Modal opens with pre-filled data
- [ ] Modify one or more fields
- [ ] Click "Save Gem"
- [ ] Success message appears
- [ ] Changes appear in gem card
- [ ] Open Google Sheet - verify "Last Edited By" and "Last Edited Date" updated

### Delete Gem Test

- [ ] Click "Delete" on a gem
- [ ] Confirmation dialog appears
- [ ] Confirm deletion
- [ ] Success message appears
- [ ] Gem disappears from grid
- [ ] Open Google Sheet - verify row removed

### Data Verification

- [ ] Open Google Sheet
- [ ] Verify audit fields populated:
  - [ ] Created By (email)
  - [ ] Created Date (timestamp)
  - [ ] Last Edited By (email)
  - [ ] Last Edited Date (timestamp)

### Responsive Design Test

- [ ] Test on desktop browser (full width)
- [ ] Test on tablet (medium width)
- [ ] Test on mobile (narrow width)
- [ ] Verify grid adapts to screen size
- [ ] Verify modal is readable on all sizes

## Post-Deployment

- [ ] Copy deployment URL to safe location
- [ ] Share URL with team members
- [ ] Add 2-3 real gems to seed the catalog
- [ ] Document the deployment URL in team wiki/docs
- [ ] (Optional) Create bookmark or shortcut for easy access

## Troubleshooting (if needed)

If something doesn't work:

- [ ] Check browser console for errors (F12)
- [ ] Check Apps Script execution logs (View > Executions)
- [ ] Verify SHEET_ID in SheetService.gs matches your sheet
- [ ] Verify all files saved in Apps Script
- [ ] Verify sheet permissions (you can edit)
- [ ] Try re-authorizing the app
- [ ] Check that headers are in correct columns (A-I)

## Future Updates

When you need to update the app:

- [ ] Make changes in Apps Script editor
- [ ] Save changes
- [ ] Go to Deploy > Manage deployments
- [ ] Click pencil icon next to active deployment
- [ ] Select "New version"
- [ ] Click "Deploy"
- [ ] Users refresh page to see updates

---

## Success Criteria

Your deployment is successful when:

✅ You can load the web app without errors
✅ You can add a new gem successfully
✅ You can view gem details (expand/collapse prompt)
✅ You can edit an existing gem
✅ You can delete a gem (with confirmation)
✅ Audit fields auto-populate correctly
✅ "Try Now" button opens shared URLs
✅ Design uses custom color palette
✅ App works on desktop and mobile

---

**Deployment Date:** _______________

**Deployment URL:** _______________

**Deployed By:** _______________

**Notes:**
_______________________________________________
_______________________________________________
_______________________________________________
