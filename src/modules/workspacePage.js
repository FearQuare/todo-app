// actually, instead of getting all the workspaces each time, I can write a function which gets the specific
// workspace by id
import { getExistingWorkspaces } from "./workspaces/workspaceController";

export default function WorkspacePage(workspaceId) {
    // get the previous div and remove it because we need space to show our workspace
    const prevDiv = document.querySelector(".component");
    prevDiv.remove();

    // create our workspace component
    const workspaceComponent = document.createElement("div");
    workspaceComponent.classList.add("component");
    workspaceComponent.classList.add("workspace-component");

    // retrieve all workspaces and pick the one we needed.
    const workspaces = getExistingWorkspaces();
    const workspaceToBeDisplayed = workspaces[workspaceId];

    // display the name of the choosen workspace
    const heading = document.createElement("div");
    heading.innerText = workspaceToBeDisplayed.name;
    workspaceComponent.appendChild(heading);

    return workspaceComponent;
}