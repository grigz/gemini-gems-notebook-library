/**
 * AuthService.gs - User Authentication
 * Captures current user email for audit tracking
 */

/**
 * Get the current user's email address
 * @return {string} User's email address
 */
function getUserEmail() {
  try {
    const email = Session.getActiveUser().getEmail();
    return email || 'unknown@example.com';
  } catch (error) {
    Logger.log('Error getting user email: ' + error.toString());
    return 'unknown@example.com';
  }
}

/**
 * Get the current user object
 * @return {Object} User object with email
 */
function getCurrentUser() {
  return {
    email: getUserEmail()
  };
}

/**
 * Get list of admin users from Script Properties
 * @return {Array} Array of admin email addresses
 */
function getAdminList() {
  try {
    const props = PropertiesService.getScriptProperties();
    const adminListJson = props.getProperty('ADMIN_USERS');

    if (!adminListJson) {
      // Initialize with empty array if not set
      return [];
    }

    return JSON.parse(adminListJson);
  } catch (error) {
    Logger.log('Error getting admin list: ' + error.toString());
    return [];
  }
}

/**
 * Check if current user is an admin
 * @return {boolean} True if current user is admin
 */
function isUserAdmin() {
  const userEmail = getUserEmail();
  const adminList = getAdminList();
  return adminList.includes(userEmail);
}

/**
 * Add a user to the admin list
 * @param {string} email - Email to add
 * @return {Object} Response object
 */
function addAdmin(email) {
  // Only admins can add admins
  if (!isUserAdmin()) {
    return { success: false, error: 'Only admins can manage admin list' };
  }

  try {
    const adminList = getAdminList();

    if (adminList.includes(email)) {
      return { success: false, error: 'User is already an admin' };
    }

    adminList.push(email);
    const props = PropertiesService.getScriptProperties();
    props.setProperty('ADMIN_USERS', JSON.stringify(adminList));

    return { success: true, data: { admins: adminList } };
  } catch (error) {
    Logger.log('Error adding admin: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Remove a user from the admin list
 * @param {string} email - Email to remove
 * @return {Object} Response object
 */
function removeAdmin(email) {
  // Only admins can remove admins
  if (!isUserAdmin()) {
    return { success: false, error: 'Only admins can manage admin list' };
  }

  try {
    const adminList = getAdminList();
    const currentUser = getUserEmail();

    // Prevent removing yourself if you're the last admin
    if (email === currentUser && adminList.length === 1) {
      return { success: false, error: 'Cannot remove the last admin' };
    }

    const index = adminList.indexOf(email);
    if (index === -1) {
      return { success: false, error: 'User is not an admin' };
    }

    adminList.splice(index, 1);
    const props = PropertiesService.getScriptProperties();
    props.setProperty('ADMIN_USERS', JSON.stringify(adminList));

    return { success: true, data: { admins: adminList } };
  } catch (error) {
    Logger.log('Error removing admin: ' + error.toString());
    return { success: false, error: error.toString() };
  }
}

/**
 * Get current user with admin status
 * @return {Object} User object with email and isAdmin flag
 */
function getCurrentUserWithPermissions() {
  return {
    email: getUserEmail(),
    isAdmin: isUserAdmin()
  };
}
