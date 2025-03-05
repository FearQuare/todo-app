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

export function updateWorkspaceName(id, newName){
    let workspaces = getWorkspaces();

    workspaces = workspaces.map(workspace => workspace.id == id ? { ...workspace, name: newName } : workspace);
    console.log(workspaces);

    saveWorkspaces(workspaces);
}