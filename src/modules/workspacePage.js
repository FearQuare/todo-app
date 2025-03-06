// actually, instead of getting all the workspaces each time, I can write a function which gets the specific
// workspace by id
import { getExistingWorkspaces, updateWorkspaceName } from "./workspaces/workspaceController";
import EditIcon from "../assets/icons/edit-icon.svg";
import CheckBoxIcon from "../assets/icons/check-box-icon.svg";
import RejectIcon from "../assets/icons/reject-icon.svg";
import { addSectionToWorkspace } from "./workspaces/sections/sectionController";

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

    const nameInput = document.createElement("input");
    nameInput.classList.add("hidden");
    nameInput.type = "text";
    nameInput.defaultValue = workspaceToBeDisplayed.name;
    nameInput.classList.add("text-input");

    const applyButton = document.createElement("button");
    const applyIcon = document.createElement("img");
    applyButton.classList.add("apply-button");
    applyButton.classList.add("hidden");
    applyIcon.src = CheckBoxIcon;
    applyIcon.alt = "Apply Icon";
    applyButton.appendChild(applyIcon);

    const rejectButton = document.createElement("button");
    const rejectIcon = document.createElement("img");
    rejectButton.classList.add("reject-button");
    rejectButton.classList.add("hidden");
    rejectIcon.src = RejectIcon;
    rejectIcon.alt = "Reject Icon";
    rejectButton.appendChild(rejectIcon);

    nameSection.appendChild(nameInput);
    nameSection.appendChild(applyButton);
    nameSection.appendChild(rejectButton);

    const addSectionSection = document.createElement("div");
    addSectionSection.classList.add("add-section-section");
    const addSectionButton = document.createElement("button");
    addSectionButton.classList.add("add-section-button");
    addSectionButton.innerText = "Add A Section";

    addSectionSection.appendChild(addSectionButton);

    const sections = document.createElement("div");
    sections.classList.add("sections");

    workspaceComponent.appendChild(nameSection);
    workspaceComponent.appendChild(addSectionSection);
    workspaceComponent.appendChild(sections);

    editButton.addEventListener("click", () => {
        name.classList.add("hidden");
        editButton.classList.add("hidden");
        nameInput.classList.remove("hidden");
        applyButton.classList.remove("hidden");
        rejectButton.classList.remove("hidden");
        addSectionButton.classList.add("hidden");
    });

    rejectButton.addEventListener("click", () => {
        nameInput.value = workspaceToBeDisplayed.name;
        nameInput.classList.add("hidden");
        applyButton.classList.add("hidden");
        rejectButton.classList.add("hidden");
        name.classList.remove("hidden");
        editButton.classList.remove("hidden");
        addSectionButton.classList.remove("hidden");
    });

    applyButton.addEventListener("click", () => {
        updateWorkspaceName(workspaceId, nameInput.value);
        name.innerText = nameInput.value;
        nameInput.classList.add("hidden");
        applyButton.classList.add("hidden");
        rejectButton.classList.add("hidden");
        name.classList.remove("hidden");
        editButton.classList.remove("hidden");
        addSectionButton.classList.remove("hidden");
        const sidebarDisplay = document.querySelectorAll(".workspace");
        sidebarDisplay[workspaceId].innerText = nameInput.value;
    });

    addSectionButton.addEventListener("click", () => {
        let sectionName = prompt("Please enter the name of the section");
        if (sectionName == null || sectionName == "") {
            window.alert("Section name cannot be empty!");
        } else {
            let newSection = addSectionToWorkspace(sectionName, workspaceId);
            let date = new Date(newSection.startDay);
            window.alert(`${newSection.name} section added to the ${newSection.workspaceId} id workspace at ${date.getDay() == 5 ? "friday" : "zort"}`);
        }
    });

    return workspaceComponent;
}