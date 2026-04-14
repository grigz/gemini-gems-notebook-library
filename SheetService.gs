/**
 * SheetService.gs - Data Access Layer
 * All Google Sheet CRUD operations for gems
 */

// Column index constants (0-based)
const COL_TITLE = 0;
const COL_SHORT_DESC = 1;
const COL_VERSION = 2;
const COL_FULL_PROMPT = 3;
const COL_SHARED_URL = 4;
const COL_CREATED_BY = 5;
const COL_CREATED_DATE = 6;
const COL_LAST_EDITED_BY = 7;
const COL_LAST_EDITED_DATE = 8;
const COL_FILES = 9;
const COL_ENTRY_TYPE = 10;

/**
 * Get the spreadsheet object
 * @return {Sheet} The active sheet
 */
function getSpreadsheet() {
  try {
    const ss = SpreadsheetApp.openById(SHEET_ID);
    return ss.getActiveSheet();
  } catch (error) {
    Logger.log('Error opening spreadsheet: ' + error.toString());
    throw new Error('Unable to access spreadsheet');
  }
}

/**
 * Get all gems from the sheet
 * @return {Object} Response object with success status and gem data
 */
function getAllGems() {
  try {
    const sheet = getSpreadsheet();
    const data = sheet.getDataRange().getValues();

    // Skip header row (row 0)
    if (data.length <= 1) {
      return { success: true, data: [], error: null };
    }

    const gems = [];
    for (let i = 1; i < data.length; i++) {
      const rowData = data[i];
      const gem = formatGemObject(rowData, i + 1); // +1 for 1-based row numbers
      gems.push(gem);
    }

    // Sort by created date (newest first)
    gems.sort((a, b) => {
      const dateA = new Date(a.createdDate);
      const dateB = new Date(b.createdDate);
      return dateB - dateA;
    });

    return { success: true, data: gems, error: null };
  } catch (error) {
    Logger.log('Error getting gems: ' + error.toString());
    return { success: false, data: null, error: error.toString() };
  }
}

/**
 * Create a new entry (gem or notebook)
 * @param {Object} gemData - The entry data to create
 * @return {Object} Response object with success status
 */
function createGem(gemData) {
  try {
    const sheet = getSpreadsheet();
    const userEmail = getUserEmail();
    const timestamp = new Date();
    const entryType = gemData.entryType || 'gem';

    // Validate common required fields
    if (!gemData.title || !gemData.shortDescription) {
      return { success: false, data: null, error: 'Title and description are required' };
    }

    // Type-specific validation
    if (entryType === 'gem') {
      if (!gemData.version || !gemData.fullPrompt || !gemData.sharedUrl) {
        return { success: false, data: null, error: 'All gem fields are required' };
      }
    } else if (entryType === 'notebook') {
      if (!gemData.notebookUrl) {
        return { success: false, data: null, error: 'NotebookLM URL is required' };
      }
    }

    // Validate files array (optional)
    const files = gemData.files || [];
    if (files.length > 10) {
      return { success: false, data: null, error: 'Maximum 10 files allowed per entry' };
    }

    // Validate each file has required fields
    for (let i = 0; i < files.length; i++) {
      if (!files[i].name || !files[i].link) {
        return { success: false, data: null, error: 'Each file must have a name and link' };
      }
    }

    const newRow = [
      gemData.title,
      gemData.shortDescription,
      gemData.version || '',           // Version (optional for notebooks)
      gemData.fullPrompt || '',        // Full prompt (empty for notebooks)
      entryType === 'gem' ? gemData.sharedUrl : gemData.notebookUrl, // URL
      userEmail,                       // Created By
      timestamp,                       // Created Date
      userEmail,                       // Last Edited By
      timestamp,                       // Last Edited Date
      JSON.stringify(files),           // Files (JSON array)
      entryType                        // Entry Type
    ];

    sheet.appendRow(newRow);

    return { success: true, data: { message: 'Entry created successfully' }, error: null };
  } catch (error) {
    Logger.log('Error creating entry: ' + error.toString());
    return { success: false, data: null, error: error.toString() };
  }
}

/**
 * Update an existing entry (gem or notebook)
 * @param {number} rowId - The row number (1-based)
 * @param {Object} gemData - The updated entry data
 * @return {Object} Response object with success status
 */
