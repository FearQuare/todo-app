// Workspace storage operations
const STORAGE_KEY = "workspaces";

export function saveWorkspaces(workspace) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(workspace));
}

export function getWorkspaces() {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
}