# Gemini Gems Catalog

A centralized web catalog for shared Gemini gems (AI prompts) that enables distributed teams to view, share, and implement prompts across their Google Gemini instances.

## Overview

This Google Apps Script web application provides a simple, low-friction tool for teams to catalog, discover, and share Gemini gems with full audit tracking. Team members can browse gems in a card-based layout, view full prompts, try gems via shared URLs, and contribute new gems.

## Features

- **Browse Gems:** View all team gems in a responsive card grid
- **View Details:** Expand/collapse full prompts on demand
- **Try Gems:** One-click access to shared Gemini URLs
- **Add Gems:** Simple form to contribute new gems
- **Edit Gems:** Update existing gems with preserved audit trail
- **Delete Gems:** Remove gems with confirmation
- **Audit Tracking:** Automatic tracking of creator and editor with timestamps
- **Custom Branding:** Custom color palette (teal, orange, purple, yellow)
- **Responsive Design:** Works on desktop, tablet, and mobile

## Technology Stack

- **Platform:** Google Apps Script
- **Data Storage:** Google Sheets
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Authentication:** Google Session API
- **Design:** Custom color palette

## Project Structure

```
PMM Gem Repo - HPBU/
├── Code.gs                    # Application entry point
├── AuthService.gs             # User authentication
├── SheetService.gs            # Data access layer
├── Index.html                 # Main HTML structure
├── Styles.html                # CSS styling
├── Script.html                # Client-side JavaScript
├── README.md                  # This file
├── DEPLOYMENT_GUIDE.md        # Step-by-step deployment instructions
├── DEPLOYMENT_CHECKLIST.md    # Quick deployment checklist
└── SAMPLE_DATA.md             # Sample gems for testing
```

## Quick Start

### 1. Prerequisites

- Google account with access to Google Sheets and Apps Script
- Access to the target Google Sheet: [Gemini Gems Sheet](YOUR_GOOGLE_SHEET_URL_HERE)
- Edit permissions on the Google Sheet

### 2. Setup Google Sheet

Ensure the Google Sheet has these headers in row 1 (columns A-I):

| A | B | C | D | E | F | G | H | I |
|---|---|---|---|---|---|---|---|---|
| Title | Short Description | Version | Full Prompt | Shared URL | Created By | Created Date | Last Edited By | Last Edited Date |

### 3. Deploy to Apps Script

1. Open the Google Sheet
2. Go to **Extensions > Apps Script**
3. Copy all `.gs` and `.html` files from this directory into the Apps Script editor
4. Save the project
5. Deploy as web app (see DEPLOYMENT_GUIDE.md for detailed steps)

### 4. Test the App

Use the DEPLOYMENT_CHECKLIST.md to verify all functionality works correctly.

## Data Model

### Gem Object

```javascript
{
  id: number,                    // Row number (1-based)
  title: string,                 // Gem name
  shortDescription: string,      // Brief description (max 200 chars)
  version: string,               // Version identifier
  fullPrompt: string,            // Complete system prompt
  sharedUrl: string,             // Shareable Gemini URL
  createdBy: string,             // Creator email (auto)
  createdDate: string,           // Creation timestamp (auto)
  lastEditedBy: string,          // Last editor email (auto)
  lastEditedDate: string         // Last edit timestamp (auto)
}
```

## Color Palette

The app uses the Custom color palette:

