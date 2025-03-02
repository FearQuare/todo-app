// actually, instead of getting all the workspaces each time, I can write a function which gets the specific
// workspace by id
import { getExistingWorkspaces } from "./workspaces/workspaceController";
import EditIcon from "../assets/icons/edit-icon.svg";

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
    const nameSection = document.createElement("div");
    const name = document.createElement("h1");
    const editButton = document.createElement("button");
    const editIcon = document.createElement("img");

    editButton.classList.add("edit-button");


    editIcon.src = EditIcon;
    editIcon.alt = "Edit Icon";

    name.innerText = workspaceToBeDisplayed.name;

    nameSection.classList.add("workspace-name");
    nameSection.appendChild(name);

    editButton.appendChild(editIcon);
    nameSection.appendChild(editButton);

    workspaceComponent.appendChild(nameSection);

    return workspaceComponent;
}