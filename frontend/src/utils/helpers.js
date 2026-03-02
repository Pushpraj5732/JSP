/**
 * Utility functions for AYUSH Emergency Triage System
 */

/**
 * Format timestamp to readable string
 * @param {Date|string} timestamp - Timestamp to format
 * @returns {string} Formatted time string
 */
export const formatTime = (timestamp) => {
  const date = new Date(timestamp);
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};

/**
 * Format date to readable string
 * @param {Date|string} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
};

/**
 * Calculate distance between two coordinates in km
 * @param {number} lat1 - Latitude 1
 * @param {number} lon1 - Longitude 1
 * @param {number} lat2 - Latitude 2
 * @param {number} lon2 - Longitude 2
 * @returns {number} Distance in kilometers
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10; // Round to 1 decimal
};

/**
 * Get user's current location
 * @returns {Promise} Location coordinates
 */
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation not supported'));
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        });
      },
      (error) => {
        reject(error);
      }
    );
  });
};

/**
 * Store data in localStorage
 * @param {string} key - Storage key
 * @param {*} value - Value to store
 */
export const setLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('localStorage error:', error);
  }
};

/**
 * Retrieve data from localStorage
 * @param {string} key - Storage key
 * @param {*} defaultValue - Default value if not found
 * @returns {*} Retrieved value
 */
export const getLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('localStorage error:', error);
    return defaultValue;
  }
};

/**
 * Generate unique ID
 * @returns {string} Unique ID
 */
export const generateId = () => {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Validate email address
 * @param {string} email - Email to validate
 * @returns {boolean} Is valid email
 */
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate phone number (Indian format)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} Is valid phone
 */
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[0-9]{10,}$/;
  return phoneRegex.test(phone.replace(/[\s-]/g, ''));
};

/**
 * Parse symptom string into array
 * @param {string} symptoms - Comma or space separated symptoms
 * @returns {array} Array of symptoms
 */
export const parseSymptoms = (symptoms) => {
  return symptoms
    .split(/[,;]/)
    .map(s => s.trim())
    .filter(s => s.length > 0);
};

/**
 * Truncate string to max length with ellipsis
 * @param {string} str - String to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated string
 */
export const truncateString = (str, maxLength = 100) => {
  if (str.length <= maxLength) return str;
  return str.substr(0, maxLength) + '...';
};

/**
 * Sort array of objects by property
 * @param {array} arr - Array to sort
 * @param {string} property - Property to sort by
 * @param {string} order - 'asc' or 'desc'
 * @returns {array} Sorted array
 */
export const sortByProperty = (arr, property, order = 'asc') => {
  return [...arr].sort((a, b) => {
    const valueA = a[property];
    const valueB = b[property];

    if (typeof valueA === 'string') {
      return order === 'asc'
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }

    return order === 'asc' ? valueA - valueB : valueB - valueA;
  });
};

/**
 * Filter array by multiple conditions
 * @param {array} arr - Array to filter
 * @param {object} conditions - Filter conditions
 * @returns {array} Filtered array
 */
export const filterByConditions = (arr, conditions) => {
  return arr.filter(item =>
    Object.keys(conditions).every(
      key => item[key] === conditions[key]
    )
  );
};

/**
 * Debounce function
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in milliseconds
 * @returns {function} Debounced function
 */
export const debounce = (func, delay = 300) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 * @param {function} func - Function to throttle
 * @param {number} limit - Limit in milliseconds
 * @returns {function} Throttled function
 */
export const throttle = (func, limit = 1000) => {
  let inThrottle;
  return (...args) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

/**
 * Copy text to clipboard
 * @param {string} text - Text to copy
 * @returns {Promise} Copy result
 */
export const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Copy to clipboard error:', error);
    return false;
  }
};

/**
 * Check if device is mobile
 * @returns {boolean} Is mobile device
 */
export const isMobileDevice = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
};

/**
 * Get browser information
 * @returns {object} Browser info
 */
export const getBrowserInfo = () => {
  const ua = navigator.userAgent;
  const browser = {
    chrome: /chrome/i.test(ua),
    firefox: /firefox/i.test(ua),
    safari: /safari/i.test(ua),
    edge: /edge/i.test(ua),
    mobile: isMobileDevice(),
  };
  return browser;
};

/**
 * Request notification permission
 * @returns {Promise} Permission result
 */
export const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.warn('Notifications not supported');
    return false;
  }

  if (Notification.permission === 'granted') {
    return true;
  }

  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }

  return false;
};

/**
 * Send browser notification
 * @param {string} title - Notification title
 * @param {object} options - Notification options
 */
export const sendNotification = (title, options = {}) => {
  if (Notification.permission === 'granted') {
    new Notification(title, {
      icon: '/favicon.ico',
      ...options,
    });
  }
};

export default {
  formatTime,
  formatDate,
  calculateDistance,
  getUserLocation,
  setLocalStorage,
  getLocalStorage,
  generateId,
  isValidEmail,
  isValidPhone,
  parseSymptoms,
  truncateString,
  sortByProperty,
  filterByConditions,
  debounce,
  throttle,
  copyToClipboard,
  isMobileDevice,
  getBrowserInfo,
  requestNotificationPermission,
  sendNotification,
};
