// Workspaces functionalities
import Workspace from "./workspace";
import { saveWorkspaces, getWorkspaces } from "./workspaceStorage";

export function addWorkspace() {
    const workspaces = getWorkspaces();
    const id = workspaces.length;
    const name = `Workspace ${id}`;
    const newWorkspace = new Workspace(name, id);
    workspaces.push(newWorkspace);
    saveWorkspaces(workspaces);
    return newWorkspace;
}

export function getExistingWorkspaces() {
    const workspaces = getWorkspaces();
    return workspaces;
}