- **Teal (#009596):** Primary actions (Add Gem, Save, Try Now)
- **Orange (#EC7A08):** Danger actions (Delete), error messages
- **Purple (#7551A6):** Version badges
- **Yellow (#F0AB00):** Accents and highlights
- **Gray Scale:** Text and backgrounds

## Access Control

The app supports three access levels:

1. **Anyone:** Public access (no Google login required)
2. **Anyone with Google account:** Requires Google authentication
3. **Anyone within [domain]:** Restricted to organization domain

Configure access level during deployment in the "Who has access" setting.

## User Permissions

This MVP uses an open access model:

- **View:** Anyone with access can view all gems
- **Add:** Anyone with access can add new gems
- **Edit:** Anyone with access can edit any gem
- **Delete:** Anyone with access can delete any gem

All actions are tracked with automatic audit fields (user email and timestamp).

## Architecture

### Server-Side (Google Apps Script)

- **Code.gs:** Serves the web app via `doGet()`, includes HTML templates
- **AuthService.gs:** Captures user email using `Session.getActiveUser()`
- **SheetService.gs:** All CRUD operations with standardized error handling

### Client-Side (Browser)

- **Index.html:** Page structure, header, grid container, modal form
- **Styles.html:** CSS with custom colors, responsive grid, card styling
- **Script.html:** JavaScript for rendering, form handling, server communication

### Data Flow

1. User opens web app URL
2. `Code.gs` serves `Index.html` with included styles and scripts
3. Client requests current user and all gems via `google.script.run`
4. `SheetService.gs` queries Google Sheet and returns data
5. Client renders gem cards in grid
6. User interactions (add/edit/delete) call server functions
7. Server updates Google Sheet with audit tracking
8. Client refreshes gem data and displays success/error messages

## Error Handling

### Server-Side

All SheetService functions return standardized response:

```javascript
{
  success: boolean,    // Operation success status
  data: any,          // Response data (or null)
  error: string       // Error message (or null)
}
```

### Client-Side

- Network failures handled with user-friendly messages
- Form validation before submission
- Success messages auto-dismiss after 3 seconds
- Error messages auto-dismiss after 5 seconds
- Loading overlay during async operations

## Security Considerations

- **XSS Prevention:** All user input is HTML-escaped before rendering
- **CSRF Protection:** Google Apps Script handles CSRF tokens automatically
- **SQL Injection:** N/A (using Google Sheets, not SQL database)
- **Authentication:** Handled by Google's Session API
- **Authorization:** All actions logged with user email for audit trail

## Limitations

- **No search/filter:** MVP shows all gems in creation order
- **No categories:** Gems are not grouped or tagged
- **No version history:** Edits overwrite previous content
- **No comments:** No discussion or feedback mechanism
- **No analytics:** No usage tracking or view counts
- **Single sheet:** All gems in one Google Sheet

## Future Enhancements

Consider these features for post-MVP iterations:

- Search and filter by title, description, creator
- Categories or tags for organizing gems
- Sort options (date, title, creator, version)
- Version history and restoration
- Import/export gems as JSON
- Analytics dashboard (popular gems, usage stats)
- Comment and rating system
- Admin approval workflow
- Role-based permissions (viewer vs. editor)
- Duplicate/clone gem functionality

## Troubleshooting

### Common Issues

**Gems not loading**
- Check browser console for errors
- Verify sheet headers are correct
- Confirm script has sheet access permissions

**Authorization errors**
- Re-authorize the app in Apps Script
- Check "Who has access" deployment setting
- Verify user is logged into Google account

**Styling issues**
- Ensure `Styles.html` is properly included in `Index.html`
- Check for typos in `<?!= include('Styles'); ?>` syntax
- Clear browser cache and refresh

**Save/edit failures**
- Verify all required fields are filled
- Check Apps Script execution logs (View > Executions)
- Confirm sheet is not read-only
- Verify SHEET_ID constant matches your sheet

See DEPLOYMENT_GUIDE.md for more troubleshooting tips.

## Support

For issues, questions, or contributions:

1. Check the DEPLOYMENT_GUIDE.md for detailed setup instructions
2. Review the DEPLOYMENT_CHECKLIST.md for testing steps
3. Check Apps Script execution logs for errors
4. Verify Google Sheet structure and permissions

## License

This project is intended for internal team use. Modify and adapt as needed for your organization.

## Credits

- **Design System:** Custom color palette
- **Platform:** Google Apps Script
- **Storage:** Google Sheets
- **Built for:** Distributed team collaboration on Gemini gems

---

**Version:** 1.0
**Last Updated:** March 2026
**Status:** Ready for deployment
