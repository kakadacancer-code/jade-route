export function readPreference(key, fallback) {
  try {
    return JSON.parse(localStorage.getItem(`jade-routes:${key}`)) ?? fallback;
  } catch {
    return fallback;
  }
}

export function writePreference(key, value) {
  try {
    localStorage.setItem(`jade-routes:${key}`, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removePreference(key) {
  try {
    localStorage.removeItem(`jade-routes:${key}`);
    return true;
  } catch {
    return false;
  }
}
