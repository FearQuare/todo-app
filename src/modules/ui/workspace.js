// ui of the workspaces section
import { addWorkspace, getExistingWorkspaces } from "../workspaces/workspaceController";
import WorkspacePage from "../workspacePage";

export default function Workspace() {
    // Create the workspaces section
    const workspacesSection = document.createElement("div");
    workspacesSection.classList.add("workspace-container");

    // heading of the workspaces section
    const heading = document.createElement("h1");
    heading.innerText = "My Workspaces";
    workspacesSection.appendChild(heading);

    // add workspace button
    const addButton = document.createElement("button");
    addButton.classList.add("add-workspace-button");
    addButton.innerText = "Create One";
    workspacesSection.appendChild(addButton);

    // get existing workspaces and list them
    const existingWorkspaces = getExistingWorkspaces();

    existingWorkspaces.forEach(workspace => {
        const workspaceInstance = document.createElement("div");
        workspaceInstance.classList.add("workspace");
        workspaceInstance.id = workspace.id;
        workspaceInstance.innerText = workspace.name;

        workspacesSection.appendChild(workspaceInstance);

        addEventListenerToWorkspace(workspaceInstance);
    });

    addButton.addEventListener("click", () => {
        const newWorkspace = addWorkspace();

        const workspaceInstance = document.createElement("div");
        workspaceInstance.classList.add("workspace");
        workspaceInstance.id = newWorkspace.id;
        workspaceInstance.innerText = newWorkspace.name;

        workspacesSection.appendChild(workspaceInstance);

        addEventListenerToWorkspace(workspaceInstance);
    });

    return workspacesSection;
}

function addEventListenerToWorkspace(workspaceInstance) {
    workspaceInstance.addEventListener("click", () => {
        app.appendChild(WorkspacePage(workspaceInstance.id));
    });
}