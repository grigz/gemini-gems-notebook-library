/**
 * Code.gs - Application Entry Point
 * Serves the web app and provides HTML template inclusion
 */

/**
 * Entry point for the web app
 * @param {Object} e - Event object
 * @return {HtmlOutput} The rendered HTML page
 */
function doGet(e) {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('HPBU PMM Gem and Notebook Catalog')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * Helper function to include HTML files in templates
 * @param {string} filename - Name of the file to include
 * @return {string} The content of the file
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/**
 * One-time setup to initialize admin list
 * Run this manually from Script Editor to set initial admin
 */
function setupInitialAdmin() {
  const currentUserEmail = Session.getActiveUser().getEmail();
  const props = PropertiesService.getScriptProperties();

  // Check if admin list already exists
  const existingAdmins = props.getProperty('ADMIN_USERS');
  if (existingAdmins) {
    Logger.log('Admin list already exists: ' + existingAdmins);
    return;
  }

  // Initialize with current user as first admin
  const adminList = [currentUserEmail];
  props.setProperty('ADMIN_USERS', JSON.stringify(adminList));

  Logger.log('Initialized admin list with: ' + currentUserEmail);
}
