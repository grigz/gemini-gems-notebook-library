# Gemini Gems Catalog - Deployment Guide

## Overview

This web app provides a centralized catalog for shared Gemini gems (AI prompts) that allows your distributed team to view, share, and implement prompts across Google Gemini instances.

## Files Created

### Server-Side (.gs files)
- **Code.gs** - Application entry point with doGet() function
- **AuthService.gs** - User authentication and email tracking
- **SheetService.gs** - All CRUD operations for gems

### Client-Side (.html files)
- **Index.html** - Main HTML structure
- **Styles.html** - CSS styling with custom color palette
- **Script.html** - Client-side JavaScript

## Deployment Steps

### Step 1: Prepare the Google Sheet

1. Open the target Google Sheet: YOUR_GOOGLE_SHEET_URL_HERE

2. Ensure the first row contains these headers (in order, columns A-I):
   ```
   Title | Short Description | Version | Full Prompt | Shared URL | Created By | Created Date | Last Edited By | Last Edited Date
   ```

3. If headers are missing, add them to row 1

### Step 2: Create Google Apps Script Project

1. From the Google Sheet, go to **Extensions > Apps Script**

2. This will create a new Apps Script project linked to your sheet

3. Delete the default `Code.gs` file content (we'll replace it)

### Step 3: Add All Files to Apps Script

1. **Add the first .gs file (Code.gs):**
   - In the Apps Script editor, the default `Code.gs` file should be open
   - Copy the contents of `Code.gs` from this directory
   - Paste into the Apps Script editor

2. **Add AuthService.gs:**
   - Click the "+" next to Files
   - Select "Script"
   - Name it `AuthService`
   - Copy the contents of `AuthService.gs` from this directory
   - Paste into the editor

3. **Add SheetService.gs:**
   - Click the "+" next to Files
   - Select "Script"
   - Name it `SheetService`
   - Copy the contents of `SheetService.gs` from this directory
   - Paste into the editor

4. **Add Index.html:**
   - Click the "+" next to Files
   - Select "HTML"
   - Name it `Index`
   - Copy the contents of `Index.html` from this directory
   - Paste into the editor

5. **Add Styles.html:**
   - Click the "+" next to Files
   - Select "HTML"
   - Name it `Styles`
   - Copy the contents of `Styles.html` from this directory
   - Paste into the editor

6. **Add Script.html:**
   - Click the "+" next to Files
   - Select "HTML"
   - Name it `Script`
   - Copy the contents of `Script.html` from this directory
   - Paste into the editor

### Step 4: Save and Deploy

1. **Save the project:**
   - Click the disk icon or press Ctrl+S (Cmd+S on Mac)
   - Name your project (e.g., "Gemini Gems Catalog")

2. **Deploy as web app:**
   - Click the "Deploy" button in the top right
   - Select "New deployment"
   - Click the gear icon next to "Select type"
   - Choose "Web app"

3. **Configure deployment settings:**
   - **Description:** "Gemini Gems Catalog MVP" (or any description)
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone (or "Anyone with Google account" for restricted access)

4. **Authorize the app:**
   - Click "Deploy"
   - You'll be asked to authorize the app
   - Click "Review Permissions"
   - Select your Google account
   - Click "Advanced" if you see a warning
   - Click "Go to [Project Name] (unsafe)"
   - Click "Allow"

5. **Copy the deployment URL:**
   - After deployment, you'll see a "Web app" URL
   - Copy this URL - this is your app's public address
   - Share this URL with your team

### Step 5: Test the Deployment

1. **Open the web app URL** in your browser

2. **Test basic functionality:**
   - [ ] Page loads without errors
   - [ ] Custom color scheme is visible
   - [ ] "Add Gem" button is visible in header

3. **Test adding a gem:**
   - [ ] Click "Add Gem"
   - [ ] Fill in all fields
   - [ ] Click "Save Gem"
   - [ ] Verify gem appears in the grid
   - [ ] Check the Google Sheet - verify new row was added with audit fields

4. **Test viewing gems:**
   - [ ] Click "Show Full Prompt" - prompt should expand
   - [ ] Click "Hide Full Prompt" - prompt should collapse
   - [ ] Click "Try Now" - shared URL should open in new tab

5. **Test editing a gem:**
   - [ ] Click "Edit" on any gem
   - [ ] Modify one or more fields
   - [ ] Click "Save Gem"
   - [ ] Verify changes appear in the card
   - [ ] Check the Google Sheet - verify "Last Edited By" and "Last Edited Date" were updated

6. **Test deleting a gem:**
   - [ ] Click "Delete" on any gem
   - [ ] Confirm the deletion dialog
   - [ ] Verify gem disappears from grid
   - [ ] Check the Google Sheet - verify row was removed

## Troubleshooting

### Issue: "Authorization required"
**Solution:** Make sure you've completed the authorization process in Step 4. You may need to enable Google Apps Script API in your Google Cloud Console.

### Issue: "Cannot read property 'getActiveSheet' of null"
**Solution:** Verify the SHEET_ID in `SheetService.gs` matches your Google Sheet ID. The ID is the long string in your sheet's URL.

### Issue: Gems not loading
**Solution:**
1. Check the browser console for errors (F12)
2. Verify the sheet has the correct headers in row 1
3. Make sure the script has permission to access the sheet

### Issue: "User email not captured"
**Solution:** The app is using `Session.getActiveUser().getEmail()`. This requires users to be logged into Google. If testing in incognito mode, make sure you're logged in.

### Issue: CSS not loading / page looks unstyled
**Solution:** Make sure `Styles.html` and `Script.html` are properly included in `Index.html` using the `<?!= include('Styles'); ?>` and `<?!= include('Script'); ?>` syntax.

## Making Updates

After the initial deployment, when you make changes:

1. Save your changes in the Apps Script editor
2. Go to **Deploy > Manage deployments**
3. Click the pencil icon next to your active deployment
4. Change the version to "New version"
5. Click "Deploy"

Users will see the updated version when they refresh the page.

## Access Control

The current deployment is set to "Anyone" for maximum accessibility. If you need to restrict access:

1. Go to **Deploy > Manage deployments**
2. Click the pencil icon
3. Change "Who has access" to:
   - **Anyone with Google account** - Requires Google login
   - **Anyone within [your domain]** - Restricts to your organization

## Sheet Structure Reference

| Column | Field | Type | Auto-Populated |
|--------|-------|------|----------------|
| A | Title | String | No |
| B | Short Description | String | No |
| C | Version | String | No |
| D | Full Prompt | String | No |
| E | Shared URL | String | No |
| F | Created By | Email | Yes |
| G | Created Date | Timestamp | Yes |
| H | Last Edited By | Email | Yes |
| I | Last Edited Date | Timestamp | Yes |

## Support

If you encounter issues:

1. Check the Apps Script execution logs: **View > Executions**
2. Check the browser console for client-side errors
3. Verify the Google Sheet permissions
4. Ensure all files are properly saved in Apps Script

## Next Steps

After successful deployment:

1. Share the web app URL with your team
2. Add initial gems to seed the catalog
3. Gather user feedback
4. Consider implementing enhancement features (search, filters, categories) based on user needs