function updateGem(rowId, gemData) {
  try {
    const sheet = getSpreadsheet();
    const userEmail = getUserEmail();
    const timestamp = new Date();
    const entryType = gemData.entryType || 'gem';

    // Validate common required fields
    if (!gemData.title || !gemData.shortDescription) {
      return { success: false, data: null, error: 'Title and description are required' };
    }

    // Type-specific validation
    if (entryType === 'gem') {
      if (!gemData.version || !gemData.fullPrompt || !gemData.sharedUrl) {
        return { success: false, data: null, error: 'All gem fields are required' };
      }
    } else if (entryType === 'notebook') {
      if (!gemData.notebookUrl) {
        return { success: false, data: null, error: 'NotebookLM URL is required' };
      }
    }

    // Validate files array (optional)
    const files = gemData.files || [];
    if (files.length > 10) {
      return { success: false, data: null, error: 'Maximum 10 files allowed per entry' };
    }

    // Validate each file has required fields
    for (let i = 0; i < files.length; i++) {
      if (!files[i].name || !files[i].link) {
        return { success: false, data: null, error: 'Each file must have a name and link' };
      }
    }

    // Get existing row to preserve created fields (11 columns now)
    const existingData = sheet.getRange(rowId, 1, 1, 11).getValues()[0];

    const updatedRow = [
      gemData.title,
      gemData.shortDescription,
      gemData.version || '',                        // Version (optional for notebooks)
      gemData.fullPrompt || '',                     // Full prompt (empty for notebooks)
      entryType === 'gem' ? gemData.sharedUrl : gemData.notebookUrl, // URL
      existingData[COL_CREATED_BY],                 // Preserve Created By
      existingData[COL_CREATED_DATE],               // Preserve Created Date
      userEmail,                                     // Update Last Edited By
      timestamp,                                     // Update Last Edited Date
      JSON.stringify(files),                        // Files (JSON array)
      entryType                                      // Entry Type
    ];

    sheet.getRange(rowId, 1, 1, 11).setValues([updatedRow]);

    return { success: true, data: { message: 'Entry updated successfully' }, error: null };
  } catch (error) {
    Logger.log('Error updating entry: ' + error.toString());
    return { success: false, data: null, error: error.toString() };
  }
}

/**
 * Delete a gem (admin only)
 * @param {number} rowId - The row number (1-based)
 * @return {Object} Response object with success status
 */
function deleteGem(rowId) {
  // Check if user is admin
  if (!isUserAdmin()) {
    Logger.log('Unauthorized delete attempt by: ' + getUserEmail());
    return {
      success: false,
      data: null,
      error: 'Only administrators can delete entries'
    };
  }

  try {
    const sheet = getSpreadsheet();
    sheet.deleteRow(rowId);

    return { success: true, data: { message: 'Entry deleted successfully' }, error: null };
  } catch (error) {
    Logger.log('Error deleting entry: ' + error.toString());
    return { success: false, data: null, error: error.toString() };
  }
}

/**
 * Format row data as an entry object (gem or notebook)
 * @param {Array} rowData - The row data from the sheet
 * @param {number} rowIndex - The row number (1-based)
 * @return {Object} Formatted entry object
 */
function formatGemObject(rowData, rowIndex) {
  // Parse files JSON safely
  let files = [];
  try {
    if (rowData[COL_FILES]) {
      files = JSON.parse(rowData[COL_FILES]);
    }
  } catch (error) {
    Logger.log('Error parsing files JSON for row ' + rowIndex + ': ' + error.toString());
    files = [];
  }

  // Get entry type, default to 'gem' for backward compatibility
  const entryType = rowData[COL_ENTRY_TYPE] || 'gem';

  // Base object with common fields
  const baseObject = {
    id: rowIndex,
    title: rowData[COL_TITLE] || '',
    shortDescription: rowData[COL_SHORT_DESC] || '',
    entryType: entryType,
    createdBy: rowData[COL_CREATED_BY] || '',
    createdDate: rowData[COL_CREATED_DATE] ? new Date(rowData[COL_CREATED_DATE]).toISOString() : '',
    lastEditedBy: rowData[COL_LAST_EDITED_BY] || '',
    lastEditedDate: rowData[COL_LAST_EDITED_DATE] ? new Date(rowData[COL_LAST_EDITED_DATE]).toISOString() : '',
    files: files
  };

  // Add type-specific fields
  if (entryType === 'gem') {
    baseObject.version = rowData[COL_VERSION] || '';
    baseObject.fullPrompt = rowData[COL_FULL_PROMPT] || '';
    baseObject.sharedUrl = rowData[COL_SHARED_URL] || '';
  } else if (entryType === 'notebook') {
    baseObject.notebookUrl = rowData[COL_SHARED_URL] || '';
    // Optional: include version for notebooks if desired
    baseObject.version = rowData[COL_VERSION] || '';
  }

  return baseObject;
}
