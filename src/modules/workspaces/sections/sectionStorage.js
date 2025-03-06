const STORAGE_KEY = "sections";

export function saveSections(section) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(section));
}

export function getSections() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}